import { Button, Grid, makeStyles } from '@material-ui/core';
import { PersonOutlineRounded } from '@material-ui/icons';
import React from 'react';
import Search from '../Search/Search';

export interface HeaderProps {}

const useStyles = makeStyles({
  root: {},
});

const Header = (props: HeaderProps) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item xs={2}>
        Logo
      </Grid>
      <Grid container justify="flex-end" item xs={8}>
        <Search />
      </Grid>
      <Grid container alignItems="center" justify="center" item xs={1}></Grid>
      <Grid container alignItems="center" justify="center" item xs={1}>
        <Button>
          <PersonOutlineRounded />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
