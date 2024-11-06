"use client";

import React from "react";

type FiltersProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  minYear: number;
  setMinYear: (year: number) => void;
  maxYear: number;
  setMaxYear: (year: number) => void;
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
};

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  selectedGenres,
  setSelectedGenres,
}) => {
  // Event handlers for filters
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleYearChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number(e.target.value);
    if (type === "min") {
      setMinYear(value);
    } else {
      setMaxYear(value);
    }
  };

  const handleGenreChange = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="mb-4">
      {/* Search Bar */}
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border bg-blue-800 rounded-lg w-full"
        />
      </div>

      {/* Year Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="number"
          placeholder="Min Year"
          value={minYear}
          onChange={(e) => handleYearChange(e, "min")}
          className="p-2 border bg-blue-800 rounded-lg w-1/2"
        />
        <input
          type="number"
          placeholder="Max Year"
          value={maxYear}
          onChange={(e) => handleYearChange(e, "max")}
          className="p-2 border bg-blue-800 rounded-lg w-1/2"
        />
      </div>

      {/* Genres */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          "Romance",
          "Horror",
          "Drama",
          "Action",
          "Mystery",
          "Fantasy",
          "Thriller",
          "Western",
          "Sci-Fi",
          "Adventure",
        ].map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreChange(genre)}
            className={`p-2 border border-teal-400 rounded-lg ${
              selectedGenres.includes(genre)
                ? "bg-teal-400 text-white"
                : "bg-transparent text-white"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
