import { Grid, Typography } from "@material-ui/core";
import { VisibilityRounded } from "@material-ui/icons";
import React from "react";
import { useStyles } from "../MovieCard";

interface Props {
  views: number;
  useStyles: typeof useStyles;
}

const Views: React.FC<Props> = ({ views, useStyles }: Props) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <VisibilityRounded color="secondary" className={classes.Icon} />
      <Typography className={classes.SecondaryText}>{views}</Typography>
    </Grid>
  );
};

export default Views;
