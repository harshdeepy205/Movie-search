import React, { useRef } from 'react';
import MovieCard from '../../components/Cards/MovieCard';
import LazyLoading from '../../components/hoc/LazyLoading';

const Home = ({ castData, fetchData, setPageNumber, pageNumber, isLoading, userQuery, isError }) => {
	const targetRef = useRef(null);

	const handleLazyLoadingScroll = () => {
		setPageNumber(prevPage => prevPage + 1);
		fetchData(pageNumber + 1, userQuery);
	};

	return (
		<div>
			{/* Display error message if isError is present */}
			{isError && (
				<div className='my-4 text-center'>
					<span className='fs-3 text-danger'>{isError}</span>
				</div>
			)}

			{/* Display message when no data is available */}
			{(!castData || castData.length === 0) && !isError && (
				<div className='my-4 text-center'>
					<h2>Search your favorite movies</h2>
				</div>
			)}

			{/* Render LazyLoading only if there's no error */}
			{!isError && (
				<LazyLoading
					target={targetRef.current}
					loading={isLoading}
					callback={handleLazyLoadingScroll}
					options={{ threshold: 1 }}
					observe={!!targetRef.current}
				>
					<div className="card-wrapper mt-4">
						{castData && castData.map((movie, index) => (
							<MovieCard key={index} movieDetails={movie} />
						))}
						<div ref={targetRef} id="last-entry" />
					</div>
					{isLoading && (
						<div className='d-flex justify-content-center'>
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					)}
				</LazyLoading>
			)}

			{/* Toast for success message */}
			<div
				className="toast align-items-center text-bg-success"
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
						Added to Favorite
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

export default Home;
