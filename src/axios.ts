import axios from 'axios';
export const CancelToken = axios.CancelToken;

export const auth = axios.create({
  baseURL: `/user/auth/`,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 500,
});

export const register = axios.create({
  baseURL: `/user/create/`,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 500,
});
