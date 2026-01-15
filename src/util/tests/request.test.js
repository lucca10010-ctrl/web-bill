// Mock axios 必须在导入之前
jest.mock('axios');

describe('Request 工具类测试', () => {
  let axios;
  let mockInstance;

  beforeAll(() => {
    // 导入 axios mock
    axios = require('axios');
    // 导入 request 模块（会调用 axios.create）
    require('../request');
    // 获取创建的 mock 实例
    mockInstance = axios.create.mock.results[0].value;
  });

  beforeEach(() => {
    // 清除 localStorage
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Axios 实例配置', () => {
    test('应该创建 axios 实例', () => {
      // axios.create 在模块加载时已经被调用
      // 检查 mockInstance 是否存在且有正确的结构
      expect(mockInstance).toBeDefined();
      expect(mockInstance.interceptors).toBeDefined();
      expect(mockInstance.interceptors.request).toBeDefined();
      expect(mockInstance.interceptors.response).toBeDefined();
    });
  });

  describe('请求拦截器功能', () => {
    test('应该在有 token 时添加 Authorization 头', () => {
      localStorage.setItem('token', 'test-token-123');
      
      const config = { headers: {} };
      const result = mockInstance._requestInterceptor(config);
      
      expect(result.headers.Authorization).toBe('Bearer test-token-123');
      expect(result.headers.test).toBe('hello');
    });

    test('应该在没有 token 时不添加 Authorization 头', () => {
      const config = { headers: {} };
      const result = mockInstance._requestInterceptor(config);
      
      expect(result.headers.Authorization).toBeUndefined();
      expect(result.headers.test).toBe('hello');
    });

    test('应该返回配置对象', () => {
      const config = { headers: {}, url: '/api/test' };
      const result = mockInstance._requestInterceptor(config);
      
      expect(result).toBe(config);
      expect(result.url).toBe('/api/test');
    });
  });

  describe('响应拦截器功能', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      console.log.mockRestore();
    });

    test('状态码 200 应该返回 response.data', () => {
      const response = {
        status: 200,
        data: { message: 'success', items: [1, 2, 3] }
      };
      
      const result = mockInstance._responseInterceptor(response);
      
      expect(result).toEqual({ message: 'success', items: [1, 2, 3] });
      expect(console.log).toHaveBeenCalledWith('Response:', response);
    });

    test('状态码 201 应该返回 response.data', () => {
      const response = {
        status: 201,
        data: { id: 1, created: true }
      };
      
      const result = mockInstance._responseInterceptor(response);
      
      expect(result).toEqual({ id: 1, created: true });
    });

    test('状态码 299 应该返回 response.data', () => {
      const response = {
        status: 299,
        data: { success: true }
      };
      
      const result = mockInstance._responseInterceptor(response);
      
      expect(result).toEqual({ success: true });
    });

    test('状态码 300 应该拒绝 Promise', async () => {
      const response = {
        status: 300,
        data: { error: 'Redirect' }
      };
      
      await expect(mockInstance._responseInterceptor(response)).rejects.toEqual({ error: 'Redirect' });
    });

    test('状态码 400 应该拒绝 Promise', async () => {
      const response = {
        status: 400,
        data: { error: 'Bad Request' }
      };
      
      await expect(mockInstance._responseInterceptor(response)).rejects.toEqual({ error: 'Bad Request' });
    });

    test('状态码 500 应该拒绝 Promise', async () => {
      const response = {
        status: 500,
        data: { error: 'Server Error' }
      };
      
      await expect(mockInstance._responseInterceptor(response)).rejects.toEqual({ error: 'Server Error' });
    });
  });

  describe('响应错误处理', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      console.log.mockRestore();
    });

    test('401 错误应该重定向到首页', async () => {
      const originalLocation = window.location;
      delete window.location;
      window.location = { href: '/some-page' };

      const error = {
        response: { status: 401 },
        message: 'Unauthorized'
      };
      
      await expect(mockInstance._responseErrorHandler(error)).rejects.toBe(error);
      expect(window.location.href).toBe('/');
      expect(console.log).toHaveBeenCalledWith('Response Error:', error);

      window.location = originalLocation;
    });

    test('500 错误不应该重定向', async () => {
      const originalLocation = window.location;
      delete window.location;
      window.location = { href: '/current-page' };

      const error = {
        response: { status: 500 },
        message: 'Server Error'
      };
      
      await expect(mockInstance._responseErrorHandler(error)).rejects.toBe(error);
      expect(window.location.href).toBe('/current-page');
      expect(console.log).toHaveBeenCalledWith('Response Error:', error);

      window.location = originalLocation;
    });

    test('没有 response 的错误应该正常处理', async () => {
      const error = new Error('Network Error');
      
      await expect(mockInstance._responseErrorHandler(error)).rejects.toBe(error);
      expect(console.log).toHaveBeenCalledWith('Response Error:', error);
    });
  });

  describe('请求错误处理', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      console.log.mockRestore();
    });

    test('请求错误应该记录日志并拒绝', async () => {
      const error = new Error('Request failed');
      
      await expect(mockInstance._requestErrorHandler(error)).rejects.toBe(error);
      expect(console.log).toHaveBeenCalledWith('Request Error:', error);
    });
  });
});
