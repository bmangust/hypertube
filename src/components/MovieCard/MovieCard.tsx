import React from 'react';
import { Card, Grid, makeStyles, Typography } from '@material-ui/core';
import cn from 'classnames';
import { IMovie } from '../../models/MovieInfo';

export interface MovieCardProps extends IMovie {
  display?: 'name' | 'image';
  className?: string;
  onClick?: () => void;
}

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    cursor: 'pointer',
  },
  Media: {
    height: 220,
    width: 150,
  },
  Name: {
    fontSize: '1rem',
    fontWeight: 800,
  },
}));

const MovieCard: React.FC<MovieCardProps> = ({
  display = 'image',
  className,
  onClick,
  name,
  img,
  info,
}: MovieCardProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      onClick={onClick}
      className={cn(classes.root, className)}
    >
      <Card>
        <div
          className={classes.Media}
          style={{
            background: `url(${img})`,
            backgroundSize: 'cover',
          }}
        ></div>
      </Card>
      {display !== 'image' && (
        <Grid container direction="column" alignItems="center">
          {display === 'name' && (
            <Typography className={classes.Name}>{name}</Typography>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default MovieCard;
