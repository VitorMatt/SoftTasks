import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Login from './Login.jsx';
import TodoList from './TodoList.jsx';
import App from './App.jsx';

const router = createBrowserRouter([{

  path: '/',
  element: <App/>,
  children: [{

    index: true,
    element: <Login />
  },
  {
    path: '/tarefas',
    element: <TodoList />
  }
]
}]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);