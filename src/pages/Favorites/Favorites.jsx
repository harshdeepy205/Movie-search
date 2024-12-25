import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/Cards/MovieCard';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    // Fetch favorites from localStorage on component mount
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    // Handle updating the favorites when a movie is removed
    const handleUpdateFavorites = (updatedFavorites) => {
        setFavorites(updatedFavorites);
    };

    return (
        <div className="card-wrapper">
            {favorites && favorites.length > 0 ? (
                favorites.map((data, index) => (
                    <MovieCard
                        isFavoriteCard={true}
                        key={index}
                        movieDetails={data}
                        allList={favorites}
                        onUpdateFavorites={handleUpdateFavorites} // Pass callback to update favorites
                    />
                ))
            ) : (
                <h4>No Data</h4>
            )}

            <div
                className="toast align-items-center text-bg-warning"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                id="myToast"
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 1050,
                }}
            >
                <div className="d-flex">
                    <div className="toast-body">
                        Removed from Favorite
                    </div>
                    <button
                        type="button"
                        className="btn-close me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default Favorites;
