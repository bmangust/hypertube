import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { backgroundColor } from '../../theme';

const useStyles = makeStyles({
  root: {
    background: backgroundColor.dark,
    padding: '2rem',
  },
  right: {
    grow: 1,
    marginLeft: 'auto',
  },
});

const FilterSortPanel = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <div>Filter</div>
      <div>Sort</div>
      <div className={classes.right}>Grid/Tile switch</div>
    </Grid>
  );
};

export default FilterSortPanel;
