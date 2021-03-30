import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { movies } from '../../axios';
import { IComment, ITranslatedMovie } from '../../models/MovieInfo';
import { AppDispatch } from '../store';
import { CountriesKeys, GenresKeys } from './FilterSlice';

export interface MoviesItems {
  movies: ITranslatedMovie[];
}
export interface CommentsItems {
  comments: IComment[];
  id?: string;
}
export interface ErrorItem {
  error: string;
}

export interface MoviesState {
  loading: boolean;
  error: string | null;
  movies: ITranslatedMovie[];
  popular: ITranslatedMovie[];
}

export interface IMoviesResponse {
  data: ITranslatedMovie[] | null;
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
  loading: false,
  error: null,
  movies: [],
  popular: [],
} as MoviesState;

const MoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies(state, { payload }: PayloadAction<MoviesItems>) {
      state.loading = false;
      if (!payload.movies)
        throw new Error('[movies:addMovies] no movies in payload');
      if (!payload.movies.filter) return;
      const newMovies = payload.movies.filter(
        (movie) => !state.movies.find((el) => el.en.id === movie.en.id)
      );
      state.movies = state.movies.concat(newMovies);
    },
    setMovies(state, { payload }: PayloadAction<MoviesItems>) {
      state.loading = false;
      if (!payload.movies)
        throw new Error('[movies:setMovies] no movies in payload');
      if (!payload.movies.length) return;
      state.movies = payload.movies;
    },
    updateComments(state, { payload }: PayloadAction<CommentsItems>) {
      state.loading = false;
      if (!payload.id)
        throw new Error('[movies:updateComments] no id in payload');
      if (!payload.comments)
        throw new Error('[movies:updateComments] no comments in payload');
      const movie = state.movies.find((movie) => movie.en.id === payload.id);
      if (!movie) throw new Error('[movies:updateComments] no movie found');
      const newComments = payload.comments.filter((comment) =>
        movie.en.info.comments
          ? !movie.en.info.comments.find(
              (el) => el.commentid === comment.commentid
            )
          : !!comment
      );
      movie.en.info.comments = movie.en.info.comments
        ? [...movie.en.info.comments, ...newComments]
        : [...newComments];
    },
    setError(state, { payload }: PayloadAction<ErrorItem>) {
      state.error = payload.error;
      state.loading = false;
    },
    resetError(state) {
      state.error = null;
      state.loading = false;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
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
  dispatch(startLoading());
  const limit = filter.limit || 20;
  const movies = await loadMoviesAsync(filter);
  console.log('loadMovies', movies);

  if (movies?.status && movies.data) {
    const removedNulls = movies.data?.map((el) =>
      !el.ru ? { en: el.en, ru: el.en } : el
    );
    dispatch(addMovies({ movies: removedNulls }));
  }
  if (callback)
    callback(movies && movies.data ? movies.data.length < limit : true);
};

export const loadMovie = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const movie = await loadMoviesAsync({ id });
  console.log('loadMovie', movie);
  if (movie?.status && movie.data) dispatch(addMovies({ movies: movie.data }));
  else dispatch(setError({ error: 'Cannot load movie' }));
};

/**
 * loads comments
 * @param params object with values:
 *    @param movieId movieId to find it in redux
 *    @param limit number of comments to fetch, default 5
 *    @param offset comments offset, default 0
 * @param callback fires when end of comments is reached
 */
export const loadComments = (
  {
    movieId,
    limit = 5,
    offset = 0,
  }: { movieId: string; limit?: number; offset?: number },
  callback?: (length: number) => void
) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const res = await movies('comments', {
    params: {
      movieId,
      limit,
      offset,
    },
  });
  console.log('loadComments', res.data);
  if (res.data.status) {
    const comments = res.data.data as IComment[];
    comments.length && dispatch(updateComments({ comments, id: movieId }));
    if (callback) callback(comments.length);
  }
};

export const {
  addMovies,
  setMovies,
  updateComments,
  setError,
  resetError,
  startLoading,
  stopLoading,
} = MoviesSlice.actions;

export default MoviesSlice.reducer;
