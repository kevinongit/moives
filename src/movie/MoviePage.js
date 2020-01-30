import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { movieDetailsJSON, movieReviewsJSON } from '../api/data';

const useStyles = makeStyles(theme => ({
  poster: {
    width: 100,
    height: 150,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function MoviePage(props) {
  return (
    <div>
      <MovieDetails id={props.id} />
      <MovieReviews id={props.id} />
    </div>
  )
}

function MovieDetails(props) {
  const classes = useStyles();
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
  const classes = useStyles();
  return (
    <div className={classes.poster}>
      <img className={classes.img} src={props.src} alt="poster" />
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
