import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { main } from '../../axios';
import { IMovie } from '../../models/MovieInfo';
import { AppDispatch } from '../store';
import { CountriesKeys, GenresKeys } from './FilterSlice';

export interface SortingItem {
  sortBy: string | null;
}

export interface MovieItems {
  movies: IMovie[];
}

export interface MoviesState {
  movies: IMovie[];
  popular: IMovie[];
}

export interface IFilter {
  _limit?: number;
  _start?: number;
  genres?: GenresKeys[];
  years?: [] | number[][];
  countries?: CountriesKeys[];
  id?: string | number;
}

const initialState = {
  movies: [],
  popular: [],
} as MoviesState;

const MoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies(state, { payload }: PayloadAction<MovieItems>) {
      if (!payload.movies)
        throw new Error('[UI:addMovies] no movies in payload');
      const newMovies = payload.movies.filter(
        (movie) => !state.movies.find((el) => el.id === movie.id)
      );
      state.movies = state.movies.concat(newMovies);
    },
  },
});

const loadMoviesAsync = async (params?: IFilter): Promise<IMovie[] | null> => {
  try {
    console.log(params);

    const res = await main('movies', {
      params,
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const loadMovies = ({
  filter = {
    _limit: 20,
    _start: 0,
  },
  callback,
}: {
  filter?: IFilter;
  callback?: (arg0: boolean) => void;
}) => async (dispatch: AppDispatch) => {
  const movies = await loadMoviesAsync(filter);
  if (movies) dispatch(addMovies({ movies }));
  if (callback) callback(movies ? movies.length === 0 : true);
};

export const loadMovie = (id: number) => async (dispatch: AppDispatch) => {
  const movies = await loadMoviesAsync({ id });
  if (movies) dispatch(addMovies({ movies }));
};

export const { addMovies } = MoviesSlice.actions;

export default MoviesSlice.reducer;
