"use client";

import React from 'react';

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
};

const Movies: React.FC<MoviesProps> = ({ movies }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie) => {
                console.log(movie); // Debugging
                return (
                    <div key={movie.id} className="bg-gray-800 rounded overflow-hidden shadow-lg">
                        <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                            <p className="text-sm text-gray-400">{movie.synopsis}</p>
                            <p className="text-sm text-gray-500 mt-2">Released: {movie.released}</p>
                            <p className="text-sm text-gray-500">Genre: {movie.genre}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Movies;
