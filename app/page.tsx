"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#00003c' }}>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <div >hello</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
