import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function Spinner(sizeStr="small") {
    const classes = useStyles();
    const size = sizeStr === "small" ? 20 : (sizeStr === "large" ? 60 : 40);

    return (
        <div className={classes.root}>
            <CircularProgress size={size} />
        </div>
    )
}