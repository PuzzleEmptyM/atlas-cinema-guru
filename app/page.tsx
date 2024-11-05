"use client";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MoviesList from "./components/MoviesList";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  if (!session) return null; // Avoid rendering if not logged in

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#00003c' }}>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <MoviesList userEmail={session.user.email} /> {/* Pass the user email to MoviesList */}
        </div>
      </div>
    </div>
  );
};
