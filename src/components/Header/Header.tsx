import { Button, Grid, makeStyles, Paper, Popper } from '@material-ui/core';
import { PersonOutlineRounded } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import Login from '../Login/Login';
import Search from '../Search/Search';
const useStyles = makeStyles({
  root: {},
});

const Header: React.FC = () => {
  const classes = useStyles();
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((open) => !open);
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
        <Button ref={buttonRef} onClick={handleClick}>
          <PersonOutlineRounded />
        </Button>
        <Popper
          open={open}
          anchorEl={buttonRef?.current}
          placement="bottom-end"
        >
          <Paper>
            <Login handleOpen={setOpen} />
          </Paper>
        </Popper>
      </Grid>
    </Grid>
  );
};

export default Header;
