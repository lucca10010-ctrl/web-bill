// Manual mock for axios
let mockAxiosInstance = null;

const createMockInstance = () => {
  mockAxiosInstance = {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: {
        use: jest.fn((successHandler, errorHandler) => {
          mockAxiosInstance._requestInterceptor = successHandler;
          mockAxiosInstance._requestErrorHandler = errorHandler;
          return 0;
        }),
        eject: jest.fn()
      },
      response: {
        use: jest.fn((successHandler, errorHandler) => {
          mockAxiosInstance._responseInterceptor = successHandler;
          mockAxiosInstance._responseErrorHandler = errorHandler;
          return 0;
        }),
        eject: jest.fn()
      }
    },
    _requestInterceptor: null,
    _requestErrorHandler: null,
    _responseInterceptor: null,
    _responseErrorHandler: null
  };
  return mockAxiosInstance;
};

const mockAxios = {
  create: jest.fn(() => createMockInstance()),
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() }
  }
};

module.exports = mockAxios;
module.exports.default = mockAxios;
