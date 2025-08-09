import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./layout/AppLayout";
import Dashboard from "./layout/components/Dashboard";
import Hostel from "./features/hostel/Hostel";
import AuthLayout from "./layout/AuthLayout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import NotFound from "./layout/components/NotFound";
import Profile from "./features/profile/Profile";
import ProtectedRoute from "./layout/components/ProtectedRoute";
import HostelDetails from "./features/hostel/HostelDetails";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate replace to="/dashboard" /> },
      // Protected routes here
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "hostel", element: <Hostel /> },
          { path: "hostel/:hostelId", element: <HostelDetails/> },
          { path: "profile", element: <Profile /> },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> }, // fallback
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-center" gutter={5} />
    </QueryClientProvider>
  );
}

export default App;
