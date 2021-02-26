import React, { useEffect, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Comment from './Comment/Comment';
import CategoryHeader from '../CategoryHeader/CategoryHeader';
import SendComment from './SendComment/SendComment';
import { useDispatch, useSelector } from 'react-redux';
import { loadComments } from '../../store/features/MoviesSlice';
import { debouncedDetectBottomLine } from '../../utils';
import { RootState } from '../../store/rootReducer';
import { useTranslation } from 'react-i18next';

const LIMIT = 5;
export interface CommentsProps {
  movieId: string;
  maxComments?: number;
}

const Comments: React.FC<CommentsProps> = ({ movieId, maxComments }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const movie = useSelector((state: RootState) =>
    state.movies.movies.find((movie) => movie.id === movieId)
  );
  const offsetRef = useRef(0);

  // load first batch of comments initially
  // if there's something left to load
  useEffect(() => {
    if (!maxComments) return;
    if (
      !movie?.info.comments ||
      (movie?.info.comments && movie.info.comments.length < maxComments)
    ) {
      dispatch(
        loadComments({ id: movieId }, (length) => (offsetRef.current += length))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load more comments on scroll
  useEffect(() => {
    if (!maxComments) return;

    const endOfMoviesCallback = () => {
      if (
        offsetRef.current < maxComments &&
        movie?.info.comments?.length &&
        movie.info.comments.length < maxComments
      ) {
        const commmentsToLoad = {
          id: movieId,
          limit: LIMIT,
          offset: offsetRef.current,
        };
        dispatch(
          loadComments(
            commmentsToLoad,
            (length) => (offsetRef.current += length)
          )
        );
      }
    };
    const trackScrolling = debouncedDetectBottomLine(
      gridRef.current,
      endOfMoviesCallback
    );
    window.addEventListener('scroll', trackScrolling);
    return () => window.removeEventListener('scroll', trackScrolling);
  }, [maxComments, dispatch, movie?.info.comments?.length, movieId]);

  const content = movie?.info.comments?.length ? (
    movie.info.comments.map((comment) => (
      <Comment {...comment} key={comment.id} />
    ))
  ) : (
    <Typography variant="body1" style={{ fontSize: '1.3rem' }}>
      {t`No comments`}
    </Typography>
  );

  return (
    <Grid ref={gridRef} style={{ marginTop: 10 }} container direction="column">
      <CategoryHeader text={t`Comments`} />
      <SendComment />
      {content}
    </Grid>
  );
};

export default Comments;
