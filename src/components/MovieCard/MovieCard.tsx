import * as React from "react";
import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import cn from "classnames";
import Rating from "./Rating/Rating";
import Views from "./Views/Views";

export interface MovieCardProps {
  orientation?: "vertical" | "horizontal";
  name: string;
  year: number;
  genres: string[];
  rating: number;
  views: number;
  img: string;
  length: number;
  pgRating: string | number;
  className?: string;
}

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
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
  Info: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  InfoHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  SecondaryInfo: {
    alignItems: "center",
  },
  Name: {
    fontSize: "1rem",
    fontWeight: 800,
  },
  SecondaryText: {
    fontSize: "0.8rem",
    fontWeight: 400,
    color: "#777",
    fontFamily: '"Roboto", "Helvetica", "Helvetica Neue", "Arial", sans-serif;',
  },
  Genre: {
    marginLeft: "0.3rem",
    display: "flex",
    "& $SecondaryText": {
      textTransform: "capitalize",
    },
    "& $SecondaryText:nth-child(n+2)::before": {
      content: '"·"',
      margin: "0 0.1rem",
    },
  },
  Icon: {
    paddingRight: "0.3rem",
  },
}));

const MovieCard: React.FC<MovieCardProps> = ({
  orientation = "vertical",
  name,
  year,
  genres,
  rating,
  views,
  img,
  length,
  pgRating,
  className,
}: MovieCardProps) => {
  const classes = useStyles();
  const mediaClassname =
    orientation === "vertical"
      ? classes.Media
      : cn(classes.Media, classes.MediaHoriozontal);
  const rootClassname =
    orientation === "vertical"
      ? classes.root
      : cn(classes.root, classes.rootHorizontal);
  const infoClassname =
    orientation === "vertical" ? classes.Info : classes.InfoHorizontal;
  return (
    <Grid container direction="column" className={cn(rootClassname, className)}>
      <Card>
        <div
          className={mediaClassname}
          style={{
            background: `url(${img})`,
            backgroundSize: orientation === "vertical" ? "cover" : "auto",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "bottom",
          }}
        ></div>
      </Card>
      <Grid container direction="column" alignItems="center">
        <Typography className={classes.Name}>{name}</Typography>
        <Grid container className={infoClassname}>
          <Grid item>
            <Grid container className={classes.SecondaryInfo}>
              <Typography className={classes.SecondaryText}>{year}</Typography>
              <Grid className={classes.Genre}>
                {genres.map((genre) => (
                  <span key={genre} className={classes.SecondaryText}>
                    {genre}
                  </span>
                ))}
              </Grid>
            </Grid>
            <>
              <Rating rating={rating} useStyles={useStyles} />
              <Views views={views} useStyles={useStyles} />
            </>
          </Grid>
          {orientation === "horizontal" && (
            <Grid item className={infoClassname}>
              <Typography className={classes.SecondaryText}>
                {length}min
              </Typography>
              <Typography className={classes.SecondaryText}>
                {pgRating}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieCard;
