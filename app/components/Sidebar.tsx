// components/Sidebar.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`bg-teal-200 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      } h-screen p-4`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Navigation Links */}
      <div className="flex flex-col space-y-4">
        <Link href="/home" className="flex items-center space-x-2">
          <span className="material-icons">home</span>
          {isExpanded && <span>Home</span>}
        </Link>
        <Link href="/favorites" className="flex items-center space-x-2">
          <span className="material-icons">favorite</span>
          {isExpanded && <span>Favorites</span>}
        </Link>
        <Link href="/watch-later" className="flex items-center space-x-2">
          <span className="material-icons">schedule</span>
          {isExpanded && <span>Watch Later</span>}
        </Link>
      </div>

      {/* Activity Feed */}
      {isExpanded && (
        <div className="mt-8">
          <h2 className="font-bold mb-2">Latest Activities</h2>
          <ul className="text-sm space-y-1">
            {/* This is just an example; replace with dynamic activity feed */}
            <li>10/2/2024, 5:11 PM - Added Before the Dawn</li>
            <li>10/1/2024, 4:00 PM - Favorited Beneath the Surface</li>
            <li>10/1/2024, 4:00 PM - Favorited Beyond the Mist</li>
            {/* Add more activity items dynamically here */}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
