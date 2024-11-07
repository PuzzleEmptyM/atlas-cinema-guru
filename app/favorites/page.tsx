"use client";

import React from "react";
import { useMovies } from "@/app/context/MoviesContext";
import Movies from "@/app/components/Movies";

const FavoritesPage = () => {
  const { favorites } = useMovies();

  return (
    <div className="flex flex-col h-full p-8" style={{ backgroundColor: "#00003c" }}>
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Favorites</h1>
      {favorites.length > 0 ? (
        <Movies movies={favorites} />
      ) : (
        <p className="text-white text-center">You have no favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
