import { Container } from '@material-ui/core';
import React from 'react';
import AlphabetNav from '../../components/AlphabetNav/AlphabetNav';
import Cards from '../../components/Cards/Cards';
import CardsSlider from '../../components/CardsSlider/CardsSlider';
import { cards } from '../../mocks';

const MainPage = () => {
  return (
    <Container>
      <AlphabetNav />
      <CardsSlider cards={cards} />
      <Cards cards={cards} />
    </Container>
  );
};

export default MainPage;