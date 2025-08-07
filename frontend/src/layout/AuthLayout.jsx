// src/components/AuthLayout.jsx
import { Outlet} from "react-router-dom";

export default function AuthLayout() {


  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
}

