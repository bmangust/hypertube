import { Button, Grid, makeStyles } from '@material-ui/core';
import {
  DashboardRounded,
  SortRounded,
  ViewAgendaRounded,
} from '@material-ui/icons';
import React, { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Filter from '../Filter/Filter';

const useStyles = makeStyles({
  root: {
    padding: '10px 30px',
  },
  right: {
    grow: 1,
    marginLeft: 'auto',
  },
});

const FilterSortPanel = () => {
  const classes = useStyles();
  const [isGrid, setIsGrid] = useState(false);

  const items = [
    {
      text: 'By rating',
    },
    {
      text: 'By name',
    },
    {
      text: 'By year',
    },
    {
      text: 'By avalibility',
    },
  ];

  return (
    <Grid container className={classes.root} alignItems="center">
      <Filter />
      <Dropdown heroText="Sort" icon={<SortRounded />} items={items} />
      <Button
        className={classes.right}
        variant="text"
        size="large"
        onClick={() => setIsGrid((isGrid) => !isGrid)}
      >
        {isGrid ? <DashboardRounded /> : <ViewAgendaRounded />}
      </Button>
    </Grid>
  );
};

export default FilterSortPanel;
