import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    const { fetchData, setPageNumber, setIsError } = props
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Debounce the search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Adjust debounce delay as needed

        return () => clearTimeout(timer); // Cleanup timer
    }, [searchTerm]);

    // Trigger API call on debounced term change
    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchData(1, debouncedSearchTerm); // Fetch with search term
            setPageNumber(1);
            setIsError(null)
        }
    }, [debouncedSearchTerm]);

    return (
        <nav className="navbar navbar-expand-lg bg-black">
            <div className="container-fluid px-4">
                <div className='d-flex align-items-center gap-1 mobile-search'>
                    <a className="navbar-brand m-0 text-light" href="#">Movies</a>
                    <div className='search-container d-flex justify-content-center my-3 d-none'>
                        <div className='d-flex gap-1 align-items-center'>
                            <input className="form-control me-2" type="search" placeholder="Search Movie/Series" aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center gap-1">
                        <li className="nav-item text-light">
                            <NavLink
                                className={({ isActive }) =>
                                    ` text-light nav-link ${isActive ? 'active' : ''}`
                                }
                                to="/"
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item text-light">
                            <NavLink
                                className={({ isActive }) =>
                                    ` text-light nav-link ${isActive ? 'active' : ''}`
                                }
                                to="/favorites"
                            >
                                Favorites
                            </NavLink>
                        </li>
                        <li className="nav-item desktop-search">
                            <div className='search-container d-flex justify-content-center my-3'>
                                <div className='d-flex gap-1 align-items-center'>
                                    <input className="form-control me-2" type="search" placeholder="Search Movie/Series" aria-label="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
