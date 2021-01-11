import React, { useState } from 'react';
import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { PlayArrow, StarBorder } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import { MovieCardProps } from '../MovieCard/MovieCard';
import { NavLink } from 'react-router-dom';

interface MovieCardMediumProps {
  card: MovieCardProps;
}

const svg =
  '<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="#ffffff"></path></svg>';

const useStyles = makeStyles({
  Paper: {
    display: 'flex',
    marginBottom: 20,
    padding: 10,
  },
  Img: {
    position: 'relative',
    '& img': {
      height: '15rem',
      width: '10rem',
      objectFit: 'cover',
      marginRight: 20,
      borderRadius: 5,
    },
    // '&::after': {
    //   //   content: "''",
    //   content: `url('data:image/svg+xml; utf8, ${svg}')`,
    //   position: 'absolute',
    //   width: '100px',
    //   height: '100px',
    //   left: 0,
    //   top: 0,
    //   opacity: 1,
    //   padding: '1rem',
    //   borderRadius: '50%',
    //   color: '#fff',
    //   zIndex: 1,
    // },
    // '&:hover::after': {
    //   opacity: 1,
    // },
    '&:hover $PlayIconWrapper': {
      opacity: 1,
    },
  },
  PlayIconWrapper: {
    position: 'absolute',
    left: 'calc(50% - 3.5rem)',
    top: 'calc(50% - 3rem)',
    fontSize: '1rem',
    padding: '1rem',
    borderRadius: '50%',
    backgroundColor: '#000000aa',
    color: '#fff',
    opacity: 0,
    transition: '0.3s',
  },
  PlayIcon: {
    width: '4rem',
    height: '4rem',
  },
  Info: {
    height: '15rem',
    flexWrap: 'nowrap',
  },
  Caption: {
    fontSize: '1.5rem',
  },
  Text: {
    fontSize: '1rem',
  },
  Description: {
    maxHeight: '8rem',
    paddingTop: 10,
    fontSize: '0.9rem',
    position: 'relative',
    flexGrow: 2,
    overflow: 'hidden',
  },
  Shadow: {
    height: 40,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    background: 'linear-gradient(0deg, #ffffff, #ffffff33)',
  },
});

const MovieCardMedium = ({ card }: MovieCardMediumProps) => {
  const classes = useStyles();
  const [rating, setRating] = useState(card.info.rating);

  const handleRatingChange = (
    e: React.ChangeEvent<{}>,
    newRating: number | null
  ) => {
    e.stopPropagation();
    newRating !== null && setRating(newRating);
  };

  return (
    <Paper className={classes.Paper}>
      <NavLink to={`/movies/${card.id}`} className={classes.Img}>
        <img src={card.img} alt={`${card.name} poster`} />
        <div className={classes.PlayIconWrapper}>
          <PlayArrow className={classes.PlayIcon} fontSize="large" />
        </div>
      </NavLink>
      <Grid container direction="column" className={classes.Info}>
        <Grid container alignItems="center" justify="space-between">
          <Typography variant="caption" className={classes.Caption}>
            {card.name}
          </Typography>
          <Rating
            value={rating}
            name={`${card.id}-${card.name.replace(' ', '-')}-rating`}
            emptyIcon={<StarBorder fontSize="inherit" />}
            onChange={handleRatingChange}
          />
        </Grid>
        <Divider />
        <Typography variant="caption" className={classes.Text}>
          Year: {card.info.year}
        </Typography>
        <Typography variant="caption" className={classes.Text}>
          Genres: {card.info.genres.join(', ')}
        </Typography>
        <Typography variant="caption" className={classes.Text}>
          Length: {card.info.length} min
        </Typography>
        <Divider />
        <Typography variant="caption" className={classes.Description}>
          {card.info.description}
          <div className={classes.Shadow} />
        </Typography>
      </Grid>
    </Paper>
  );
};

export default MovieCardMedium;
