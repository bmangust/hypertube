import { makeStyles } from '@material-ui/core';
import React from 'react';

interface Props {
  src: string;
}

const useStyles = makeStyles({
  Video: {
    width: '100%',
  },
});

const VideoPlayer = ({ src }: Props) => {
  const classes = useStyles();
  return <video controls src={src} className={classes.Video} />;
};

export default VideoPlayer;
