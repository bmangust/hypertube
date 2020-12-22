import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Header, { HeaderProps } from "./Header";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => (
  <BrowserRouter>
    <Header {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
