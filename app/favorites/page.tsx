"use client";

import React from "react";
import { useMovies } from "@/app/context/MoviesContext";
import Movies from "@/app/components/Movies";

const FavoritesPage = () => {
  const { favorites } = useMovies();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Favorites</h1>
      {favorites.length > 0 ? (
        <Movies movies={favorites} />
      ) : (
        <p className="text-white">You have no favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
