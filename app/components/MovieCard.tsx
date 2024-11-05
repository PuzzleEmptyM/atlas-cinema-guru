import { useState } from "react";
import { FaStar, FaClock } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative p-2 border rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie.image} alt={movie.title} className="rounded-lg w-full" />
      {isHovered && (
        <div className="absolute inset-0 bg-opacity-75 bg-black p-4 rounded-lg">
          <h3 className="text-white font-bold">{movie.title} ({movie.released})</h3>
          <p className="text-white text-sm">{movie.description}</p>
          <p className="text-sm text-green-300">{movie.genre}</p>
          <div className="flex justify-between mt-2">
            <button>
              <FaStar className={movie.favorited ? "text-yellow-400" : "text-white"} />
            </button>
            <button>
              <FaClock className={movie.watchLater ? "text-blue-400" : "text-white"} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
