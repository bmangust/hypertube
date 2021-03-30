import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MovieCard from '../MovieCard/MovieCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { useTranslation } from 'react-i18next';

export interface CardsSliderProps {
  display?: 'grid' | 'image';
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
  display = 'image',
}: CardsSliderProps) => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const { movies } = useSelector((state: RootState) => state.movies);

  return (
    <Grid container alignItems="center" className={classes.root}>
      {movies.map((card, index) => (
        <MovieCard
          display={display}
          className={classes.Movie}
          card={card}
          key={card.en.id || card[i18n.language as 'en' | 'ru'].title + index}
        />
      ))}
    </Grid>
  );
};

export default CardsSlider;
