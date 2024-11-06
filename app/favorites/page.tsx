"use client";

import React from "react";
import { useMovies } from "@/app/context/MoviesContext";
import Movies from "@/app/components/Movies";

const FavoritesPage = () => {
  const { favorites } = useMovies();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Your Favorite Movies</h1>
      {favorites.length > 0 ? (
        <Movies movies={favorites} />
      ) : (
        <p className="text-white">You have no favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
