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
      {/* Container for Search and Genres */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        {/* Left Container: Search Bar and Year Inputs */}
        <div className="flex flex-col gap-4 max-w-lg w-full">
          {/* Search Bar */}
          <div>
            <label htmlFor="search" className="text-white block mb-1">Search Movies</label>
            <input
              id="search"
              type="text"
              placeholder="Search Movies..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 border border-teal-400 bg-blue-800 rounded-full w-full"
            />
          </div>

          {/* Year Inputs */}
          <div className="flex gap-4">
            <div>
              <label htmlFor="minYear" className="text-white block mb-1">Min Year</label>
              <input
                id="minYear"
                type="number"
                placeholder="Min Year"
                value={minYear}
                onChange={(e) => handleYearChange(e, "min")}
                className="p-2 border border-teal-400 bg-blue-800 rounded-full w-full"
              />
            </div>
            <div>
              <label htmlFor="maxYear" className="text-white block mb-1">Max Year</label>
              <input
                id="maxYear"
                type="number"
                placeholder="Max Year"
                value={maxYear}
                onChange={(e) => handleYearChange(e, "max")}
                className="p-2 border border-teal-400 bg-blue-800 rounded-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Spacer Div for Better Alignment */}
        <div className="flex-grow"></div>

        {/* Right Container: Genres */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 md:w-1/2">
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
              className={`p-2 border border-teal-400 rounded-full w-28 ${
                selectedGenres.includes(genre)
                  ? "bg-teal-400 rounded-full text-white"
                  : "bg-transparent rounded-full text-white"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
