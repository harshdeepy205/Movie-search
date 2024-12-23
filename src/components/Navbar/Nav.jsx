import React from 'react'

const Nav = () => {
    // const fetchCastData = async () => {
    //     try {
    //       const response = await fetch(
    //         'https://imdb-top-100-movies.p.rapidapi.com/',
    //         {
    //           method: 'GET',
    //           headers: {
    //             'x-rapidapi-key': 'ba7e494eb4msh0b1139db843b8c4p170146jsn0cb3c8894103',
    //             'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
    //           },
    //         }
    //       );
  
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch data');
    //       }
  
    //       const data = await response.json();
    //       setCastData(data);
    //     } catch (err) {
    //       setError(err.message);
    //     }
    //   };
    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand m-0" href="#">Movie Search</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Favorites</a>
                        </li>
                        <li className="nav-item">
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Nav
