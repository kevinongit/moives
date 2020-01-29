import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'

import { movieListJSON } from '../api/data';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  }
}));

export default function MovieListPage(props) {
  const classes = useStyles();
  const movies = movieListJSON;
  return (
    <List className={classes.root}>
      {movies.map(movie =>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={movie.fresh ? 'F' : 'N'}
          >
          </ListItemText>
          <ListItemText
            primary={movie.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                  >
                    MV
                  </Typography>
              </React.Fragment>
            }
          >

          </ListItemText>
        </ListItem>
      )

      }
    </List>
  )
}
