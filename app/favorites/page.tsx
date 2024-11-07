"use client";

import React from "react";
import { useMovies } from "@/app/context/MoviesContext";
import Movies from "@/app/components/Movies";

const FavoritesPage = () => {
  const { favorites } = useMovies();

  return (
    <div className="flex flex-col h-full p-8" style={{ backgroundColor: "#00003c" }}>
      {/* Header Section */}
      <div className="flex w-full mb-8 justify-center items-center">
        <h1 className="text-6xl text-center font-bold text-white">Favorites</h1>
      </div>

      {/* Movies Section */}
      <div className="flex-grow w-full">
        {favorites.length > 0 ? (
          <Movies movies={favorites} />
        ) : (
          <p className="text-white text-center p-6">You have no favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
