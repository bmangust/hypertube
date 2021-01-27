import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import { IComment } from '../../../models/MovieInfo';
import { primaryColor } from '../../../theme';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 10,
    marginBottom: 5,
  },
  Link: {
    textDecoration: 'none',
    color: 'inherit',
    marginBottom: 10,
  },
  h4: {
    fontWeight: 700,
    fontSize: '1rem',
  },
  Image: {
    marginRight: 10,
    background: primaryColor.main,
  },
  Text: {
    width: '100%',
    textAlign: 'justify',
  },
});

const Comment: React.FC<IComment> = ({ authorId, username, text, avatar }) => {
  const classes = useStyles();

  return (
    <Grid container wrap="nowrap" className={classes.root}>
      <Avatar
        src={avatar}
        alt={`${username}'s avatar`}
        className={classes.Image}
      >
        {username.substr(0, 2)}
      </Avatar>
      <Grid>
        <Link to={`/users/${authorId}`} className={classes.Link}>
          <Typography variant="h4" className={classes.h4}>
            {username}
          </Typography>
        </Link>
        <Typography variant="body2" className={classes.Text}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Comment;
