"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Filters from "./components/Filters";
import Movies from "./components/Movies";
import { useMovies } from "@/app/context/MoviesContext";

export default function Page() {
  // State for Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [minYear, setMinYear] = useState(1990);
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // State for Movies
  const [movies, setMovies] = useState([]);

  // State for Current View
  const [currentView, setCurrentView] = useState<"home" | "favorites" | "watch-later">("home");

  // Get context data for favorites and watch-later
  const { favorites, watchLater } = useMovies();

  // Fetch movies when in the home view and filters change
  useEffect(() => {
    if (currentView === "home") {
      fetchMovies();
    }
  }, [searchQuery, minYear, maxYear, selectedGenres]);

  const fetchMovies = async () => {
    console.log("Fetching movies...");
    try {
      const response = await fetch(`/api/titles`);
      const data = await response.json();

      let filteredMovies = data.title;

      // Apply Filters
      if (searchQuery) {
        filteredMovies = filteredMovies.filter((movie: any) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (selectedGenres.length > 0) {
        filteredMovies = filteredMovies.filter((movie: any) =>
          selectedGenres.includes(movie.genre)
        );
      }
      filteredMovies = filteredMovies.filter(
        (movie: any) =>
          movie.released >= minYear && movie.released <= maxYear
      );

      setMovies(filteredMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Function to determine which movies to display
  const getMoviesToDisplay = () => {
    switch (currentView) {
      case "favorites":
        return favorites;
      case "watch-later":
        return watchLater;
      default:
        return movies;
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#00003c" }}>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar setCurrentView={setCurrentView} />
          <div className="flex-grow p-8">
            {currentView === "home" && (
              <Filters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                minYear={minYear}
                setMinYear={setMinYear}
                maxYear={maxYear}
                setMaxYear={setMaxYear}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
              />
            )}
            {/* Movies Component */}
            <Movies
              movies={getMoviesToDisplay()}
              onFavoriteToggle={() => {}}
              onWatchLaterToggle={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
