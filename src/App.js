import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Nav';
import './App.css';
import Favorites from './pages/Favorites/Favorites';

function App() {
	const [castData, setCastData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [userQuery, setUserQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);

	const fetchData = async (pnum = 1, query = userQuery) => {
		setUserQuery(query);
		setIsLoading(true);
		try {
			const response = await fetch(`http://www.omdbapi.com/?apikey=7b49ba7b&s=${query}&page=${pnum}`);
			const data = await response.json();
			if(data.Response === 'True') {
				setCastData(prevData => (pnum === 1 ? data?.Search : [...prevData, ...data?.Search])); // Reset on new search
			} else {
				setIsError("Something went wrong!")
			}
		} catch (error) {
			console.error("API fetch error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Router>
			<div className="App">
				<Navbar fetchData={fetchData} setPageNumber={setPageNumber} setIsError={setIsError}/>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								castData={castData}
								fetchData={fetchData}
								setPageNumber={setPageNumber}
								pageNumber={pageNumber}
								isLoading={isLoading}
								userQuery={userQuery}
								isError={isError}
							/>
						}
					/>
					<Route path="/favorites" element={<Favorites />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
