import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Header from "./components/Header/Header";
import CardsSlider from "./components/CardsSlider/CardsSlider";
import { cards } from "./mocks";
import AlphabetNav from "./components/AlphabetNav/AlphabetNav";

const useStyles = makeStyles({
  Slider: {
    height: 400,
    minHeight: 300,
  },
});

function App() {
  const classes = useStyles();
  return (
    <Container>
      <Header />
      <Grid className={classes.Slider}>Slider</Grid>
      <AlphabetNav />
      <CardsSlider cards={cards} />
    </Container>
  );
}

export default App;
