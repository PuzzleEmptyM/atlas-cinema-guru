"use client";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Movies from "./components/Movies";
import Filters from "./components/Filters";
import React, { useState, useEffect } from "react";


export default function Page() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minYear, setMinYear] = useState(1990);
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies...");
        const genreQuery = selectedGenres.join(',');
        const response = await fetch(`/api/titles`);
        const data = await response.json();
        console.log("Fetched Data:", data);
        setMovies(data.title); // Assuming the fetched data is in data.title
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    fetchMovies();
  }, [searchQuery, minYear, maxYear, selectedGenres, currentPage]);

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#00003c' }}>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <div className="flex-1 p-4">
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
            <Movies movies={movies} />
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="p-2 m-1 border rounded bg-gray-300 hover:bg-gray-400"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 m-1 border rounded bg-gray-300 hover:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
