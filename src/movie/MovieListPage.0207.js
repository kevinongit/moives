import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, ButtonBase, Typography } from '@material-ui/core';
import Spinner from '../misc/Spinner'


import { movieListJSON } from '../api/data';

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // spacing: 2,
    
  },
  paper: {
    padding: theme.spacing(2),
    // margin: `${theme.spacing(2)}px auto`,
    // maxWidth: 600,
    color: theme.palette.text.secondary,
    justifyContent: 'center',
    alignContent: 'center',
  },
  row: {
    alignItems: 'center',
    maxWidth: 600,
    padding: theme.spacing(0),
  },
  left: {
    // width: 50,
    // height: 50,
    justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyItems: 'center',
    padding: theme.spacing(1),
    justifyItems: 'center',
  },
  middle: {
    justifyContent: 'flex-start',
    alignContent: "flex-start",
    alignItems: 'flex-start',
  },
});

class MovieListPage extends React.Component {
  state = {
    enteredId: null,
  }
  handleEnter = (id) => {
    this.setState({
      enteredId: id,
    })
  }

  handleLeave = () => {
    this.setState({
      enteredId: null,
    })
  }
  render () {
    const classes = this.props;
    const movies = movieListJSON;
    const onMovieClick = this.props.onMovieClick;
    // console.log(onMovieClick)
    return (
      <div className={classes.root}>
          <h1>Top Box Office 🍿</h1>
          {
            movies.map(movie => 
              // <div key={movie.id} >
                <Paper 
                  key={movie.id} 
                  className={classes.paper} 
                  onClick={() => {
                    console.log('xxx' + movie.id); 
                    onMovieClick(movie.id);
                  }} 
                  onMouseEnter={() => {console.log('mouseEnter', movie.id); this.handleEnter(movie.id)}}
                  onMouseLeave={() => {console.log('mouseLeave', movie.id); this.handleLeave() }}
                >
                  
                  <Grid container spacing={3} >
                    <Grid item xs={1} className={classes.left}>
                      <Typography variant="h3">{movie.fresh ? '🍅' : ' 🤢'} </Typography>
                      {/* <h3>{movie.fresh ? '🍅' : ' 🤢'} </h3> */}
                    </Grid>
                    <Grid container item xs={8} direction="column" alignItems="flex-start">
                      <Typography gutterBottom variant="h5">
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        MVlist
                      </Typography>
                    </Grid>
                    <Grid item xs={1} className={classes.left} >
                      { this.state.enteredId === movie.id && <Typography variant="h3">{this.props.isLoading ? <Spinner/> : '👉'} </Typography>
                      }
                      
                    </Grid>
                  </Grid>
                  
                </Paper>
              // </div>
              
            )
            
          }
        
      </div>
    )
  }
  
}

export default withStyles(styles)(MovieListPage);