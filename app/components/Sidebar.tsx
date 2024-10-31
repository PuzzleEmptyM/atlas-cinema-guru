"use client";

import { useState } from "react";
import Link from "next/link";
import { FaHome, FaStar, FaClock } from "react-icons/fa"; // Icons

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`bg-teal-400 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      } h-screen p-4 flex flex-col`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Navigation Links */}
      <div className="flex flex-col space-y-4">
        <Link href="/home" className="flex items-center space-x-2">
          <FaHome className="text-xl" />
          {isExpanded && <span className="font-medium">Home</span>}
        </Link>
        <Link href="/favorites" className="flex items-center space-x-2">
          <FaStar className="text-xl" />
          {isExpanded && <span className="font-medium">Favorites</span>}
        </Link>
        <Link href="/watch-later" className="flex items-center space-x-2">
          <FaClock className="text-xl" />
          {isExpanded && <span className="font-medium">Watch Later</span>}
        </Link>
      </div>

      {/* Activity Feed */}
      {isExpanded && (
        <div className="mt-8 bg-teal-200 p-4 rounded-lg">
          <h2 className="font-bold text-gray-700 mb-2">Latest Activities</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            {/* Sample activities, replace with dynamic data if available */}
            <li>10/2/2024, 5:11 PM - Added <span className="font-semibold">Before the Dawn</span> to watch later</li>
            <li>10/1/2024, 4:00 PM - FAvorited <span className="font-semibold">Beneath the Surface</span></li>
            <li>10/1/2024, 4:00 PM - Favorited <span className="font-semibold">Beyond the Mist</span></li>
            <li>10/1/2024, 4:00 PM - Favorited <span className="font-semibold">Beyond the Veil</span></li>
            <li>10/1/2024, 4:00 PM - Favorited <span className="font-semibold">Before the Dawn</span></li>
            <li>10/1/2024, 4:00 PM - Favorited <span className="font-semibold">Aurora's Light</span></li>
            <li>10/1/2024, 4:00 PM - Favorited <span className="font-semibold">After the Rain</span></li>
            <li>10/1/2024, 2:53 PM - Added <span className="font-semibold">Wanderlust</span> to watch later</li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
