"use client";

import React from 'react';
import { FaStar, FaClock } from "react-icons/fa";

type Movie = {
    id: string;
    title: string;
    synopsis: string;
    released: number;
    genre: string;
    favorited: boolean;
    watchLater: boolean;
    image: string;
};

type MoviesProps = {
    movies: Movie[];
    onFavoriteToggle: (id: string) => void;
    onWatchLaterToggle: (id: string) => void;
};

const Movies: React.FC<MoviesProps> = ({ movies, onFavoriteToggle, onWatchLaterToggle }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center">
            {movies.map((movie) => {
                return (
                    <div 
                        key={movie.id} 
                        className="relative group overflow-hidden rounded-lg shadow-lg border border-teal-400"
                        style={{ aspectRatio: '1 / 1' }} // Ensures the card remains square.
                    >
                        {/* Favorite and Watch Later Buttons (Visible on Hover) */}
                        <div className="absolute top-2 right-2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FaStar
                                className={`text-2xl cursor-pointer ${
                                    movie.favorited ? "text-yellow-400" : "text-gray-400"
                                }`}
                                onClick={() => onFavoriteToggle(movie.id)}
                            />
                            <FaClock
                                className={`text-2xl cursor-pointer ${
                                    movie.watchLater ? "text-blue-400" : "text-gray-400"
                                }`}
                                onClick={() => onWatchLaterToggle(movie.id)}
                            />
                        </div>

                        {/* Movie Image */}
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Movie Info Banner (visible on hover, positioned at the bottom) */}
                        <div
                            className="absolute bottom-0 left-0 w-full bg-blue-800 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                        >
                            <h3 className="text-lg font-bold">{movie.title} ({movie.released})</h3>
                            <p className="text-sm mt-1">{movie.synopsis}</p>
                            <div className="mt-2">
                                <span className="inline-block px-3 py-1 text-sm font-semibold bg-teal-400 text-white border border-teal-400 rounded">{movie.genre}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Movies;
