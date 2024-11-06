"use client";

import React from 'react';

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

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = Number(e.target.value);
        if (type === 'min') {
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
        <div className="mb-6 px-4 py-4 bg-teal-50 rounded-lg">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search Movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-blue-400"
            />

            {/* Year Inputs */}
            <div className="flex space-x-4 mb-4">
                <input
                    type="number"
                    placeholder="Min Year"
                    value={minYear}
                    onChange={(e) => handleYearChange(e, 'min')}
                    className="p-2 border border-gray-300 rounded w-1/2 focus:outline-none focus:ring focus:ring-blue-400"
                />
                <input
                    type="number"
                    placeholder="Max Year"
                    value={maxYear}
                    onChange={(e) => handleYearChange(e, 'max')}
                    className="p-2 border border-gray-300 rounded w-1/2 focus:outline-none focus:ring focus:ring-blue-400"
                />
            </div>

            {/* Genre Filters */}
            <div className="flex flex-wrap gap-2">
                {['Romance', 'Horror', 'Drama', 'Action', 'Mystery', 'Fantasy', 'Thriller', 'Western', 'Sci-Fi', 'Adventure'].map((genre) => (
                    <button
                        key={genre}
                        onClick={() => handleGenreChange(genre)}
                        className={`px-3 py-1 rounded-full transition-colors ${
                            selectedGenres.includes(genre)
                                ? 'bg-teal-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
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
