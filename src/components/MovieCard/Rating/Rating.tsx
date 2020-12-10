import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { StarOutlineRounded } from "@material-ui/icons";
import { useStyles as styles } from "../MovieCard";

interface StarsProps {
  rating: number;
  className?: string;
}

interface RatingProps extends StarsProps {
  useStyles: typeof styles;
}

const Stars: React.FC<StarsProps> = ({ rating, className }: StarsProps) => {
  return (
    <Grid className={className}>
      {new Array(Math.floor(rating)).fill("").map((el, index) => (
        <StarOutlineRounded key={index} color="secondary" />
      ))}
    </Grid>
  );
};

const Rating: React.FC<RatingProps> = ({ rating, useStyles }: RatingProps) => {
  const css = useStyles();
  return (
    <Grid container alignItems="center">
      <Stars rating={rating} className={css.Icon} />
      <Typography className={css.SecondaryText}>{rating}</Typography>
    </Grid>
  );
};

export default Rating;
