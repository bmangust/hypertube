import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { debounce } from 'lodash';

import { useAppDispatch } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import { IMovie } from '../../models/MovieInfo';
import { loadMovies } from '../../store/features/UISlice';
import MovieCard from '../MovieCard/MovieCard';

const sortByName = (movies: IMovie[]) => {
  return [...movies].sort((cardA, cardB) =>
    cardA.name.localeCompare(cardB.name)
  );
};
const sortByYear = (movies: IMovie[]) => {
  return [...movies].sort((cardA, cardB) => cardB.info.year - cardA.info.year);
};
const sortByRating = (movies: IMovie[]) => {
  return [...movies].sort(
    (cardA, cardB) => cardB.info.rating - cardA.info.rating
  );
};
const sortByAvalibility = (movies: IMovie[]) => {
  return [...movies].sort(
    (cardA, cardB) => cardB.info.avalibility - cardA.info.avalibility
  );
};

const Cards = () => {
  const { sortBy, view, movies } = useSelector((state: RootState) => state.UI);
  const [sortedCards, setSortedCards] = useState(movies);
  const dispatch = useAppDispatch();
  const isEndOfMoviesRef = useRef(false);

  /**
   * find scroll position at the end of scroll action
   * load new movies if any
   * isEndOfMoviesRef.current is updated in a callback after fetched result
   */
  const debouncedTrackScrolling = debounce(() => {
    const isEndOfMovies = isEndOfMoviesRef?.current || false;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      if (!isEndOfMovies) {
        dispatch(
          loadMovies(
            5,
            movies.length,
            (result: boolean) => (isEndOfMoviesRef.current = result)
          )
        );
      }
    }
  }, 500);

  // load movies on component mount
  useEffect(() => {
    dispatch(loadMovies(5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // track scroll position and load movies if at the bottom
  useEffect(() => {
    window.addEventListener('scroll', debouncedTrackScrolling);
    return () => window.removeEventListener('scroll', debouncedTrackScrolling);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies.length, dispatch]);

  // sort movies on <sortBy> change
  useEffect(() => {
    if (sortBy === 'name') setSortedCards(sortByName(movies));
    else if (sortBy === 'year') setSortedCards(sortByYear(movies));
    else if (sortBy === 'rating') setSortedCards(sortByRating(movies));
    else if (sortBy === 'avalibility')
      setSortedCards(sortByAvalibility(movies));
    else setSortedCards(movies);
  }, [sortBy, movies]);

  return (
    <Grid container justify="space-evenly">
      {sortedCards.map((card) => (
        <MovieCard key={card.id} card={card} display={view} />
      ))}
    </Grid>
  );
};

export default Cards;
