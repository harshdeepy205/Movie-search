import React, { useEffect, useState } from 'react'
import NavBar from '../../components/Navbar/Nav'
import MovieCard from '../../components/Cards/MovieCard';
import LazyLoading from '../../components/hoc/LazyLoading';

const Home = () => {
    const targetRef = React.useRef(null);
    const [castData, setCastData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData(pageNumber);
    }, []);

    const fetchData = async (pnum) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=7b49ba7b&s=avengers&page=${pnum}`);
            const data = await response.json();
            setCastData(prevData => [...prevData, ...data.Search]);
        } catch (error) {
            console.error("API fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLazyLoadingScroll = () => {
        setPageNumber(prevPage => prevPage + 1);
        fetchData(pageNumber + 1);
    };

    return (
        <>
            <NavBar />
            <div>
                <h1>Movie Results</h1>
                <div className="card-wrapper">
                    {castData.map((movie, index) => (
                        <MovieCard key={index} movieDetails={movie} />
                    ))}
                    <div ref={targetRef} id="last-entry" />
                </div>
                <LazyLoading
                    target={targetRef.current}
                    loading={isLoading}
                    callback={handleLazyLoadingScroll}
                    options={{ threshold: 1 }}
                    observe={!!targetRef.current}
                >
                    {isLoading && <p>Loading...</p>}
                </LazyLoading>
            </div>
        </>
    );
};

export default Home