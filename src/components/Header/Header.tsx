import { Grid, makeStyles } from "@material-ui/core";
import { PersonOutlineRounded, SearchRounded } from "@material-ui/icons";
import React from "react";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";

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
        <PersonOutlineRounded />
      </Grid>
    </Grid>
  );
};

export default Header;
