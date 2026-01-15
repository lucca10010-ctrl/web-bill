const React = require('react');

const mockNavigate = jest.fn();
const mockUseNavigate = () => mockNavigate;

const Outlet = () => React.createElement('div', { 'data-testid': 'outlet' }, 'Outlet Content');

const BrowserRouter = ({ children }) => React.createElement('div', null, children);

const Link = ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children);

const Navigate = ({ to }) => null;

const useLocation = () => ({ pathname: '/', search: '', hash: '', state: null });

const useParams = () => ({});

module.exports = {
  useNavigate: mockUseNavigate,
  Outlet,
  BrowserRouter,
  Link,
  Navigate,
  useLocation,
  useParams,
  __mockNavigate: mockNavigate
};
