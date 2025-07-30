import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./ui/Dashboard";
import NotFound from "./ui/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate replace to="/dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  { path: "*", element: <NotFound /> }, // fallback
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
