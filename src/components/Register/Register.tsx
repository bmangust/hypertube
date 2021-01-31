import { Grid, makeStyles } from '@material-ui/core';
import React, { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../../axios';
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
    username: '',
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
  const { t } = useTranslation();

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
      username: inputs.username,
      passwd: inputs.password,
    };
    const res = await profile.put('create', body);
    console.log(res);
  };

  const formData = {
    inputs: [
      {
        name: 'email',
        type: 'email',
        label: t('Email'),
        placeholder: t('Enter email'),
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
          helperText: t('emailError'),
          rule: useMemo(
            () => ({
              minLength: 6,
              maxLength: 40,
              regex: /^([\w%+-.]+)@([\w-]+\.)+([\w]{2,})$/i,
            }),
            []
          ),
        },
      },
      {
        name: 'username',
        type: 'text',
        label: t('Username'),
        placeholder: t('Enter username'),
        value: inputs.username,
        onChange: handleInput,
        size: 'small',
        fullWidth: true,
        required: true,
        onValidate: useCallback(
          (isValid) => {
            setValid((prev) => ({ ...prev, username: isValid }));
          },
          [setValid]
        ),
        rules: {
          helperText: t('usernameError'),
          rule: useMemo(
            () => ({
              minLength: 3,
              maxLength: 20,
              regex: /^[\w%-+.]+$/,
            }),
            []
          ),
        },
      },
      {
        name: 'password',
        type: 'password',
        label: t('Password'),
        placeholder: t('Enter password'),
        value: inputs.password,
        onChange: handleInput,
        size: 'small',
        fullWidth: true,
        required: true,
        onValidate: useCallback((isValid) => {
          setValid((prev) => ({ ...prev, password: isValid }));
        }, []),
        rules: {
          helperText: t('passwordError'),
          rule: useMemo(
            () => ({
              minLength: 6,
              maxLength: 25,
              regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{6,}$/,
            }),
            []
          ),
        },
      },
      {
        name: 'confirm',
        type: 'password',
        label: t('Confirm'),
        placeholder: t('Confirm password'),
        value: inputs.confirm,
        onChange: handleInput,
        size: 'small',
        fullWidth: true,
        required: true,
        onValidate: useCallback((isValid) => {
          setValid((prev) => ({ ...prev, confirm: isValid }));
        }, []),
        rules: {
          helperText: t('confirmError'),
          rule: useMemo(
            () => ({
              minLength: 3,
              maxLength: 20,
              regex: new RegExp(`^${inputs.password}$`),
            }),
            [inputs.password]
          ),
        },
      },
    ] as IInputProps[],
    buttons: [
      {
        type: 'submit',
        variant: 'contained',
        onClick: handleSubmit,
        text: t('Register'),
        disabled: !formValid,
      },
      {
        to: '/login',
        variant: 'outlined',
        text: t('Login'),
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
