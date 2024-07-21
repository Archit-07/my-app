import './App.css';
import LoginForm from './component/login';
import Dashboard from './component/dashboard';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MenuBar from './component/menubar';
import SignupForm from './component/SignupForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />
  },
  {
    path: "/menu",
    element: <MenuBar />
  },
  {
    path: "/signup",
    element: <SignupForm />
  },
]);

function App() {
  return (
    <div className="App">
          <RouterProvider router={router} />
    </div>
  );
}

export default App;
