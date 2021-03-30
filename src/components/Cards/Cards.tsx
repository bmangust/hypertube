import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import { ITranslatedMovie } from '../../models/MovieInfo';
import { loadMovies } from '../../store/features/MoviesSlice';
import MovieCard from '../MovieCard/MovieCard';
import { throttledDetectBottomLine } from '../../utils';
import CardLoader from '../MovieCard/CardLoader/CardLoader';

const LIMIT = +(process.env.REACT_APP_LOAD_LIMIT || 5);

const sortByName = (movies: ITranslatedMovie[]) => {
  return [...movies].sort((cardA, cardB) =>
    cardA.en.title.localeCompare(cardB.en.title)
  );
};
const sortByYear = (movies: ITranslatedMovie[]) => {
  return [...movies].sort(
    (cardA, cardB) => cardB.en.info.year - cardA.en.info.year
  );
};
const sortByRating = (movies: ITranslatedMovie[]) => {
  return [...movies].sort(
    (cardA, cardB) => cardB.en.info.rating - cardA.en.info.rating
  );
};
const sortByAvalibility = (movies: ITranslatedMovie[]) => {
  return [...movies].sort(
    (cardA, cardB) => cardB.en.info.avalibility - cardA.en.info.avalibility
  );
};

const Cards = () => {
  const { sortBy, view } = useSelector((state: RootState) => state.UI);
  const { loading, movies } = useSelector((state: RootState) => state.movies);
  const [sortedCards, setSortedCards] = useState(movies);
  const dispatch = useAppDispatch();
  const isEndOfMoviesRef = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // load movies on component mount
  useEffect(() => {
    dispatch(loadMovies({ filter: { limit: LIMIT } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // track scroll position and load movies if at the bottom
  useEffect(() => {
    const endOfMoviesCallback = () => {
      if (!isEndOfMoviesRef.current) {
        dispatch(
          loadMovies({
            filter: {
              limit: LIMIT,
              offset: movies.length,
            },
            callback: (result: boolean) => (isEndOfMoviesRef.current = result),
          })
        );
      }
    };
    const trackScrolling = throttledDetectBottomLine(
      gridRef.current,
      endOfMoviesCallback
    );
    window.addEventListener('scroll', trackScrolling);
    return () => window.removeEventListener('scroll', trackScrolling);
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
    <Grid ref={gridRef} container justify="space-evenly">
      {sortedCards.map((card) => (
        <MovieCard key={card.en.id} card={card} display={view} />
      ))}
      {loading && <CardLoader />}
    </Grid>
  );
};

export default Cards;
