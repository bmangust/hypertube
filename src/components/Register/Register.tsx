import { Grid, makeStyles } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { register } from '../../axios';
import Form, { IButtonProps } from '../Form/Form';
import { IInputProps } from '../Input/Input';

const useStyles = makeStyles({
  root: {
    padding: '2rem 1rem',
    minWidth: '30rem',
  },
});

const Register = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  const [valid, setValid] = useState({
    email: false,
    password: false,
    confirm: false,
  });
  const formValid = valid.email && valid.password;
  const classes = useStyles();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Register] handleSubmit', inputs);

    const body = {
      email: inputs.email,
      passwd: inputs.password,
      first_name: 'fname',
      last_name: 'lname',
      displayname: 'displayname',
    };
    const res = await register.put('basic', body);
    console.log(res);
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
        onValidate: useCallback(
          (isValid) => {
            setValid((prev) => ({ ...prev, email: isValid }));
          },
          [setValid]
        ),
        rules: {
          helperText: 'invalid email',
          rule: {
            minLength: 3,
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
            minLength: 4,
            maxLength: 20,
            regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{4,}$/,
          },
        },
      },
      {
        name: 'confirm',
        type: 'password',
        label: 'Confirm',
        placeholder: 'Confirm password',
        value: inputs.confirm,
        onChange: handleInput,
        size: 'small',
        fullWidth: true,
        required: true,
        onValidate: useCallback((isValid) => {
          setValid((prev) => ({ ...prev, confirm: isValid }));
        }, []),
        rules: {
          helperText: 'Confirm and password does not match',
          rule: {
            minLength: 3,
            maxLength: 20,
            regex: new RegExp(`^${inputs.password}$`),
          },
        },
      },
    ] as IInputProps[],
    buttons: [
      {
        type: 'submit',
        variant: 'contained',
        onClick: handleSubmit,
        text: 'Register',
        disabled: !formValid,
      },
      {
        to: '/login',
        variant: 'outlined',
        text: 'Login',
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
      <Form {...formData} />
    </Grid>
  );
};

export default Register;
