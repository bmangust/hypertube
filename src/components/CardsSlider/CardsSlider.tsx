import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import MovieCard, { MovieCardProps } from "../MovieCard/MovieCard";

export interface CardsSliderProps {
  cards: MovieCardProps[];
}

const useStyles = makeStyles({
  root: {},
  Movie: {
    margin: "0 1rem",
  },
});

const CardsSlider: React.FC<CardsSliderProps> = ({
  cards,
}: CardsSliderProps) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      {cards.map((card) => (
        <MovieCard className={classes.Movie} {...card} key={card.name} />
      ))}
    </Grid>
  );
};

export default CardsSlider;
