import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useParams } from 'react-router';
import { cards } from '../../mocks';
// import { MovieCardProps } from '../MovieCard/MovieCard';

// interface MovieFullInfoProps {
//   movie?: MovieCardProps;
// }

interface TParams {
  id: string;
}

const useStyles = makeStyles({
  root: {},
  Header: {
    fontSize: '2rem',
    margin: 10,
  },
  MainInfo: {
    padding: 10,
  },
  Image: {
    width: '15rem',
    height: 'auto',
    marginRight: 10,
  },
  MainInfoText: {},
  Link: {
    marginLeft: 5,
    textTransform: 'capitalize',
  },
});

const MovieFullInfo = ({ match }: RouteComponentProps<TParams>) => {
  const classes = useStyles();
  const params = useParams();
  const movie = cards.find((movie) => movie.id === match.params.id);
  console.log(params, cards, movie);
  if (!movie) return null;

  return (
    <Grid container direction="column" className={classes.root}>
      <Typography variant="h2" className={classes.Header}>
        {movie.name}
      </Typography>
      <Divider />
      <Grid container wrap="nowrap" className={classes.MainInfo}>
        <img
          className={classes.Image}
          src={movie.img}
          alt={`${movie.name} poster`}
        />
        <Grid item container direction="column">
          <Typography className={classes.MainInfoText}>
            {`Production year: ${movie.info.year}`}
          </Typography>
          <Typography className={classes.MainInfoText}>
            <Grid container wrap="nowrap">
              <Typography>{'Genres: '}</Typography>
              {movie.info.genres.map((genre) => (
                <Link
                  to={`/genres/${genre}`}
                  key={genre}
                  className={classes.Link}
                >
                  {genre}
                </Link>
              ))}
            </Grid>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieFullInfo;
