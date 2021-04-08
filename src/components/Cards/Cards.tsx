import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import { ITranslatedMovie } from '../../models/MovieInfo';
import { loadMovies, setEndOfMovies } from '../../store/features/MoviesSlice';
import MovieCard from '../MovieCard/MovieCard';
import { throttledDetectBottomLine } from '../../utils';
import CardLoader from '../MovieCard/CardLoader/CardLoader';
import { LIMIT } from '../..';

interface ICardsProps {
  movies: ITranslatedMovie[];
}

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
    (cardA, cardB) =>
      cardB.en.info.rating - cardA.en.info.rating ||
      cardB.en.info.imdbRating - cardA.en.info.imdbRating
  );
};
const sortByAvalibility = (movies: ITranslatedMovie[]) => {
  return [...movies].sort(
    (cardA, cardB) => cardB.en.info.avalibility - cardA.en.info.avalibility
  );
};

const Cards = ({ movies }: ICardsProps) => {
  const { sortBy, view } = useSelector((state: RootState) => state.UI);
  const { loading, isEndOfMovies } = useSelector(
    (state: RootState) => state.movies
  );
  const [sortedCards, setSortedCards] = useState<ITranslatedMovie[]>(movies);
  const dispatch = useAppDispatch();
  const gridRef = useRef<HTMLDivElement>(null);
  const location = window.location.href;

  // selected letter if we're at /byname page
  const letter = location.search(/byname/)
    ? location.split('/').pop()
    : undefined;

  // current search string, if we're at /search page
  const search = location.match(/search/)
    ? location.split('/').pop()
    : undefined;

  // track scroll position and load movies if at the bottom
  useEffect(() => {
    const endOfMoviesCallback = () => {
      if (!isEndOfMovies && !loading) {
        console.log('endOfMoviesCallback');
        dispatch(
          loadMovies({
            filter: {
              search,
              letter,
              limit: LIMIT,
              offset: movies.length,
            },
          })
        ).then((res) => {
          console.log('[Cards] loadMovies response', res);
          if (res && res.length < LIMIT) dispatch(setEndOfMovies());
        });
      }
    };
    console.log('useEffect track scroll');
    const trackScrolling = throttledDetectBottomLine(
      gridRef.current,
      endOfMoviesCallback
    );
    window.addEventListener('scroll', trackScrolling);
    return () => window.removeEventListener('scroll', trackScrolling);
  }, [movies.length, dispatch, letter, search, isEndOfMovies, loading]);

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
        <MovieCard key={card.en.id} id={card.en.id} display={view} />
      ))}
      {loading && <CardLoader display={view} />}
    </Grid>
  );
};

export default Cards;
