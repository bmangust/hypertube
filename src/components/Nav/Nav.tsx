import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { theme } from '../../theme';

export interface ILink {
  id: number;
  to: string;
  name: string;
  highlight?: boolean;
}

export interface NavProps {
  links: ILink[];
}

const useStyles = makeStyles({
  root: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  Button: {
    borderRadius: 0,
  },
  Link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

const Nav = ({ links }: NavProps) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Grid className={classes.root} container justify="center">
      {links.map((link) => (
        <NavLink key={link.id} to={link.to} className={classes.Link}>
          <Button
            className={classes.Button}
            variant={location.pathname === link.to ? 'contained' : 'outlined'}
            color={link.highlight ? 'secondary' : 'primary'}
          >
            {link.name}
          </Button>
        </NavLink>
      ))}
    </Grid>
  );
};

export default Nav;
