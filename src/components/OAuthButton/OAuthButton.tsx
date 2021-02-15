import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useMemo, useState } from 'react';

interface Props {
  variant: '42' | 'google';
}

const useStyles = makeStyles({
  OAuthButton: {
    width: '6rem',
  },
});

const oauth = {
  '42': {
    url: 'https://api.intra.42.fr/oauth/authorize',
    queryParams: [
      {
        name: 'client_id',
        value:
          '96975efecfd0e5efee67c9ac4cc350ac9372ae559b2fb8a08feba6841a33fb53',
      },
      {
        name: 'redirect_uri',
        value: 'http://localhost:4000/api/auth/oauth42',
      },
      {
        name: 'scope',
        value: 'public',
      },
      {
        name: 'state',
        value:
          'bdcbe28874ab05962b50430b1466a8ebcbda45ba8c3c1beee600699478ad2a4d',
      },
      {
        name: 'response_type',
        value: 'code',
      },
    ],
  },
  google: {
    url: 'https://accounts.google.com/o/oauth2/v2/auth',
    queryParams: [
      {
        name: 'client_id',
        value:
          '96975efecfd0e5efee67c9ac4cc350ac9372ae559b2fb8a08feba6841a33fb53',
      },
      {
        name: 'redirect_uri',
        value: 'http://localhost:4000/user/auth/oauthGoogle',
      },
      {
        name: 'scope',
        value: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      },
      {
        name: 'state',
        value:
          'bdcbe28874ab05962b50430b1466a8ebcbda45ba8c3c1beee600699478ad2a4d',
      },
      {
        name: 'response_type',
        value: 'token',
      },
    ],
  },
};

const Icon42: React.FC = () => (
  <img
    height="30"
    width="30"
    src="https://signin.intra.42.fr/assets/42_logo-7dfc9110a5319a308863b96bda33cea995046d1731cebb735e41b16255106c12.svg"
    alt="42 auth"
    style={{ filter: 'invert(1)' }}
  />
);

const IconGoogle: React.FC = () => (
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
);

const OAuthButton: React.FC<Props> = ({ variant }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    const queryParams = oauth[variant].queryParams.reduce((acc: any, el) => {
      acc[el.name] = el.value;
      return acc;
    }, {});
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${oauth[variant].url}?${queryString}`;
    window.location.href = url;
  };

  const icon = useMemo(() => (variant === '42' ? <Icon42 /> : <IconGoogle />), [
    variant,
  ]);

  return (
    <Button
      type="submit"
      disabled={loading}
      onClick={handleClick}
      className={classes.OAuthButton}
      aria-label={`${variant} oauth`}
    >
      {loading ? <CircularProgress /> : icon}
    </Button>
  );
};

export default OAuthButton;
