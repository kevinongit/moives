import React from 'react';

import { movieReviewsJSON, movieDetailsJSON } from '../api/data';
import { fetchMovieDetails, fetchMovieReviews } from '../api';
import { createResource } from 'hitchcock';


export default function MoviePage(props) {
  return (
    <div>
      <MovieDetails id={props.id} />
      
      <MovieReviews id={props.id} />
      
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
      <hr className="TitleHr" />
      <MovieMetrics {...movie} />
    </div>
  )
}

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
        <div className="Meter">
          <div className="MeterItem">
            <h5 className="MetricsTitle">TOMATOMETER</h5>
            <div className="tomato">
              {movie.fresh ? '🍅' : ' 🤢'} {movie.rating}
            </div>
          </div>
          <div className="MeterItem">
            <h5 className="MetricsTitle"> AUDIENCE</h5>
            <div className="tomato">
            🍿 {movie.audience}
            </div>
          </div>
        </div>

      </div>
      <div>
        <h5 className="MetricsTitle">CRITICS CONSENSUS</h5>
        {movie.consensus}
      </div>
    </div>
  )
}

const movieReviewsFetcher = createResource(
  fetchMovieReviews,
  id => `/movies/${id}/reviews`
);

function MovieReviews(props) {
  const reviews = movieReviewsFetcher.read(props.id);
  return (
    <div className="MovieReviews">
      {(reviews || []).map((review, index) => (
      
        <div className="review" key={index}>
          {review.fresh ? '🍅' : ' 🤢'} {review.fresh}
          <div className="summary">{review.text}</div>
          {/* <div className="author">{review.author}</div> */}
        </div>
      )) }
    </div>
  )
}

// function MovieReview(props) {
//   const classes=useStyles();
//   return (
//       <Grid item xs>
//         <Paper className={classes.reviewPaper}> {props.text} </Paper>

//       </Grid>
//   )
// }
