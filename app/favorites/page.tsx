"use client";

import React from "react";
import { useMovies } from "@/app/context/MoviesContext";
import Movies from "@/app/components/Movies";

const FavoritesPage = () => {
  const { favorites } = useMovies();

  return (
    <div className="flex flex-col min-h-screen p-8" style={{ backgroundColor: "#00003c" }}>
      {/* Header Section */}
      <div className="w-full mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">Favorites</h1>
      </div>

      {/* Movies Section */}
      <div className="flex-grow">
        {favorites.length > 0 ? (
          <Movies movies={favorites} />
        ) : (
          <p className="text-white text-center">You have no favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
