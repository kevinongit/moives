import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Divider } from '@material-ui/core';

import { movieDetailsJSON, movieReviewsJSON } from '../api/data';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '10px',
    maxWidth: 600,
  },
  poster: {
    width: 200,
    height: 250,
  },
  img: {
    // margin: 'auto',
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <MoviePoster src={movie.poster} />
          {/* <h2>{movie.title}</h2> */}
          <MovieMatrics {...movie} />
        </Grid>
      </Paper>
      
    </div>
  )
}

function MoviePoster(props) {
  const classes = useStyles();
  return (
    <Grid item className={classes.poster}>
      <img className={classes.img} src={props.src} alt="poster" />
    </Grid>
  )
}

function MovieMatrics(props) {
  return (
    <Grid item xs={12} sm container>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item xs>
          <Typography gutterBottom variant="h4">
            {props.title}
          </Typography>
        </Grid>
        {/* <Divider/> */}
      </Grid>
      <Grid item container direction="row" spacing={10}>
        <Grid item direction="coloumn" spacing={3}>
          <Grid item>
            <Typography variant="subtitle2" color="textPrimary">
              TOMATOMETER
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" color="textPrimary">
            {props.fresh ? '🍅' : ' 🤢'} {props.rating}
            </Typography>
          </Grid>
        </Grid>

        <Grid item  direction="coloumn" spacing={2}>
          <Grid item>
            <Typography variant="subtitle2" color="textPrimary">
              AUDIENCE
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" color="textPrimary">
              {'🍿'} {props.audience}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item  direction="coloumn" spacing={2}>
        <Grid item>
          <Typography variant="subtitle2" color="textPrimary">
            CRITICS CONSENSUS
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            {props.consensus}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
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