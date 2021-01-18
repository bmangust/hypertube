import { Container } from '@material-ui/core';
import React from 'react';

interface Props {}

const Dropdown: React.FC = (props: Props) => {
  return (
    <Container>
      <div>item1</div>
      <div>item2</div>
      <div>item3</div>
      <div>item4</div>
    </Container>
  );
};

export default Dropdown;
