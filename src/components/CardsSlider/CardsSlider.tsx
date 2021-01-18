import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MovieCard, { MovieCardProps } from '../MovieCard/MovieCard';
import { useHistory } from 'react-router';

export interface CardsSliderProps {
  cards: MovieCardProps[];
  display?: 'name' | 'image';
}

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    flexWrap: 'nowrap',
    margin: '20px 0',
    padding: 10,
    background: '#fafafa',
    transform: 'translateZ(0)',
    overflowX: 'scroll',
    overflowY: 'hidden',
    transition: '0.3s',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  Movie: {
    transition: '0.3s',
    marginRight: 20,
  },
});

const CardsSlider: React.FC<CardsSliderProps> = ({
  cards,
  display = 'image',
}: CardsSliderProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleCardClick = (id: string): void => {
    history.push(`/movies/${id}`);
  };

  return (
    <Grid container alignItems="center" className={classes.root}>
      {cards.map((card, index) => (
        <MovieCard
          display={display}
          onClick={() => handleCardClick(card.id)}
          className={classes.Movie}
          {...card}
          key={card.id || card.name + index}
        />
      ))}
    </Grid>
  );
};

export default CardsSlider;
