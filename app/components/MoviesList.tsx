"use client";

import { useState, useEffect } from "react";
import { fetchTitles } from "../../lib/data";
import MovieCard from "./MovieCard"; // A component to display each movie card

const MoviesList = ({ userEmail }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [minYear, setMinYear] = useState(1900);
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const results = await fetchTitles(page, minYear, maxYear, query, selectedGenres, userEmail);
        setMovies(results);
      } catch (error) {
        console.error("Failed to load movies:", error);
      }
    };
    loadMovies();
  }, [page, minYear, maxYear, query, selectedGenres, userEmail]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="p-4 flex-grow">
      {/* Filters */}
      <div className="flex flex-col space-y-4 mb-6">
        <input
          type="text"
          placeholder="Search Movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded"
        />
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Year"
            value={minYear}
            onChange={(e) => setMinYear(Number(e.target.value))}
            className="p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max Year"
            value={maxYear}
            onChange={(e) => setMaxYear(Number(e.target.value))}
            className="p-2 rounded"
          />
        </div>
        <div className="flex space-x-2">
          {["Romance", "Horror", "Drama", "Action", "Mystery", "Fantasy", "Thriller", "Western", "Sci-Fi", "Adventure"].map(
            (genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`p-2 rounded ${selectedGenres.includes(genre) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {genre}
              </button>
            )
          )}
        </div>
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="p-2">
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)} className="p-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesList;
