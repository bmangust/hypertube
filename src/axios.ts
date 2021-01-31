import axios from 'axios';
export const CancelToken = axios.CancelToken;

export const auth = axios.create({
  baseURL: `/api/user/auth/`,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 500,
});

export const profile = axios.create({
  baseURL: `/api/profile/`,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 500,
});

export const main = axios.create({
  baseURL: `/`,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 500,
});
