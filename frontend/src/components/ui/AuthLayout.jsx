
// src/components/AuthLayout.jsx
export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      hi
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
