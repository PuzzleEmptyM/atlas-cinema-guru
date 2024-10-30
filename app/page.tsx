"use client";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Page() {

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
