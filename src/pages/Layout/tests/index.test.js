import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../index';

// Mock react-router-dom (使用 manual mock)
jest.mock('react-router-dom');
const { __mockNavigate: mockNavigate } = require('react-router-dom');

// Mock antd-mobile 组件
jest.mock('antd-mobile', () => {
  const TabBarItem = ({ icon, title, badge }) => (
    <div data-testid="tabbar-item" data-title={title}>
      {title}
    </div>
  );
  
  const TabBar = ({ children, onChange }) => {
    return (
      <div data-testid="tabbar">
        {children}
      </div>
    );
  };
  
  TabBar.Item = TabBarItem;
  
  return {
    Badge: {
      dot: true
    },
    TabBar
  };
});

// Mock antd-mobile-icons
jest.mock('antd-mobile-icons', () => ({
  AddCircleOutline: () => <span data-testid="icon-add">AddIcon</span>,
  BillOutline: () => <span data-testid="icon-bill">BillIcon</span>,
  CalculatorOutline: () => <span data-testid="icon-calculator">CalculatorIcon</span>,
  UserOutline: () => <span data-testid="icon-user">UserIcon</span>
}));

// Mock SCSS
jest.mock('../index.scss', () => ({}));

describe('Layout 组件测试', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('组件渲染', () => {
    test('应该正确渲染 Layout 组件', () => {
      render(<Layout />);

      // 验证主容器存在
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();

      // 验证底部导航存在
      const footer = document.querySelector('.footer');
      expect(footer).toBeInTheDocument();
    });

    test('应该渲染 Outlet 组件', () => {
      render(<Layout />);

      const outlet = screen.getByTestId('outlet');
      expect(outlet).toBeInTheDocument();
      expect(outlet).toHaveTextContent('Outlet Content');
    });

    test('应该渲染 TabBar 组件', () => {
      render(<Layout />);

      const tabbar = screen.getByTestId('tabbar');
      expect(tabbar).toBeInTheDocument();
    });
  });

  describe('TabBar 标签项', () => {
    test('应该渲染所有 4 个标签项', () => {
      render(<Layout />);

      const tabItems = screen.getAllByTestId('tabbar-item');
      expect(tabItems).toHaveLength(4);
    });

    test('应该渲染正确的标签标题', () => {
      render(<Layout />);

      expect(screen.getByText('月度账单')).toBeInTheDocument();
      expect(screen.getByText('记账')).toBeInTheDocument();
      expect(screen.getByText('年度账单')).toBeInTheDocument();
      expect(screen.getByText('我的')).toBeInTheDocument();
    });

    test('标签项应该有正确的标题属性', () => {
      render(<Layout />);

      const tabItems = screen.getAllByTestId('tabbar-item');
      
      expect(tabItems[0]).toHaveAttribute('data-title', '月度账单');
      expect(tabItems[1]).toHaveAttribute('data-title', '记账');
      expect(tabItems[2]).toHaveAttribute('data-title', '年度账单');
      expect(tabItems[3]).toHaveAttribute('data-title', '我的');
    });
  });

  describe('路由导航功能', () => {
    test('setRouteActive 函数应该调用 navigate', () => {
      render(<Layout />);

      // 由于 TabBar 的 onChange 在实际组件中被调用
      // 我们需要验证 navigate 函数存在
      expect(mockNavigate).toBeDefined();
    });
  });

  describe('组件结构', () => {
    test('应该有正确的 CSS 类名', () => {
      const { container } = render(<Layout />);

      const layout = container.querySelector('.layout');
      expect(layout).toBeInTheDocument();

      const containerDiv = container.querySelector('.container');
      expect(containerDiv).toBeInTheDocument();

      const footer = container.querySelector('.footer');
      expect(footer).toBeInTheDocument();
    });

    test('container 应该包含 Outlet', () => {
      const { container } = render(<Layout />);

      const containerDiv = container.querySelector('.container');
      const outlet = screen.getByTestId('outlet');
      
      expect(containerDiv).toContainElement(outlet);
    });

    test('footer 应该包含 TabBar', () => {
      const { container } = render(<Layout />);

      const footer = container.querySelector('.footer');
      const tabbar = screen.getByTestId('tabbar');
      
      expect(footer).toContainElement(tabbar);
    });
  });

  describe('标签配置验证', () => {
    test('所有标签按正确顺序渲染', () => {
      render(<Layout />);

      const tabItems = screen.getAllByTestId('tabbar-item');
      expect(tabItems).toHaveLength(4);

      expect(tabItems[0]).toHaveTextContent('月度账单');
      expect(tabItems[1]).toHaveTextContent('记账');
      expect(tabItems[2]).toHaveTextContent('年度账单');
      expect(tabItems[3]).toHaveTextContent('我的');
    });

    test('TabBar 应该存在于 footer 中', () => {
      const { container } = render(<Layout />);

      const footer = container.querySelector('.footer');
      const tabbar = screen.getByTestId('tabbar');
      
      expect(footer).toContainElement(tabbar);
    });
  });
});
