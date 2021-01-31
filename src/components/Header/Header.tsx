import { ButtonProps, Grid, makeStyles } from '@material-ui/core';
import { PersonOutlineRounded } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Login from '../Login/Login';
import Search from '../Search/Search';
const useStyles = makeStyles({
  root: {},
});

const Header: React.FC = () => {
  const classes = useStyles();

  const buttonProps: ButtonProps = {
    variant: 'outlined',
  };

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
        <Dropdown icon={<PersonOutlineRounded />} buttonProps={buttonProps}>
          <Login />
        </Dropdown>
      </Grid>
    </Grid>
  );
};

export default Header;
