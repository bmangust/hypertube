import { Grid } from '@material-ui/core';
import React from 'react';
import { MovieCardProps } from '../MovieCard/MovieCard';
import MovieCardMedium from '../MovieCardMedium/MovieCardMedium';

interface CardsProps {
  cards: MovieCardProps[];
}

const Cards = ({ cards }: CardsProps) => {
  return (
    <Grid>
      {cards.map((card) => (
        <MovieCardMedium key={card.id} card={card} />
      ))}
    </Grid>
  );
};

export default Cards;
