import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, ButtonBase, Typography } from '@material-ui/core';


import { movieListJSON } from '../api/data';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    spacing: 2,
    
  },
  paper: {
    padding: theme.spacing(2),
    // margin: `${theme.spacing(2)}px auto`,
    maxWidth: 600,
    color: theme.palette.text.secondary,
  },
  left: {
    width: 50,
    height: 50,
  }
}));

export default function MovieListPage(props) {
  const classes = useStyles();
  const movies = movieListJSON;
  const onMovieClick = props.onMovieClick;
  console.log(onMovieClick)
  return (
    <div className={classes.root}>
        <h1>Top Box Office</h1>
        {
          movies.map(movie => 
            <div key={movie.id} >
              <Paper className={classes.paper} onClick={() => {
                  console.log('xxx' + movie.id); 
                  onMovieClick(movie.id);
                }} >
                
                <Grid container spacing={3} component="button" >
                  <Grid item>
                    <Typography variant="h3">{movie.fresh ? '🍅' : ' 🤢'} </Typography>
                  </Grid>
                  <Grid item sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {movie.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          MVlist
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                
              </Paper>
            </div>
            
          )
          
        }
      
    </div>
  )
}
