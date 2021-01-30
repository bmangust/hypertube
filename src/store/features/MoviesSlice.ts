import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { main } from '../../axios';
import { IComment, IMovie } from '../../models/MovieInfo';
import { AppDispatch } from '../store';
import { CountriesKeys, GenresKeys } from './FilterSlice';

export interface MoviesItems {
  movies: IMovie[];
}
export interface CommentsItems {
  comments: IComment[];
  id: string;
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
    addMovies(state, { payload }: PayloadAction<MoviesItems>) {
      if (!payload.movies)
        throw new Error('[movies:addMovies] no movies in payload');
      const newMovies = payload.movies.filter(
        (movie) => !state.movies.find((el) => el.id === movie.id)
      );
      state.movies = state.movies.concat(newMovies);
    },
    updateComments(state, { payload }: PayloadAction<CommentsItems>) {
      if (!payload.id)
        throw new Error('[movies:updateComments] no id in payload');
      if (!payload.comments)
        throw new Error('[movies:updateComments] no comments in payload');
      const movie = state.movies.find((movie) => movie.id === payload.id);
      if (!movie) throw new Error('[movies:updateMovies] no movie found');
      movie.info.comments = movie.info.comments
        ? [...movie.info.comments, ...payload.comments]
        : [...payload.comments];
    },
  },
});

const loadMoviesAsync = async (params?: IFilter): Promise<IMovie[] | null> => {
  try {
    // console.log(params);

    const res = await main('movies', {
      params,
    });
    // console.log(res.data);
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

/**
 * loads comments
 * @param comments comments ids to load
 * @param id movieId to find it in redux
 * @param callback fires when end of comments is reached
 */
export const loadComments = (
  comments: string[],
  id: string,
  callback?: (length: number) => void
) => async (dispatch: AppDispatch) => {
  const res = await main('comments', {
    params: {
      id: comments,
    },
  });
  // console.log(res.data);
  if (res.data) {
    const comments = res.data as IComment[];
    comments.length && dispatch(updateComments({ comments, id }));
    if (callback) callback(comments.length);
  }
};

export const { addMovies, updateComments } = MoviesSlice.actions;

export default MoviesSlice.reducer;
