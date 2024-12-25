import React, { useState } from 'react';

const MovieCard = (props) => {
    const { movieDetails, allList, indexNumber, isFavoriteCard = false, onUpdateFavorites } = props;

    const addToFavorite = () => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const toastElement = document.getElementById('myToast');
        const toast = new window.bootstrap.Toast(toastElement);

        const isAlreadyFavorite = existingFavorites.some(
            (movie) => movie.imdbID === movieDetails.imdbID
        );

        if (isAlreadyFavorite) {
            toast.show(); // Show the toast
            return;
        }

        const updatedFavorites = [...existingFavorites, movieDetails];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        // alert('Movie added to favorites!');
        onUpdateFavorites?.(updatedFavorites);
        toast.show(); // Show the toast
    };

    const removeFromFavorite = () => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const toastElement = document.getElementById('myToast');
        const toast = new window.bootstrap.Toast(toastElement);

        // Remove the current movie from the list
        const updatedFavorites = existingFavorites.filter(
            (movie) => movie.imdbID !== movieDetails.imdbID
        );

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        toast.show(); // Show the toast
        onUpdateFavorites?.(updatedFavorites); // Notify parent to update UI if necessary
    };

    return (
        <>
            <div
                className="card"
                id={indexNumber === allList?.Search?.length - 1 ? 'last-entry' : null}
            >
                <img
                    src={movieDetails.Poster}
                    className=""
                    alt="poster-image"
                    style={{ width: '100%', height: '75%' }}
                />
                <div className="card-body d-flex flex-column justify-content-evenly">
                    <h5 className="card-title mb-0">{movieDetails.Title}</h5>
                    <div className="align-items-center d-flex gap-2">
                        <span className="badge rounded-pill text-bg-info text-capitalize">
                            {movieDetails.Type}
                        </span>
                        <p className="card-text">{movieDetails.Year}</p>
                    </div>
                    {!isFavoriteCard && (
                        <button className="btn btn-primary" id="liveToastBtn" onClick={addToFavorite}>
                            Add to Favorite
                        </button>
                    )}

                    {isFavoriteCard && (
                        <button className="btn btn-danger" onClick={removeFromFavorite}>
                            Remove from Favorite
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default MovieCard;
