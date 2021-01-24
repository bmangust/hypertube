import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import MovieCard, { MovieCardProps } from './MovieCard';
import { cards } from '../../mock/mocks';

export default {
  title: 'MovieCard',
  component: MovieCard,
} as Meta;

const Template: Story<MovieCardProps> = (args) => <MovieCard {...args} />;

export const Image = Template.bind({});
Image.args = { card: cards[0], display: 'image' };
export const WithName = Template.bind({});
WithName.args = { card: cards[0], display: 'grid' };
export const WithInfo = Template.bind({});
WithInfo.args = { card: cards[0], display: 'lines' };
