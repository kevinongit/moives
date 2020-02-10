import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Grid, } from '@material-ui/core';

import Spinner from '../misc/Spinner'


// import { movieListJSON } from '../api/data';
import { fetchMovieList } from '../api'

const styles = theme => ({
  root: {
    // width: "100%",
    flexGrow: 1,
    maxWidth: 400,
    // backgroundColor: theme.palette.background.paper,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    // backgroundColor: "white",
    // borderWidth: 10,
    // border:"2px",
    // borderColor: 'red',
  },
  title: {
    // margin: theme.spacing(4, 0, 2),
  },
  inline: {
    display: "inline",
  },
});

class MovieListPage extends React.Component {
  state = {
    movies: null,
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

  componentDidMount() {
    fetchMovieList({interval: 0}).then(list => this.setState({ movies : list }))
  }
  render() {
    const classes = this.props;
    const movies = this.state.movies;

    const onMovieClick = this.props.onMovieClick;
    // console.log(onMovieClick)
    return (
      <div className={classes.root}>
        <div style={{margin: 10}}>
          <Typography variant="h3" className={classes.title}>Top Box Office 🍿</Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item >

            <div >
              <List>
                {
                  movies && movies.map(movie => (
                    <div key={movie.id}>
                      <ListItem
                        // alignItems="flex-start"
                        key={movie.id}
                        onClick={() => {
                          console.log('movie.id : ' + movie.id);
                          onMovieClick(movie.id);
                        }}
                        onMouseEnter={() => { console.log('mouseEnter', movie.id); this.handleEnter(movie.id) }}
                        onMouseLeave={() => { console.log('mouseLeave', movie.id); this.handleLeave() }}
                      >
                        <div style={{width: 100,}}>
                          <ListItemText
                            primary={
                              <Typography variant="h3"> {movie.fresh ? '🍅' : ' 🤢'} </Typography>
                            }
                          />
                        </div>
                        <div style={{width: 600, borderWidth: "2px",}}>
                        <ListItemText
                          primary={
                            <Typography variant="h5">{movie.title}</Typography>
                          }
                          secondary={
                            <Typography variant="body2" gutterBottom>MVList</Typography>
                          }
                        />
                        </div>

                        <ListItemText
                          primary={
                            this.state.enteredId === movie.id && <Typography variant="h3">{this.props.isLoading ? <Spinner /> : '👉'} </Typography>
                          }
                        />

                      </ListItem>
                      <Divider component="li" />
                    </div>
                  ))
                }
              </List>
            </div>
          </Grid>

        </Grid>
      </div>
    )
  }

}

export default withStyles(styles)(MovieListPage);
