import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import router from './router';
import './theme.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

  // <App />


);

