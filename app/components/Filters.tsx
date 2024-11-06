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
        <div className="bg-teal-100 p-4 rounded-lg shadow-md mb-6">
            {/* Search Input */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <input
                    type="text"
                    placeholder="Search Movies..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-black"
                />
                
                {/* Year Inputs */}
                <div className="flex gap-4">
                    <input
                        type="number"
                        placeholder="Min Year"
                        value={minYear}
                        onChange={(e) => handleYearChange(e, 'min')}
                        className="w-24 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-black"
                    />
                    <input
                        type="number"
                        placeholder="Max Year"
                        value={maxYear}
                        onChange={(e) => handleYearChange(e, 'max')}
                        className="w-24 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-black"
                    />
                </div>
            </div>

            {/* Genre Buttons */}
            <div className="flex flex-wrap mt-6 gap-3">
                {['Romance', 'Horror', 'Drama', 'Action', 'Mystery', 'Fantasy', 'Thriller', 'Western', 'Sci-Fi', 'Adventure'].map((genre) => (
                    <button
                        key={genre}
                        onClick={() => handleGenreChange(genre)}
                        className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                            selectedGenres.includes(genre)
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-black hover:bg-teal-400 hover:text-white'
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
