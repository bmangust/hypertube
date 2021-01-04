import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { MovieCardProps } from '../MovieCard/MovieCard';

interface CardsProps {
  cards: MovieCardProps[];
}

const useStyles = makeStyles({
  Paper: {
    display: 'flex',
    marginBottom: 20,
    padding: 10,
  },
  Img: {
    height: '15rem',
    width: '10rem',
    objectFit: 'cover',
    marginRight: 20,
    borderRadius: 5,
  },
  Info: {
    height: '15rem',
    flexWrap: 'nowrap',
  },
  Caption: {
    fontSize: '1.5rem',
  },
  Text: {
    fontSize: '1rem',
  },
  Description: {
    maxHeight: '8rem',
    paddingTop: 10,
    fontSize: '0.9rem',
    position: 'relative',
    flexGrow: 2,
    overflow: 'hidden',
  },
  Shadow: {
    height: 40,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    background: 'linear-gradient(0deg, #ffffff, #ffffff33)',
  },
});

const Cards = ({ cards }: CardsProps) => {
  const classes = useStyles();
  return (
    <Grid>
      {cards.map((card, idx) => (
        <Paper key={card.name + idx} className={classes.Paper}>
          <img
            src={card.img}
            className={classes.Img}
            alt={`${card.name} cover`}
          />
          <Grid container direction="column" className={classes.Info}>
            <Typography variant="caption" className={classes.Caption}>
              {card.name}
            </Typography>
            <Divider />
            <Typography variant="caption" className={classes.Text}>
              Year: {card.info.year}
            </Typography>
            <Typography variant="caption" className={classes.Text}>
              Genres: {card.info.genres.join(', ')}
            </Typography>
            <Typography variant="caption" className={classes.Text}>
              Length: {card.info.length} min
            </Typography>
            <Divider />
            <Typography variant="caption" className={classes.Description}>
              {card.info.description}
              <div className={classes.Shadow} />
            </Typography>
          </Grid>
        </Paper>
      ))}
    </Grid>
  );
};

export default Cards;
