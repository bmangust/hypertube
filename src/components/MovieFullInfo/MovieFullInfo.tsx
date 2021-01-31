import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IUser } from '../../models/MovieInfo';
import HorizontalGrid from '../HorizontalGrid/HorizontalGrid';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import CategoryHeader from '../CategoryHeader/CategoryHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Comments from '../Comments/Comments';
import { useAppDispatch } from '../../store/store';
import { loadMovie } from '../../store/features/MoviesSlice';
import { useTranslation } from 'react-i18next';
import { primaryColor } from '../../theme';

interface TParams {
  id: string;
}

const useStyles = makeStyles({
  root: {
    fontSize: '1.3rem',
    padding: '10px 0',
  },
  Header: {
    fontSize: '2rem',
    margin: '0 10px',
    fontWeight: 700,
  },
  Divider: {
    margin: '10px 0',
  },
  Poster: {
    height: '23rem',
    marginRight: 10,
  },
  MainInfoText: {
    margin: 5,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: 'inherit',
    fontWeight: 200,
  },
  Link: {
    marginLeft: 5,
    fontSize: 'inherit',
    color: 'inherit',
    fontWeight: 'inherit',
    textTransform: 'capitalize',
    '&:hover': {
      color: primaryColor.light,
    },
  },
  Description: {
    marginTop: 10,
    fontSize: 'inherit',
  },
  Video: {
    margin: '15px 0',
  },
  AdditionalInfo: {
    margin: '10px 0',
  },
});

const MovieFullInfo = ({ match }: RouteComponentProps<TParams>) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { movies } = useSelector((state: RootState) => state.movies);
  const movie = movies.find((movie) => movie.id === match.params.id);
  const { t } = useTranslation();

  // if no movies in redux - load one
  useEffect(() => {
    if (!movie) dispatch(loadMovie(+match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapItemsToLinks = (
    items: (string | IUser)[] | undefined
  ): JSX.Element[] | string => {
    if (!items || !items.length) return t('No info');
    return items.map((item: string | IUser) => {
      const text = typeof item === 'string' ? item : item.name;
      return (
        <Link to={`/genres/${text}`} key={text} className={classes.Link}>
          {t(text)}
        </Link>
      );
    });
  };

  if (!movie) return null;
  return (
    <Grid container direction="column" className={classes.root}>
      <Typography variant="h2" className={classes.Header}>
        {movie.name}
      </Typography>
      <Divider className={classes.Divider} />
      <Grid container wrap="nowrap">
        <img
          className={classes.Poster}
          src={movie.img}
          alt={`${movie.name} poster`}
        />
        <Grid item container direction="column">
          <Grid container className={classes.MainInfoText}>
            {t`Year`}: {movie.info.year}
          </Grid>
          <Grid container className={classes.MainInfoText}>
            {t`Genres`}: {mapItemsToLinks(movie.info.genres)}
          </Grid>
          <Grid container className={classes.MainInfoText}>
            {t`Length`}: {movie.info.length} {t`min`}
          </Grid>
          <Grid container className={classes.MainInfoText}>
            {t`Views`}: {movie.info.views}
          </Grid>
          <Grid container className={classes.MainInfoText}>
            {t`PG rating`}: {movie.info.pgRating}
          </Grid>
          <Grid container className={classes.MainInfoText}>
            {t`Directed`}: {mapItemsToLinks(movie.info.directed)}
          </Grid>
          <Grid container className={classes.MainInfoText}>
            {t`Actors`}: {mapItemsToLinks(movie.info.cast)}
          </Grid>
        </Grid>
      </Grid>
      {movie.src && (
        <Grid container className={classes.Video}>
          <VideoPlayer src={movie.src} />
        </Grid>
      )}
      <Grid container direction="column" className={classes.AdditionalInfo}>
        <CategoryHeader text={t`About movie`} />
        <Typography variant="body1" className={classes.Description}>
          {movie.info.description || t`No info`}
        </Typography>
        <Divider className={classes.Divider} />
        {movie.info.photos && (
          <HorizontalGrid
            sources={movie.info.photos}
            name={movie.name}
            type={'photo'}
          />
        )}
        {movie.info.videos && (
          <HorizontalGrid
            sources={movie.info.videos}
            name={movie.name}
            type={'video'}
          />
        )}
        {/* <Divider className={classes.Divider} /> */}
        <Comments commentIds={movie.info.commentIds} movieId={movie.id} />
      </Grid>
    </Grid>
  );
};

export default MovieFullInfo;
