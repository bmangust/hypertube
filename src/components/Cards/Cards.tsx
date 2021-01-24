import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { IMovie } from '../../models/MovieInfo';
import { RootState } from '../../store/rootReducer';
import MovieCardMedium from '../MovieCardMedium/MovieCardMedium';
import { loadMovies } from '../../store/features/UISlice';
import { useAppDispatch } from '../../store/store';

const sortByName = (movies: IMovie[]) => {
  return movies.sort((cardA, cardB) => cardA.name.localeCompare(cardB.name));
};
const sortByYear = (movies: IMovie[]) => {
  return movies.sort((cardA, cardB) => cardB.info.year - cardA.info.year);
};
const sortByRating = (movies: IMovie[]) => {
  return movies.sort((cardA, cardB) => cardB.info.rating - cardA.info.rating);
};
const sortByAvalibility = (movies: IMovie[]) => {
  return movies.sort(
    (cardA, cardB) => cardB.info.avalibility - cardA.info.avalibility
  );
};

const Cards = () => {
  const { sortBy, movies } = useSelector((state: RootState) => state.UI);
  const [sortedCards, setSortedCards] = useState(movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadMovies(5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sortBy === 'name') setSortedCards(() => sortByName(movies));
    else if (sortBy === 'year') setSortedCards(() => sortByYear(movies));
    else if (sortBy === 'rating') setSortedCards(() => sortByRating(movies));
    else if (sortBy === 'avalibility')
      setSortedCards(() => sortByAvalibility(movies));
    else setSortedCards(movies);
  }, [sortBy, movies]);

  return (
    <Grid>
      {sortedCards.map((card) => (
        <MovieCardMedium key={card.id} card={card} />
      ))}
    </Grid>
  );
};

export default Cards;
