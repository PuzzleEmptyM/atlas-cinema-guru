"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

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
  timestamp: string;
};

type MoviesContextType = {
  favorites: Movie[];
  watchLater: Movie[];
  activities: Activity[];
  toggleFavorite: (movie: Movie) => void;
  toggleWatchLater: (movie: Movie) => void;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
};

type MoviesProviderProps = {
  children: ReactNode;
};

export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  // State for favorites, watch-later, and activities
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [watchLater, setWatchLater] = useState<Movie[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Fetch favorites, watch later, and activities on component mount
  useEffect(() => {
    fetchFavorites();
    fetchWatchLater();
    fetchActivities();
  }, []);

  // Helper function to fetch favorites
  const fetchFavorites = async () => {
    try {
      const response = await axios.get("/api/favorites");
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Helper function to fetch watch-later
  const fetchWatchLater = async () => {
    try {
      const response = await axios.get("/api/watch-later");
      setWatchLater(response.data.watchLater);
    } catch (error) {
      console.error("Error fetching watch later:", error);
    }
  };

  // Helper function to fetch activities
  const fetchActivities = async () => {
    try {
      const response = await axios.get("/api/activities");
      setActivities(response.data.activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  // Toggle favorite status for a movie
  const toggleFavorite = async (movie: Movie) => {
    try {
      const isFavorite = favorites.some((fav) => fav.id === movie.id);

      if (isFavorite) {
        // Remove from favorites
        await axios.delete(`/api/favorites/${movie.id}`);
        setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
        await logActivity({
          id: `${movie.id}-unfavorited`,
          type: "unfavorited",
          movieTitle: movie.title,
          timestamp: new Date().toISOString(),
        });
      } else {
        // Add to favorites
        await axios.post("/api/favorites", { movie });
        setFavorites((prev) => [...prev, movie]);
        await logActivity({
          id: `${movie.id}-favorited`,
          type: "favorited",
          movieTitle: movie.title,
          timestamp: new Date().toISOString(),
        });
      }

      // Fetch updated activities list
      await fetchActivities();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Toggle watch later status for a movie
  const toggleWatchLater = async (movie: Movie) => {
    try {
      const isWatchLater = watchLater.some((wl) => wl.id === movie.id);

      if (isWatchLater) {
        // Remove from watch later
        await axios.delete(`/api/watch-later/${movie.id}`);
        setWatchLater((prev) => prev.filter((wl) => wl.id !== movie.id));
        await logActivity({
          id: `${movie.id}-watch-later-removed`,
          type: "watch-later-removed",
          movieTitle: movie.title,
          timestamp: new Date().toISOString(),
        });
      } else {
        // Add to watch later
        await axios.post("/api/watch-later", { movie });
        setWatchLater((prev) => [...prev, movie]);
        await logActivity({
          id: `${movie.id}-watch-later-added`,
          type: "watch-later-added",
          movieTitle: movie.title,
          timestamp: new Date().toISOString(),
        });
      }

      // Fetch updated activities list
      await fetchActivities();
    } catch (error) {
      console.error("Error toggling watch later:", error);
    }
  };

  // Helper function to log an activity
  const logActivity = async (activity: Activity) => {
    try {
      await axios.post("/api/activities", activity);
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{ favorites, watchLater, activities, toggleFavorite, toggleWatchLater }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
