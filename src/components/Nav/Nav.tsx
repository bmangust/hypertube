import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { theme } from "../../theme";

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
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  Button: {
    margin: "0 10px",
    borderRadius: 0,
  },
  Link: {
    textDecoration: "none",
    color: "inherit",
  },
});

const Nav = ({ links }: NavProps) => {
  const classes = useStyles();
  const [active, setActive] = useState(0);

  return (
    <Grid className={classes.root} container justify="center">
      {links.map((link) => (
        <Button
          className={classes.Button}
          key={link.id}
          variant={active === link.id ? "contained" : "outlined"}
          color={link.highlight ? "secondary" : "primary"}
          onClick={() => setActive(link.id)}
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
