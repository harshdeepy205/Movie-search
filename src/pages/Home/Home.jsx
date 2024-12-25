import React, { useRef } from 'react';
import MovieCard from '../../components/Cards/MovieCard';
import LazyLoading from '../../components/hoc/LazyLoading';

const Home = ({ castData, fetchData, setPageNumber, pageNumber, isLoading, userQuery }) => {
	const targetRef = useRef(null);

	const handleLazyLoadingScroll = () => {
		setPageNumber(prevPage => prevPage + 1);
		fetchData(pageNumber + 1, userQuery);
	};

	return (
		<div>
			{!castData || castData.length === 0 &&
				<div className='my-2 text-center'>
					<h2>Search your favorites movies</h2>
				</div>
			}
			<div className="card-wrapper">
				{castData && castData.map((movie, index) => (
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
				{isLoading &&
					<div className='d-flex justify-content-center'>
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				}
			</LazyLoading>

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
		</div >
	);
};

export default Home;
