import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { movies } from '../../axios';
import { IComment, IMovie } from '../../models/MovieInfo';
import { AppDispatch } from '../store';
import { CountriesKeys, GenresKeys } from './FilterSlice';

export interface MoviesItems {
  movies: IMovie[];
}
export interface CommentsItems {
  comments: IComment[];
  id?: string;
}

export interface MoviesState {
  movies: IMovie[];
  popular: IMovie[];
}

export interface IMoviesResponse {
  data: IMovie[] | null;
  status: boolean;
}

export interface IFilter {
  limit?: number;
  offset?: number;
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
      if (!payload.movies.filter) return;
      const newMovies = payload.movies.filter(
        (movie) => !state.movies.find((el) => el.id === movie.id)
      );
      state.movies = state.movies.concat(newMovies);
    },
    setMovies(state, { payload }: PayloadAction<MoviesItems>) {
      if (!payload.movies)
        throw new Error('[movies:setMovies] no movies in payload');
      if (!payload.movies.length) return;
      state.movies = payload.movies;
    },
    updateComments(state, { payload }: PayloadAction<CommentsItems>) {
      if (!payload.id)
        throw new Error('[movies:updateComments] no id in payload');
      if (!payload.comments)
        throw new Error('[movies:updateComments] no comments in payload');
      const movie = state.movies.find((movie) => movie.id === payload.id);
      if (!movie) throw new Error('[movies:updateComments] no movie found');
      movie.info.comments = movie.info.comments
        ? [...movie.info.comments, ...payload.comments]
        : [...payload.comments];
    },
  },
});

const loadMoviesAsync = async (
  params?: IFilter
): Promise<IMoviesResponse | null> => {
  try {
    // console.log(params);

    const res = await movies('movies', {
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
    limit: 20,
    offset: 0,
  },
  callback,
}: {
  filter?: IFilter;
  callback?: (arg0: boolean) => void;
}) => async (dispatch: AppDispatch) => {
  const movies = await loadMoviesAsync(filter);
  console.log(movies);

  if (movies?.status && movies.data)
    dispatch(addMovies({ movies: movies.data }));
  if (callback)
    callback(movies && movies.data ? movies.data.length === 0 : true);
};

export const loadMovie = (id: number) => async (dispatch: AppDispatch) => {
  const movies = await loadMoviesAsync({ id });
  if (movies?.status && movies.data)
    dispatch(addMovies({ movies: movies.data }));
};

/**
 * loads comments
 * @param params object with values:
 *    @param id movieId to find it in redux
 *    @param limit number of comments to fetch, default 5
 *    @param offset comments offset, default 0
 * @param callback fires when end of comments is reached
 */
export const loadComments = (
  {
    id,
    limit = 5,
    offset = 0,
  }: { id: string; limit?: number; offset?: number },
  callback?: (length: number) => void
) => async (dispatch: AppDispatch) => {
  const res = await movies('comments', {
    params: {
      id,
      limit,
      offset,
    },
  });
  // console.log(res.data);
  if (res.data) {
    const comments = res.data as IComment[];
    comments.length && dispatch(updateComments({ comments, id }));
    if (callback) callback(comments.length);
  }
};

export const { addMovies, setMovies, updateComments } = MoviesSlice.actions;

export default MoviesSlice.reducer;
