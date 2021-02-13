import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../../axios';
import Form, { IButtonProps } from '../Form/Form';
import { IInputProps } from '../Input/Input';
import defaultAvatar from '../../images/defaultAvatar.jpg';
import uploadIcon from '../../images/uploadIcon.png';

const useStyles = makeStyles({
  root: {
    padding: '2rem 1rem',
    minWidth: '30rem',
  },
  avatarWrapper: {
	position: 'relative',
  },
  avatarImage: {
	  width: '100px',
	  height: '100px',
	  border: '2px solid rgba(3, 82, 99, 0.5)'
  },
  inputNone: {
	  display: 'none'
  },
  uploadIcon: {
	position: 'absolute',
	top: 0,
	width: '100px',
	height: '100px',
	opacity: '0.7',
  }
});

const Settings = () => {
  const [inputs, setInputs] = useState({
    email: '',
    username: '',
    newPassword: '',
	currentPassword: '',
	avatarImage: ''
  });
  const [valid, setValid] = useState({
    email: false,
	newPassword: false,
	currentPassword: false,
	avatar: false,
	username: false
  });
  const formValid = (valid.avatar) || (valid.currentPassword && (valid.email || valid.newPassword || valid.username));
  const classes = useStyles();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
//   const [avatarImage, setAvatar] = useState<string>('');
  const [uploadIconVisible, setUploadIconVisibility] = useState<boolean>(false);

  const validateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
	if (!e.target.files) return;
	let file = e.target.files[0];
	if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg") {
		return true;
	} else {
		return false;
	}
  }
  const uploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
	if (!e.target.files) return;
	let file = e.target.files[0];
	if (file.size < 2000000) {
		let reader = new FileReader();
		reader.onload = function(e) {
			if (!e.target || !e.target.result) return;
			setInputs({
				...inputs,
				avatarImage: e.target.result.toString()});
		}
		reader.readAsDataURL(file);
		setValid({
			...valid,
			avatar: true
		});
	} else {
		e.target.value = "";
		alert("Please upload picture size less then 2 mb!");
	}
  }

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
	  newPasswd: inputs.newPassword,
	  passwd: inputs.currentPassword,
    };
    // const res = await profile.put('create', body);
    // console.log(res);
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
		<div className={classes.avatarWrapper}
			onMouseOver={() => {
				setUploadIconVisibility(true);
			}}
			onMouseOut={() => {
				setUploadIconVisibility(false);
			}}
			onClick={() => {
				if (inputRef && inputRef.current) {
					inputRef.current.click();
					setUploadIconVisibility(false);
				}
			}}>
			<Avatar className={classes.avatarImage}
				alt="profile image"
				src={inputs.avatarImage || defaultAvatar}
				style={uploadIconVisible ? {opacity: 0.5} : {opacity: 1}}
			/>
			<img className={classes.uploadIcon}
				src={uploadIcon}
				alt="uploadIcon"
				style={uploadIconVisible ? {display: 'block'} : {display: 'none'}}
			/>
			<input className={classes.inputNone}
				type="file"
				accept="image/png, image/jpeg, image/jpg"
				ref={inputRef}
				onChange={(e) => {
					let files = e.target.files;
					if (!files) return;
					if (files.length === 1 && validateUpload(e)) {
						uploadAvatar(e);
					} else {
						e.target.value = "";
						alert("Please add image only!");
					}
				}}
			/>
		</div>
      <Form {...formData} />
    </Grid>
  );
};

export default Settings;
