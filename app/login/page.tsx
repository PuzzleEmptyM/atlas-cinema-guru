"use client";

import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center max-w-md w-full">
        {/* Logo */}
        <img src="/logo.png" alt="Atlas School" className="mx-auto mb-6 w-32" />

        {/* Welcome Message */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Cinema Guru</h1>
        <p className="text-gray-600 mb-8">
          Sign in with your GitHub account to continue.
        </p>

        {/* Sign in Button */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
