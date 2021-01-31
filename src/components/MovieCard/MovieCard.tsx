import React from 'react';
import { Card, Grid, makeStyles, Typography } from '@material-ui/core';
import cn from 'classnames';
import { IMovie } from '../../models/MovieInfo';
import MovieCardMedium from '../MovieCardMedium/MovieCardMedium';
import { useHistory } from 'react-router';

export interface MovieCardProps {
  display?: 'image' | 'lines' | 'grid';
  className?: string;
  card: IMovie;
}

export const useStyles = makeStyles({
  root: {
    // cursor: 'pointer',
  },
  Grid: {
    maxWidth: 150,
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  Media: {
    height: 220,
    width: 150,
  },
  Name: {
    fontSize: '1rem',
    fontWeight: 800,
  },
});

const MovieCard: React.FC<MovieCardProps> = ({
  display = 'image',
  className,
  card,
}: MovieCardProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleCardClick = (): void => {
    history.push(`/movies/${card.id}`);
  };

  const getCard = () => {
    if (display === 'lines') return <MovieCardMedium card={card} />;
    return (
      <>
        <Card onClick={handleCardClick}>
          <div
            className={classes.Media}
            style={{
              background: `url(${card.img})`,
              backgroundSize: 'cover',
            }}
          ></div>
        </Card>
        {display !== 'image' && (
          <Grid container direction="column" alignItems="center">
            {display === 'grid' && (
              <Typography className={classes.Name}>{card.name}</Typography>
            )}
          </Grid>
        )}
      </>
    );
  };

  const getClassName = () =>
    display === 'lines'
      ? cn(classes.root, className)
      : cn(classes.root, className, classes.Grid);

  return (
    <Grid
      item
      container
      wrap="wrap"
      direction={display === 'lines' ? 'column' : 'row'}
      className={getClassName()}
    >
      {getCard()}
    </Grid>
  );
};

export default MovieCard;
