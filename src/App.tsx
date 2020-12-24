import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Header from "./components/Header/Header";
import CardsSlider from "./components/CardsSlider/CardsSlider";
import { cards, links } from "./mocks";
import AlphabetNav from "./components/AlphabetNav/AlphabetNav";
import Nav from "./components/Nav/Nav";
import { theme } from "./theme";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    minWidth: 500,
    margin: 0,
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  Wrapper: {
    maxWidth: 840,
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      margin: 0,
    },
  },
  Slider: {
    height: 400,
    minHeight: 300,
  },
  // `@media (min-width: ${theme.breakpoints.})`: {
  //   button: {
  //     width: 200
  //   }
  // }
});

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Container className={classes.Wrapper}>
        <Header />
        <Nav links={links} />
        <AlphabetNav />
        <CardsSlider cards={cards} />
      </Container>
    </Container>
  );
}

export default App;
