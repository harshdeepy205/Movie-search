import React, { useEffect, useState } from 'react'
import NavBar from '../../components/Navbar/Nav'
import MovieCard from '../../components/Cards/MovieCard';

const Home = () => {

  const [castData, setCastData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status


  useEffect(() => {
    fetch2();
  }, []);


  const fetch2 = async () => {
    setIsLoading(true); // Set loading to true when API call starts
    try {
      const apiUrl = "http://www.omdbapi.com/?apikey=7b49ba7b&s=avengers&page=1";
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data, "data")
      setCastData(data); // Store response in castData
    } catch (error) {
      console.error("API fetch error:", error);
    } finally {
      setIsLoading(false); // Set loading to false when API call completes
    }
  };

  return (
    <>
      <NavBar />
      {isLoading ? (
        <p>Loading...</p> // Show loading indicator
      ) : (
        <div>
          <h1>Movie Results</h1>
          <div>
            {castData && castData.Search ? (
              castData.Search.map((movie, index) => (
                <MovieCard movieDetails={movie} key={index} />
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
