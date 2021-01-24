import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { main } from '../../axios';
import { IMovie } from '../../models/MovieInfo';
import { RootState } from '../rootReducer';
import { AppDispatch } from '../store';

export interface SortingItem {
  sortBy: string | null;
}

export interface MovieItems {
  movies: IMovie[];
}

export interface UIState {
  sortBy: string | null;
  movies: IMovie[];
  popular: IMovie[];
}

const initialState = {
  sortBy: null,
  movies: [],
  popular: [],
} as UIState;

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setSortingBy(state, { payload }: PayloadAction<SortingItem>) {
      state.sortBy = payload.sortBy;
    },
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

const loadMoviesAsync = async (
  max: number = 20,
  start: number = 0
): Promise<IMovie[] | null> => {
  try {
    const res = await main('movies', {
      params: {
        _limit: max,
        _start: start,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const loadMovies = (
  max: number = 20,
  start: number = 0,
  callback?: (arg0: boolean) => void
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const movies = await loadMoviesAsync(max, start);
  if (movies) dispatch(addMovies({ movies }));
  if (callback) callback(movies ? movies.length === 0 : true);
};

export const { setSortingBy, addMovies } = UISlice.actions;

export default UISlice.reducer;
