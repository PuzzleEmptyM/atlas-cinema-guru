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
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search Movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 border rounded"
            />
            <input
                type="number"
                placeholder="Min Year"
                value={minYear}
                onChange={(e) => handleYearChange(e, 'min')}
                className="p-2 ml-2 border rounded"
            />
            <input
                type="number"
                placeholder="Max Year"
                value={maxYear}
                onChange={(e) => handleYearChange(e, 'max')}
                className="p-2 ml-2 border rounded"
            />
            <div className="flex flex-wrap mt-4">
                {['Romance', 'Horror', 'Drama', 'Action', 'Mystery', 'Fantasy', 'Thriller', 'Western', 'Sci-Fi', 'Adventure'].map((genre) => (
                    <button
                        key={genre}
                        onClick={() => handleGenreChange(genre)}
                        className={`p-2 m-1 rounded ${
                            selectedGenres.includes(genre) ? 'bg-blue-500 text-white' : 'bg-gray-200'
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
