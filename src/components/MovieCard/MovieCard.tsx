import React from 'react';
import { Card, Grid, makeStyles, Typography } from '@material-ui/core';
import cn from 'classnames';
import Info from './Info/Info';
import { IMovie } from '../../models/MovieInfo';

export interface MovieCardProps extends IMovie {
  display?: 'full' | 'name' | 'image';
  className?: string;
  onClick?: (el: HTMLDivElement | null) => void;
}

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    cursor: 'pointer',
  },
  rootHorizontal: {
    maxWidth: 300,
  },
  Media: {
    height: 300,
    width: 200,
  },
  MediaHoriozontal: {
    height: 200,
    width: 300,
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
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const onClickHandler = () => onClick && onClick(wrapperRef.current);
  return (
    <Grid
      container
      ref={wrapperRef}
      direction="column"
      onClick={onClickHandler}
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
          {display === 'full' && <Info info={info} />}
        </Grid>
      )}
    </Grid>
  );
};

export default MovieCard;
