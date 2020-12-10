import React, { useRef, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import MovieCard, { MovieCardProps } from "../MovieCard/MovieCard";
import _ from "lodash";
import cn from "classnames";

export interface CardsSliderProps {
  cards: MovieCardProps[];
}

const useStyles = makeStyles({
  root: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    overflowX: "scroll",
    overflowY: "hidden",
    transition: "0.3s",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& $Movie:last-child": {
      paddingRight: "100vw",
      // marginRight: "900px",
    },
  },
  Movie: {
    transform: "scale(0.8)",
    transition: "0.3s",
  },
  Active: {
    transform: "scale(1)",
  },
});

const CardsSlider: React.FC<CardsSliderProps> = ({
  cards,
}: CardsSliderProps) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);

  const detectCurrentElement = () => {
    if (!ref || !ref.current) return;
    const leftBorder = ref.current.getBoundingClientRect().left;
    const cards = Array.from(ref.current.children);
    const activeIndex = cards.findIndex((card) => {
      const cardBoundingRect = card.getBoundingClientRect();
      return cardBoundingRect.left + cardBoundingRect.width / 2 >= leftBorder;
    });
    const activeElement = cards[activeIndex];
    activeElement.scrollIntoView();
    setActive(activeIndex);
  };

  const debouncedDetectCurrentElement = _.debounce(detectCurrentElement, 60);

  const onScrollHandler = () => {
    debouncedDetectCurrentElement();
  };

  // this method should scroll to the element on click
  const handleCardClick = (el: HTMLDivElement | null) => {
    el && el.scrollIntoView();
  };

  return (
    <Grid
      ref={ref}
      onScroll={onScrollHandler}
      container
      alignItems="center"
      className={classes.root}
    >
      {cards.map((card, index) => (
        <MovieCard
          onClick={handleCardClick}
          className={
            index === active ? cn(classes.Movie, classes.Active) : classes.Movie
          }
          {...card}
          key={card.id || card.name + index}
        />
      ))}
      {/* <div style={{ width: "100vw", height: "100%" }}>aweas</div> */}
    </Grid>
  );
};

export default CardsSlider;
