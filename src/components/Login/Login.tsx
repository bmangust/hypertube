import { Grid, makeStyles } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { auth } from '../../axios';
import { handlersContext } from '../Dropdown/Dropdown';
import Form, { IButtonProps } from '../Form/Form';
import { IInputProps } from '../Input/Input';
import OAuthButton from '../OAuthButton/OAuthButton';

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

const Login: React.FC = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [valid, setValid] = useState({ email: false, password: false });
  const formValid = valid.email && valid.password;
  const { onClose } = React.useContext(handlersContext);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    onClose();
  };

  const handleForgot = () => {
    console.log('[Login] handleForgot');
    onClose();
  };

  const formData = {
    inputs: [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        value: inputs.email,
        onChange: handleInput,
        size: 'small',
        fullWidth: true,
        required: true,
        onValidate: useCallback((isValid) => {
          setValid((prev) => ({ ...prev, email: isValid }));
        }, []),
        rules: {
          helperText: 'invalid email',
          rule: {
            minLength: 6,
            maxLength: 40,
            regex: /^([\w%+-.]+)@([\w-]+\.)+([\w]{2,})$/i,
          },
        },
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        value: inputs.password,
        onChange: handleInput,
        size: 'small',
        fullWidth: true,
        required: true,
        onValidate: useCallback((isValid) => {
          setValid((prev) => ({ ...prev, password: isValid }));
        }, []),
        rules: {
          helperText:
            'Use at least one lower- and uppercase letter, number and symbol. Min length 4',
          rule: {
            minLength: 6,
            maxLength: 25,
            regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{6,}$/,
          },
        },
      },
    ] as IInputProps[],
    buttons: [
      {
        type: 'submit',
        variant: 'contained',
        onClick: handleSubmit,
        text: 'Login',
        disabled: !formValid,
      },
      {
        variant: 'outlined',
        onClick: handleForgot,
        text: 'Forgot password?',
      },
      {
        to: '/register',
        variant: 'outlined',
        text: 'Register',
        onClick: onClose,
      },
    ] as IButtonProps[],
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Form {...formData}>
        <Grid container alignItems="center" justify="space-evenly">
          <OAuthButton variant="42" />
          <OAuthButton variant="google" />
        </Grid>
      </Form>
    </Grid>
  );
};

export default Login;
