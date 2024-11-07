"use client";

import React from "react";
import { FaStar, FaClock } from "react-icons/fa";
import { useMovies } from "@/app/context/MoviesContext";

type Movie = {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
  image: string;
};

type MoviesProps = {
  movies: Movie[];
  onFavoriteToggle?: (id: Movie) => void;
  onWatchLaterToggle?: (id: Movie) => void;
};

const Movies: React.FC<MoviesProps> = ({ movies }) => {
  const { favorites, watchLater, toggleFavorite, toggleWatchLater } = useMovies();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-between">
      {movies.map((movie) => {
        const isFavorited = favorites.some((fav) => fav.id === movie.id);
        const isWatchLater = watchLater.some((wl) => wl.id === movie.id);

        return (
          <div
            key={movie.id}
            className="relative group overflow-hidden rounded-lg shadow-lg border border-teal-400 max-w-xl w-full"
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* Favorite and Watch Later Buttons (Visible on Hover) */}
            <div className="absolute top-2 right-2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaStar
                className={`text-2xl cursor-pointer ${
                  isFavorited ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => toggleFavorite(movie)}
              />
              <FaClock
                className={`text-2xl cursor-pointer ${
                  isWatchLater ? "text-blue-400" : "text-gray-400"
                }`}
                onClick={() => toggleWatchLater(movie)}
              />
            </div>

            {/* Movie Image */}
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Movie Info Banner (visible on hover, positioned at the bottom) */}
            <div className="absolute bottom-0 left-0 w-full bg-blue-800 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg font-bold">
                {movie.title} ({movie.released})
              </h3>
              <p className="text-sm mt-1">{movie.synopsis}</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 text-sm font-semibold bg-teal-400 text-white border border-teal-400 rounded">
                  {movie.genre}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
