"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Filters from "./components/Filters";
import Movies from "./components/Movies";
import { useMovies } from "@/app/context/MoviesContext";
import Pagination from "./components/Pagination";

export default function Page() {
  // State for Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [minYear, setMinYear] = useState(1990);
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // State for Movies
  const [movies, setMovies] = useState([]);

  // State for Pagination (for Home, Favorites, Watch Later)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [watchLaterPage, setWatchLaterPage] = useState(1);

  // State for Current View
  const [currentView, setCurrentView] = useState<"home" | "favorites" | "watch-later">("home");

  // Get context data for favorites and watch-later
  const { favorites, watchLater, toggleFavorite, toggleWatchLater } = useMovies();

  // Fetch movies when in the home view and filters change
  useEffect(() => {
    if (currentView === "home") {
      fetchMovies(currentPage);
    }
  }, [searchQuery, minYear, maxYear, selectedGenres, currentPage]);

  const fetchMovies = async (page = 1) => {
    console.log("Fetching movies...");
    try {
      const queryParams = new URLSearchParams();

      queryParams.append("page", page.toString());
      if (searchQuery) {
        queryParams.append("query", searchQuery);
      }
      queryParams.append("minYear", minYear.toString());
      queryParams.append("maxYear", maxYear.toString());
      if (selectedGenres.length > 0) {
        queryParams.append("genres", selectedGenres.join(","));
      }

      const response = await fetch(`/api/titles?${queryParams.toString()}`);
      const data = await response.json();

      setMovies(data.title);
      setTotalPages(data.totalPages); // Assuming your backend returns total pages
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Function to determine which movies to display
  const getMoviesToDisplay = () => {
    switch (currentView) {
      case "favorites":
        return favorites.slice((favoritesPage - 1) * 6, favoritesPage * 6); // Assuming pagination of 6 items
      case "watch-later":
        return watchLater.slice((watchLaterPage - 1) * 6, watchLaterPage * 6); // Assuming pagination of 6 items
      default:
        return movies;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#00003c" }}>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-grow overflow-hidden">
          <Sidebar setCurrentView={setCurrentView} />
          <div className="flex-grow p-8 overflow-auto">
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
              onFavoriteToggle={toggleFavorite}
              onWatchLaterToggle={toggleWatchLater}
            />

            {/* Pagination Component */}
            {currentView === "home" && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}

            {currentView === "favorites" && (
              <Pagination
                currentPage={favoritesPage}
                totalPages={Math.ceil(favorites.length / 6)}
                onPageChange={(page) => setFavoritesPage(page)}
              />
            )}

            {currentView === "watch-later" && (
              <Pagination
                currentPage={watchLaterPage}
                totalPages={Math.ceil(watchLater.length / 6)}
                onPageChange={(page) => setWatchLaterPage(page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
