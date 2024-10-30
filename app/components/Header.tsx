// components/Header.tsx

"use client";

import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between bg-teal-300 p-4">
      <div className="flex items-center">
        <img src="/logo.png" alt="Cinema Guru" className="w-8 h-8 mr-2" />
        <h1 className="text-lg font-bold">Cinema Guru</h1>
      </div>
      <div className="flex items-center space-x-4">
        {session && <span>Welcome, {session.user?.email}</span>}
        <button onClick={() => signOut()} className="text-black underline">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
