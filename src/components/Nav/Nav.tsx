import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
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
  const history = useHistory();
  const location = useLocation();
  const [active, setActive] = useState('/');

  useEffect(() => {
    history.push(active);
  }, [active]);

  return (
    <Grid className={classes.root} container justify="center">
      {links.map((link) => (
        <Button
          className={classes.Button}
          key={link.id}
          variant={location.pathname === link.to ? 'contained' : 'outlined'}
          color={link.highlight ? 'secondary' : 'primary'}
          onClick={() => setActive(link.to)}
        >
          <NavLink to={link.to} className={classes.Link}>
            {link.name}
          </NavLink>
        </Button>
      ))}
    </Grid>
  );
};

export default Nav;
