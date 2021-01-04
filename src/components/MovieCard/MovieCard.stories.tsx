import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import MovieCard, { MovieCardProps } from './MovieCard';
import { cards } from '../../mocks';

export default {
  title: 'MovieCard',
  component: MovieCard,
} as Meta;

const Template: Story<MovieCardProps> = (args) => <MovieCard {...args} />;

export const Vertical = Template.bind({});
Vertical.args = cards[0];

// export const Horizontal = Template.bind({});
// Horizontal.args = {
//   orientation: "vertical",
//   name: "Hobbit",
//   img:
//     "https://images-na.ssl-images-amazon.com/images/I/7145Wo9GjlL._AC_SL1006_.jpg",
//   info: {
//     year: 2004,
//     genres: ["fantasy", "epic"],
//     rating: 4.9,
//     views: 9123000,
//     length: 123,
//     pgRating: "PG-6",
//   },
// };
