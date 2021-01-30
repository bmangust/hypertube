import React, { useEffect, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Comment from './Comment/Comment';
import CategoryHeader from '../CategoryHeader/CategoryHeader';
import SendComment from './SendComment/SendComment';
import { useDispatch, useSelector } from 'react-redux';
import { loadComments } from '../../store/features/MoviesSlice';
import { debouncedDetectBottomLine } from '../../utils';
import { RootState } from '../../store/rootReducer';

const LIMIT = 5;

export interface CommentsProps {
  commentIds?: string[];
  movieId: string;
}

const Comments: React.FC<CommentsProps> = ({ commentIds, movieId }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) =>
    state.movies.movies.find((movie) => movie.id === movieId)
  );
  const offsetRef = useRef(0);

  // load first batch of comments initially
  // if there's something left to load
  useEffect(() => {
    if (!commentIds) return;
    if (
      !movie?.info.comments ||
      (movie?.info.comments && movie.info.comments.length < commentIds.length)
    ) {
      const firstCommments = [...commentIds].slice(0, LIMIT);
      dispatch(
        loadComments(
          firstCommments,
          movieId,
          (length) => (offsetRef.current += length)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load more comments on scroll
  useEffect(() => {
    if (!commentIds) return;

    const endOfMoviesCallback = () => {
      if (
        offsetRef.current < commentIds.length &&
        movie?.info.comments?.length &&
        movie.info.comments.length < commentIds.length
      ) {
        const commmentsToLoad = [...commentIds].slice(
          offsetRef.current,
          offsetRef.current + LIMIT
        );
        dispatch(
          loadComments(
            commmentsToLoad,
            movieId,
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
  }, [commentIds, dispatch, movie?.info.comments?.length, movieId]);

  const content = movie?.info.comments?.length ? (
    movie.info.comments.map((comment) => (
      <Comment {...comment} key={comment.id} />
    ))
  ) : (
    <Typography variant="body1" style={{ fontSize: '1.3rem' }}>
      No comments
    </Typography>
  );

  return (
    <Grid ref={gridRef} container direction="column">
      <CategoryHeader text="Comments" />
      <SendComment />
      {content}
    </Grid>
  );
};

export default Comments;
