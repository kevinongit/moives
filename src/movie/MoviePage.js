import React from 'react';
import { movieDetailsJSON, movieReviewsJSON } from '../api/data';

export default function MoviePage(props) {
  return (
    <div>
      <MovieDetails id={props.id} />
      <MovieReviews id={props.id} />
    </div>
  )
}

function MovieDetails(props) {
  const movie = movieDetailsJSON[props.id];
  return (
    <div className='MovieDetails'>
      <MoviePoster src={movie.poster} />
      <h1>{movie.title}</h1>
      <MovieMatrics {...movie} />
    </div>
  )
}

function MoviePoster(props) {
  return (
    <div className="MoviePoster">
      <img src={props.src} alt="poster" />
    </div>
  )
}

function MovieMatrics(props) {
  return (
    <div className='MovieMetrics-tomato'>
      <h4>Tomatometer</h4>
      <p>
        {props.fresh ? '🍅' : ' 🤢'}
        {' '}
        {props.rating}
      </p>
    </div>
  )
}

function MovieReviews(props) {
  const reviews = movieReviewsJSON[props.id];
  return (
    <div className="MovieReviews">
      {reviews.map(review =>
        <MovieReview
          key={review.id}
          {...review}
        />
      )}
    </div>
  )
}

function MovieReview(props) {
  return (
    <div className="MovieReview">

    </div>
  )
}
