import './App.css';
import LoginForm from './component/LoginForm';
import Dashboard from './component/DashboardCustom';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MenuBar from './component/MenubarCustom';
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
