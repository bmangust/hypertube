import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../../axios';
import Form, { IButtonProps } from '../Form/Form';
import { IInputProps } from '../Input/Input';
import defaultAvatar from '../../images/defaultAvatar.png';
import { BackupRounded } from '@material-ui/icons';
import { RootState } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { useToast } from '../../hooks/useToast';
import { getToken, saveUserState } from '../../store/features/UserSlice';
import { useAppDispatch } from '../../store/store';

const useStyles = makeStyles({
  root: {
    padding: '2rem 1rem',
    minWidth: '30rem',
  },
  avatarWrapper: {
    position: 'relative',
    '&:hover': {
      cursor: 'pointer',
      '& $uploadIcon': {
        opacity: 0.7,
      },
      '& $avatarImage': {
        opacity: 0.5,
      },
    },
  },
  avatarImage: {
    width: '100px',
    height: '100px',
    border: '2px solid rgba(3, 82, 99, 0.5)',
    opacity: 1,
    transition: '0.2s',
  },
  inputNone: {
    display: 'none',
  },
  uploadIcon: {
    position: 'absolute',
    transition: '0.2s',
    top: 20,
    left: 20,
    width: 60,
    height: 60,
    opacity: 0,
    zIndex: 2,
  },
});

const Settings = () => {
  const user = useSelector((state: RootState) => state.user);
  const [inputs, setInputs] = useState({
    email: user.email,
    username: user.username,
    newPassword: '',
    currentPassword: '',
    avatarImage: user.imageBody,
  });
  const [valid, setValid] = useState({
    email: true,
    newPassword: true,
    currentPassword: true,
    avatar: true,
    username: true,
  });
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const validateForm = () => {
    const { email, avatar, username, newPassword, currentPassword } = valid;
    return newPassword
      ? currentPassword && (email || avatar || username)
      : email || avatar || username;
  };
  const formValid = validateForm();

  const validateUpload = (file: File) => {
    return (
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg'
    );
  };
  const uploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    let file = e.target.files[0];
    if (!validateUpload(file)) {
      e.target.value = '';
      return toast({ text: 'Please add image only!' });
    }
    if (file.size > 2000000) {
      e.target.value = '';
      return toast({ text: 'Please upload picture size less then 2 mb!' });
    }
    let reader = new FileReader();
    reader.onload = async function (e) {
      if (!e.target || !e.target.result) return;
      setInputs({
        ...inputs,
        avatarImage: e.target.result.toString(),
      });
    };
    reader.readAsDataURL(file);
    setValid({
      ...valid,
      avatar: true,
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Settings] handleSubmit', inputs);

    const body = {
      email: inputs.email,
      username: inputs.username,
      imageBody: inputs.avatarImage,
    } as {
      email?: string;
      username?: string;
      imageBody?: string;
      newPassword?: string;
      currentPassword?: string;
    };
    if (inputs.newPassword && inputs.currentPassword) {
      body.newPassword = inputs.newPassword;
      body.currentPassword = inputs.currentPassword;
    }
    const res = await profile.patch('patch', body, {
      headers: {
        accessToken: getToken(),
      },
    });
    console.log(res.data);
    if (res.status >= 400) toast({ text: res.data[i18n.language] }, 'error');
    else {
      dispatch(
        saveUserState({
          user: {
            ...user,
            username: inputs.username,
            imageBody: inputs.avatarImage,
          },
        })
      );
      toast({ text: t`User info updated` });
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
              regex: /^[\w-+.]+$/,
            }),
            []
          ),
        },
      },
      {
        name: 'newPassword',
        type: 'password',
        label: t('New password'),
        placeholder: t('Enter new password'),
        value: inputs.newPassword,
        onChange: handleInput,
        size: 'small',
        fullWidth: true,
        required: true,
        onValidate: useCallback((isValid) => {
          setValid((prev) => ({ ...prev, newPassword: isValid }));
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
        name: 'currentPassword',
        type: 'password',
        label: t('Current password'),
        placeholder: t('Enter current password'),
        value: inputs.currentPassword,
        onChange: handleInput,
        size: 'small',
        fullWidth: true,
        required: true,
        onValidate: useCallback((isValid) => {
          setValid((prev) => ({ ...prev, currentPassword: isValid }));
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
    ] as IInputProps[],
    buttons: [
      {
        type: 'submit',
        variant: 'contained',
        onClick: handleSubmit,
        text: t('Save'),
        disabled: !formValid,
      },
      {
        to: '/',
        variant: 'outlined',
        text: t('Exit'),
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
      <Typography>{t('Settings').toUpperCase()}</Typography>
      <div
        className={classes.avatarWrapper}
        // onMouseOver={() => {
        //   setUploadIconVisibility(true);
        // }}
        // onMouseOut={() => {
        //   setUploadIconVisibility(false);
        // }}
        onClick={() => {
          if (inputRef && inputRef.current) {
            inputRef.current.click();
            // setUploadIconVisibility(false);
          }
        }}
      >
        <Avatar
          className={classes.avatarImage}
          alt="profile image"
          src={inputs.avatarImage || defaultAvatar}
          // style={uploadIconVisible ? { opacity: 0.5 } : { opacity: 1 }}
        />
        <BackupRounded className={classes.uploadIcon} />
        {/* <img
          className={classes.uploadIcon}
          src={uploadIcon}
          alt="uploadIcon"
          style={uploadIconVisible ? { display: 'block' } : { display: 'none' }}
        /> */}
        <input
          className={classes.inputNone}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          ref={inputRef}
          onChange={uploadAvatar}
        />
      </div>
      <Form {...formData} />
    </Grid>
  );
};

export default Settings;
