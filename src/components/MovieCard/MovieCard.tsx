import React from 'react';
import { Card, Grid, makeStyles, Typography } from '@material-ui/core';
import cn from 'classnames';
import { ITranslatedMovie } from '../../models/MovieInfo';
import MovieCardMedium from '../MovieCardMedium/MovieCardMedium';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

export interface MovieCardProps {
  display?: 'image' | 'lines' | 'grid';
  className?: string;
  card: ITranslatedMovie;
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
  const { i18n } = useTranslation();

  const handleCardClick = (): void => {
    history.push(`/movies/${card.en.id}`);
  };

  const getCard = () => {
    if (display === 'lines') return <MovieCardMedium card={card} />;
    const bg = card.en.img || card.ru.img;
    return (
      <>
        <Card onClick={handleCardClick} style={{ height: 'fit-content' }}>
          <div
            className={classes.Media}
            style={{
              background: `url(${bg})`,
              backgroundSize: 'cover',
            }}
          ></div>
        </Card>
        {display !== 'image' && (
          <Grid container direction="column" alignItems="center">
            {display === 'grid' && (
              <Typography className={classes.Name}>
                {card[i18n.language as 'en' | 'ru'].title}
              </Typography>
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
