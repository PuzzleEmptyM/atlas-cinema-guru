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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie) => {
                return (
                    <div key={movie.id} className="relative group overflow-hidden rounded-lg shadow-lg w-full h-[20rem]">
                        {/* Favorite and Watch Later Buttons */}
                        <div className="absolute top-2 right-2 flex space-x-2 z-10">
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

                        {/* Movie Info Overlay (visible on hover) */}
                        <div
                            className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                            <p className="text-sm text-gray-300 mt-2">{movie.synopsis}</p>
                            <p className="text-sm text-gray-400 mt-4">Released: {movie.released}</p>
                            <p className="text-sm text-gray-400">Genre: {movie.genre}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Movies;
