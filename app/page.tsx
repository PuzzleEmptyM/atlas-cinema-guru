"use client";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Movies from "./components/Movies";

export default function Page() {
  return (
    <div className="flex h-screen" style={{ backgroundColor: '#00003c' }}>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <div className="flex-1 p-4">
            <Movies />
          </div>
        </div>
      </div>
    </div>
  );
}
