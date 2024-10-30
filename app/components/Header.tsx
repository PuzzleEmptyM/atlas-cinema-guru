"use client";

import { signOut, useSession } from "next-auth/react";
import { FiFilm, FiLogOut } from "react-icons/fi"; // Logout icon

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between bg-teal-200 p-4">
      <div className="flex items-center space-x-2">
        {/* Cinema Guru Logo */}
        <FiFilm className="text-2xl text-blue-900" />
        <span className="text-2xl font-bold text-blue-900">Cinema Guru</span>
      </div>
      <div className="flex items-center space-x-4">
        {/* Welcome Message */}
        {session && <span className="text-black">Welcome, {session.user?.email}</span>}
        
        {/* Logout Button */}
        <button
          onClick={() => signOut()}
          className="flex items-center text-black hover:text-blue-800"
        >
          <FiLogOut className="w-5 h-5 mr-1" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
