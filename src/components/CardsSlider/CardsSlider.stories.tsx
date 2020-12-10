import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import CardsSlider, { CardsSliderProps } from "./CardsSlider";

export default {
  title: "CardsSlider",
  component: CardsSlider,
} as Meta;

const Template: Story<CardsSliderProps> = (args) => <CardsSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  cards: [
    {
      orientation: "vertical",
      name: "Capitan Marvel",
      year: 2000,
      genres: ["comedy", "action", "epic"],
      rating: 4.4,
      views: 123000,
      img:
        "https://upload.wikimedia.org/wikipedia/ru/0/07/Captain_Marvel_film_logo.jpg",
      length: 123,
      pgRating: "PG-13",
    },
    {
      orientation: "vertical",
      name: "Hobbit",
      year: 2004,
      genres: ["fantasy", "epic"],
      rating: 4.9,
      views: 9123000,
      img:
        "https://images-na.ssl-images-amazon.com/images/I/7145Wo9GjlL._AC_SL1006_.jpg",
      length: 123,
      pgRating: "PG-6",
    },
    {
      orientation: "vertical",
      name: "Star Trek",
      year: 1994,
      genres: ["action", "sci-fi"],
      rating: 4.4,
      views: 987654,
      img: "https://m.media-amazon.com/images/I/615RWFNlXDL._AC_SY741_.jpg",
      length: 123,
      pgRating: "PG-13",
    },
  ],
};
