import React, { useCallback, useMemo, useState } from 'react';
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

const ResetPassword = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({ password: '', confirm: '' });
  const [valid, setValid] = useState({ password: false, confirm: false });
  const { t, i18n } = useTranslation();
  const formValid = valid.password && valid.confirm;
  const { toast } = useToast();

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    },
    [inputs]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log('[ForgotPassword] handleSubmit', inputs);

      // use cookie or repairToken to get new password
      try {
        const res = await passwd.patch('repair/patch', {
          body: { password: inputs.password },
        });
        console.log(res);
        if (res.status < 400) {
          toast(t`Password changed`);
        } else {
          console.log(res.data[i18n.language]);
          const message = {
            text: res.data[i18n.language] ?? t`Server error`,
          };

          toast(message, 'error');
        }
      } catch (e) {
        toast(t`Server error`, 'error');
      }
    },
    [inputs, t, i18n.language, toast]
  );

  const formData = useMemo(
    () => ({
      inputs: [
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
          onValidate: (isValid) =>
            setValid((prev) => ({ ...prev, password: isValid })),
          rules: {
            helperText: t('passwordError'),
            rule: {
              minLength: 6,
              maxLength: 25,
              regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{6,}$/,
            },
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
          onValidate: (isValid) =>
            setValid((prev) => ({ ...prev, confirm: isValid })),
          rules: {
            helperText: t('confirmError'),
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
          text: t`Save new password`,
          disabled: !formValid,
        },
      ] as IButtonProps[],
    }),
    [inputs, formValid, handleInput, handleSubmit, t]
  );

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

export default ResetPassword;
