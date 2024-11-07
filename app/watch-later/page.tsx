"use client";

import React from "react";
import { useMovies } from "@/app/context/MoviesContext";
import Movies from "@/app/components/Movies";

const WatchLaterPage = () => {
  const { watchLater } = useMovies();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Watch Later</h1>
      {watchLater.length > 0 ? (
        <Movies movies={watchLater} />
      ) : (
        <p className="text-white">You have no movies in your Watch Later list yet.</p>
      )}
    </div>
  );
};

export default WatchLaterPage;
