// app/context/MoviesContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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

type MoviesContextType = {
  favorites: Movie[];
  watchLater: Movie[];
  toggleFavorite: (movie: Movie) => void;
  toggleWatchLater: (movie: Movie) => void;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

type MoviesProviderProps = {
  children: ReactNode;
};

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [watchLater, setWatchLater] = useState<Movie[]>([]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.id === movie.id)) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const toggleWatchLater = (movie: Movie) => {
    setWatchLater((prevWatchLater) => {
      if (prevWatchLater.find((wl) => wl.id === movie.id)) {
        return prevWatchLater.filter((wl) => wl.id !== movie.id);
      } else {
        return [...prevWatchLater, movie];
      }
    });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        watchLater,
        toggleFavorite,
        toggleWatchLater,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
};
