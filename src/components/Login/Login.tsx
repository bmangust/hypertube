import {
  Button,
  FormGroup,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../axios';
import OAuthButton from '../OAuthButton/OAuthButton';

interface LoginProps {
  handleOpen?: (arg: boolean) => void;
}

const useStyles = makeStyles({
  root: {
    padding: '2rem 1rem',
    minWidth: '30rem',
  },
  Form: {
    width: '100%',
  },
  margin: {
    marginBottom: 10,
  },
  padding: {
    padding: '5px 10px',
  },
  Link: {
    textDecoration: 'none',
  },
});

const Login: React.FC<LoginProps> = ({ handleOpen }: LoginProps) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    console.log('[Login] handleSubmit', inputs);

    const authHeader =
      'Basic ' +
      btoa(encodeURI(inputs.email) + ':' + encodeURI(inputs.password));
    try {
      auth('basic', {
        headers: {
          Authorization: authHeader,
        },
      })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseForm = () => {
    handleOpen && handleOpen(false);
  };

  const handleForgot = () => {
    console.log('[Login] handleForgot');
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <FormGroup className={classes.Form}>
        <TextField
          fullWidth
          name="email"
          type="email"
          placeholder="Enter email"
          value={inputs.email}
          onChange={handleInput}
          className={classes.margin}
          size="small"
        />
        <TextField
          fullWidth
          name="password"
          type="password"
          placeholder="Enter password"
          value={inputs.password}
          onChange={handleInput}
          className={classes.margin}
          size="small"
        />
        <Button
          className={classes.margin}
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Button
          className={classes.margin}
          variant="outlined"
          onClick={handleForgot}
        >
          Forgot password?
        </Button>
        <NavLink to="/register" className={classes.Link}>
          <Button
            className={classes.margin}
            fullWidth
            variant="outlined"
            onClick={handleCloseForm}
          >
            Register
          </Button>
        </NavLink>
        <Grid container alignItems="center" justify="space-evenly">
          <OAuthButton variant="42" />
          <OAuthButton variant="google" />
        </Grid>
      </FormGroup>
    </Grid>
  );
};

export default Login;
