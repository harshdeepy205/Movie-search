import React from 'react'

const MovieCard = (props) => {
    const { movieDetails } = props
    return (
        <>
            <div className="card">
                <img src={movieDetails.Poster} className="img-fluid" alt="..." style={{height:'100vh'}}/>
                <div className="card-body">
                    <h5 className="card-title">{movieDetails.Title}</h5>
                    <div className='align-items-center d-flex gap-2 my-2'>
                        <span className="badge rounded-pill text-bg-info">{movieDetails.Type}</span>
                        <p className="card-text">{movieDetails.Year}</p>
                    </div>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </>
    )
}

export default MovieCard