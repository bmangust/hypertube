import { Container } from '@material-ui/core';
import React from 'react';
import AlphabetNav from '../../components/AlphabetNav/AlphabetNav';
import Cards from '../../components/Cards/Cards';
import CardsSlider from '../../components/CardsSlider/CardsSlider';
import FilterSortPanel from '../../components/FilterSortPanel/FilterSortPanel';
import { cards } from '../../mock/mocks';

const MainPage = () => {
  return (
    <Container>
      <AlphabetNav />
      <FilterSortPanel />
      <CardsSlider cards={cards} />
      <Cards />
    </Container>
  );
};

export default MainPage;
