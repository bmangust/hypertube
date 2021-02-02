import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { passwd } from '../../axios';
import { useToast } from '../../hooks/useToast';

import Form, { IButtonProps } from '../Form/Form';
import { IInputProps } from '../Input/Input';

const useStyles = makeStyles({
  root: {
    padding: '2rem 1rem',
    minWidth: '30rem',
  },
});

const ForgotPassword = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({ email: '' });
  const [valid, setValid] = useState({ email: false });
  const { t, i18n } = useTranslation();
  const formValid = valid.email;
  const { toast } = useToast();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[ForgotPassword] handleSubmit', inputs);

    try {
      const res = await passwd.post('forgot', {
        body: { email: inputs.email },
      });
      console.log(res);
      if (res.status < 400) {
        toast(t`Check your email`);
      } else {
        console.log(res.data[`description_${i18n.language}`]);
        toast(
          res.data[`description_${i18n.language}`] || t`Server error`,
          'error'
        );
      }
    } catch (e) {
      toast(t`Server error`, 'error');
    }
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
        onValidate: React.useCallback((isValid) => {
          setValid((prev) => ({ ...prev, email: isValid }));
        }, []),
        rules: {
          helperText: t('emailError'),
          rule: React.useMemo(
            () => ({
              minLength: 6,
              maxLength: 40,
              regex: /^([\w%+-.]+)@([\w-]+\.)+([\w]{2,})$/i,
            }),
            []
          ),
        },
      },
    ] as IInputProps[],
    buttons: [
      {
        type: 'submit',
        variant: 'contained',
        onClick: handleSubmit,
        text: t`Restore password`,
        disabled: !formValid,
      },
      {
        to: '/login',
        variant: 'outlined',
        text: t('Login'),
      },
      {
        to: '/register',
        variant: 'outlined',
        text: t('Register'),
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

export default ForgotPassword;
