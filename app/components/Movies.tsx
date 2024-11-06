// app/components/Movies.tsx
"use client";

import React, { useEffect, useState } from 'react';

const Movies = () => {
    // State for managing movie data, filters, and pagination
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [minYear, setMinYear] = useState(1990);
    const [maxYear, setMaxYear] = useState(new Date().getFullYear());
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch data from API whenever filters/pagination changes
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const genreQuery = selectedGenres.join(',');
                const response = await fetch(
                    `/api/titles?page=${currentPage}&minYear=${minYear}&maxYear=${maxYear}&query=${searchQuery}&genres=${genreQuery}`
                );
                const data = await response.json();
                setMovies(data.title); // assuming the fetched data is in data.title
            } catch (error) {
                console.error("Failed to fetch movies", error);
            }
        };

        fetchMovies();
    }, [searchQuery, minYear, maxYear, selectedGenres, currentPage]);

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

    // Render movie cards
    return (
        <div className="container mx-auto p-4">
            {/* Search and filter UI */}
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

            {/* Movie cards UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 rounded overflow-hidden shadow-lg">
                        <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                            <p className="text-sm text-gray-400">{movie.synopsis}</p>
                            <p className="text-sm text-gray-500 mt-2">Released: {movie.released}</p>
                            <p className="text-sm text-gray-500">Genre: {movie.genre}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
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
    );
};

export default Movies;
