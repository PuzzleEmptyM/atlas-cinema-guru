"use client";

import { useState } from "react";
import { FaHome, FaStar, FaClock } from "react-icons/fa"; // Icons
import { useMovies } from "@/app/context/MoviesContext";

type SidebarProps = {
  setCurrentView: (view: "home" | "favorites" | "watch-later") => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setCurrentView }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { activities } = useMovies();

  return (
    <aside
      className={`bg-teal-400 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      } h-full p-4 flex flex-col justify-between`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Navigation Links */}
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => setCurrentView("home")}
          className="flex items-center space-x-2"
        >
          <FaHome className="text-xl" />
          {isExpanded && <span className="font-medium">Home</span>}
        </button>
        <button
          onClick={() => setCurrentView("favorites")}
          className="flex items-center space-x-2"
        >
          <FaStar className="text-xl" />
          {isExpanded && <span className="font-medium">Favorites</span>}
        </button>
        <button
          onClick={() => setCurrentView("watch-later")}
          className="flex items-center space-x-2"
        >
          <FaClock className="text-xl" />
          {isExpanded && <span className="font-medium">Watch Later</span>}
        </button>
      </div>

      {/* Activity Feed */}
      {isExpanded && (
        <div className="mt-8 bg-teal-200 p-4 rounded-lg overflow-y-auto flex-grow">
          <h2 className="font-bold text-gray-700 mb-2">Latest Activities</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            {activities.map((activity) => (
              <li key={activity.id} className="flex flex-col">
                <span>
                  <strong>{activity.movieTitle}</strong>
                </span>
                <span>
                  {activity.type === "favorited" && "Favorited"}
                  {activity.type === "unfavorited" && "Unfavorited"}
                  {activity.type === "watch-later-added" && "Added to Watch Later"}
                  {activity.type === "watch-later-removed" && "Removed from Watch Later"}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
