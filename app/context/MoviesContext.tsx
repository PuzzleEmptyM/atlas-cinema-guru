import React, { createContext, useContext, useState } from 'react';

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

type Activity = {
  id: string;
  type: "favorited" | "unfavorited" | "watch-later-added" | "watch-later-removed";
  movieTitle: string;
  timestamp: Date;
};


type MoviesContextType = {
  favorites: Movie[];
  watchLater: Movie[];
  activities: Activity[];
  toggleFavorite: (movie: Movie) => void;
  toggleWatchLater: (movie: Movie) => void;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [watchLater, setWatchLater] = useState<Movie[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const isAlreadyFavorited = prev.some((fav) => fav.id === movie.id);
      const updatedFavorites = isAlreadyFavorited
        ? prev.filter((fav) => fav.id !== movie.id)
        : [...prev, movie];
  
      // Log the activity with consistent type values
      setActivities((prevActivities) => [
        {
          id: movie.id,
          type: isAlreadyFavorited ? "unfavorited" : "favorited",
          movieTitle: movie.title,
          timestamp: new Date(),
        },
        ...prevActivities,
      ]);
  
      return updatedFavorites;
    });
  };
  
  const toggleWatchLater = (movie: Movie) => {
    setWatchLater((prev) => {
      const isAlreadyInWatchLater = prev.some((wl) => wl.id === movie.id);
      const updatedWatchLater = isAlreadyInWatchLater
        ? prev.filter((wl) => wl.id !== movie.id)
        : [...prev, movie];
  
      // Log the activity with consistent type values
      setActivities((prevActivities) => [
        {
          id: movie.id,
          type: isAlreadyInWatchLater ? "watch-later-removed" : "watch-later-added",
          movieTitle: movie.title,
          timestamp: new Date(),
        },
        ...prevActivities,
      ]);
  
      return updatedWatchLater;
    });
  };


  return (
    <MoviesContext.Provider
      value={{
        favorites,
        watchLater,
        activities,
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
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};
