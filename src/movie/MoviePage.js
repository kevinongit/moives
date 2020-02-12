import React, { Suspense, useState } from 'react';
import { Grid, Paper, Typography, Divider } from '@material-ui/core';

import { movieReviewsJSON, movieDetailsJSON } from '../api/data';
import { fetchMovieDetails } from '../api';
import { createResource } from 'hitchcock'
import Spinner from '../misc/Spinner'


export default function MoviePage(props) {
  return (
    <div>
      <MovieDetails id={props.id} />
      <div className="MovieReviews">
        <MovieReviews id={props.id} />
      </div>
    </div>
  )
}

const movieDetailsFetcher = createResource(
  fetchMovieDetails,
  id => `/movies/${id}/details`
);

function MovieDetails(props) {
  const movie = movieDetailsFetcher.read(props.id);

  return (
    <div className="MovieDetails">
      <MoviePoster src={movie.poster} />
      <h1>{movie.title}</h1>
      <MovieMetrics {...movie} />
    </div>
  )
}
// function MovieDetails(props) {
//   const [movie, setMovie] = useState(null);
//   // const movie = movieDetailsJSON[props.id];

//   const fm = fetchMovieDetails({...props, interval: 3000});
//   fm.then(m => setMovie(m));
//   return (
//     movie ? 
//       <div className={classes.paper}>
//         <Grid container spacing={2}>
//           <MoviePoster src={movie.poster} />
//           {/* <h2>{movie.title}</h2> */}
//           <MovieMatrics {...movie} />
//         </Grid>
//       </div>
//       :
//       <Spinner isBig />
//   )
// }

function MoviePoster(props) {
  return (
    <div className="MoviePoster">
      <img className="PosterImage" src={props.src} alt="poster" />
    </div>
  )
}

function MovieMetrics(movie) {
  return (
    <div>
      <div>
        <h3>Tomatometer</h3>
        {movie.fresh ? '🍅' : ' 🤢'} {movie.rating}
      </div>
      <div>
        <h3>Critics Consensus</h3>
        {movie.consensus}
      </div>
    </div>
  )
}

function MovieReviews(props) {
  const reviews = movieReviewsJSON[props.id];
  return (reviews || []).map((review, index) => (
    <div className="review" key={index}>
      <div className="summary">{review.text}</div>
      {/* <div className="author">{review.author}</div> */}
    </div>
  ))
}

// function MovieReview(props) {
//   const classes=useStyles();
//   return (
//       <Grid item xs>
//         <Paper className={classes.reviewPaper}> {props.text} </Paper>

//       </Grid>
//   )
// }
