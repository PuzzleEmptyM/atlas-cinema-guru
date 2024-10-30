"use client";

import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center w-full max-w-sm">
        {/* Logo */}
        <img src="/logo.png" alt="Atlas School" className="mx-auto mb-4 w-24 md:w-32" />

        {/* Sign in Button */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex border border-black items-center justify-center w-full bg-white-500 hover:bg-teal-600 text-black font-medium py-2 px-4 rounded transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.235 1.838 1.235 1.07 1.834 2.809 1.304 3.495.997.108-.775.42-1.304.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.267 1.983-.399 3.005-.404 1.022.005 2.048.137 3.006.403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.767.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.625-5.475 5.92.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
