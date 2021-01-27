import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Comment from './Comment/Comment';
import { IComment } from '../../models/MovieInfo';
import CategoryHeader from '../CategoryHeader/CategoryHeader';

export interface CommentsProps {
  comments?: IComment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const content =
    comments && comments.length ? (
      comments.map((comment) => <Comment {...comment} key={comment.id} />)
    ) : (
      <Typography variant="body1" style={{ fontSize: '1.3rem' }}>
        No comments
      </Typography>
    );

  return (
    <Grid container direction="column">
      <CategoryHeader text="Comments" />
      {content}
    </Grid>
  );
};

export default Comments;
