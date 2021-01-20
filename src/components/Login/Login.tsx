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
  OAuthButton: {
    width: '6rem',
  },
  invert: {
    filter: 'invert(1)',
  },
  Link: {
    textDecoration: 'none',
  },
});

const Login: React.FC<LoginProps> = ({ handleOpen }: LoginProps) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
  };

  const handleCloseForm = () => {
    handleOpen && handleOpen(false);
  };

  const handleForgot = () => {
    console.log('[Login] handleForgot');
  };

  const handleOAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('[Login] handleOAuth', e.currentTarget.name);
    if (e.currentTarget.name === '42') {
      // const formData = new FormData();
      // formData.append(
      //   'client_id',
      //   '96975efecfd0e5efee67c9ac4cc350ac9372ae559b2fb8a08feba6841a33fb53'
      // );
      // formData.append(
      //   'redirect_uri',
      //   'http://localhost:4000/user/auth/oauth42'
      // );
      // formData.append('scope', 'public');
      // formData.append(
      //   'state',
      //   'bdcbe28874ab05962b50430b1466a8ebcbda45ba8c3c1beee600699478ad2a4d'
      // );
      // formData.append('response_type', 'code');
      // axios({
      //   method: 'get',
      //   url: 'https://api.intra.42.fr/oauth/authorize',
      //   params: formData,
      //   headers: {
      //     'Content-Type':
      //       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      //   },
      // })
      //   .then((res) => console.log(res))
      //   .catch((e) => console.log(e));
      // const url =
      //   'https://api.intra.42.fr/oauth/authorize?client_id=96975efecfd0e5efee67c9ac4cc350ac9372ae559b2fb8a08feba6841a33fb53&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fuser%2Fauth%2Foauth42&scope=public&state=bdcbe28874ab05962b50430b1466a8ebcbda45ba8c3c1beee600699478ad2a4d&response_type=code';
      // axios(url)
      //   .then((res) => console.log(res.data))
      //   .catch((e) => {});
    }
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
          <form method="get" action="https://api.intra.42.fr/oauth/authorize">
            <input
              type="hidden"
              name="client_id"
              value="96975efecfd0e5efee67c9ac4cc350ac9372ae559b2fb8a08feba6841a33fb53"
            />
            <input
              type="hidden"
              name="redirect_uri"
              value="http://localhost:4000/user/auth/oauth42"
            />
            <input type="hidden" name="scope" value="public" />
            <input
              type="hidden"
              name="state"
              value="bdcbe28874ab05962b50430b1466a8ebcbda45ba8c3c1beee600699478ad2a4d"
            />
            <input type="hidden" name="response_type" value="code" />
            <Button
              // name="42"
              type="submit"
              onClick={handleOAuth}
              className={classes.OAuthButton}
            >
              <img
                height="30"
                width="30"
                src="https://signin.intra.42.fr/assets/42_logo-7dfc9110a5319a308863b96bda33cea995046d1731cebb735e41b16255106c12.svg"
                alt="42 auth"
                className={classes.invert}
              />
            </Button>
          </form>
          <Button
            name="google"
            onClick={handleOAuth}
            className={classes.OAuthButton}
          >
            <svg
              height="30"
              width="30"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z"
                  fill="#4285f4"
                ></path>
                <path
                  d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z"
                  fill="#34a853"
                ></path>
                <path
                  d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z"
                  fill="#fbbc05"
                ></path>
                <path
                  d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z"
                  fill="#ea4335"
                ></path>
                <path d="M20 20h472v472H20V20z"></path>
              </g>
            </svg>
          </Button>
        </Grid>
      </FormGroup>
    </Grid>
  );
};

export default Login;
