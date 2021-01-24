import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { main } from '../../axios';
import { IMovie } from '../../models/MovieInfo';
import { AppDispatch } from '../store';

export interface SortingItem {
  sortBy: string | null;
}

export interface MovieItem {
  movies: IMovie[];
}

export interface UIState {
  sortBy: string | null;
  movies: IMovie[];
}

const initialState = {
  sortBy: null,
  movies: [],
} as UIState;

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setSortingBy(state, { payload }: PayloadAction<SortingItem>) {
      state.sortBy = payload.sortBy;
    },
    addMovies(state, { payload }: PayloadAction<MovieItem>) {
      if (!payload.movies)
        throw new Error('[UI:addMovies] no movies in payload');
      const newMovies = payload.movies.filter(
        (movie) => !state.movies.find((el) => el.id === movie.id)
      );
      console.log(newMovies);
      state.movies = state.movies.concat(newMovies);
    },
  },
});

export const loadMovies = (max: number = 20, start: number = 0) => async (
  dispatch: AppDispatch
) => {
  const res = await main('movies', {
    params: {
      _limit: max,
      _start: start,
    },
  });
  console.log(res);
  dispatch(addMovies({ movies: res.data }));
};

export const { setSortingBy, addMovies } = UISlice.actions;

export default UISlice.reducer;
