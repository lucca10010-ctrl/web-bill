import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import router from './router';
import './theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <RouterProvider router={router} >
  </RouterProvider>

);

