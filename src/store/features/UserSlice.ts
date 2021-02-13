import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profile } from '../../axios';
import { AppDispatch } from '../store';

const tokenKey = 'hypertubeAuthToken';

interface IUserPayload {
  user: IUser;
}

export interface IUser {
  user_id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  image_body: string | null;
}

export type IUserState = IUser & {
  isAuth: boolean;
  isLoading: boolean;
};

const initialState: IUserState = {
  isAuth: false,
  isLoading: false,
  user_id: 0,
  email: '',
  username: '',
  first_name: '',
  last_name: '',
  image_body: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserState(state, { payload }: PayloadAction<IUserPayload>) {
      if (!payload.user)
        throw new Error('[userSlice:saveState] no user in payload');
      //   Object.keys(payload.user).map((k) => {
      //     const key = k as IUserKeys;
      //     state[key] = payload.user[key];
      //   });
      return {
        isAuth: state.isAuth,
        isLoading: state.isLoading,
        user_id: payload.user.user_id || state.user_id,
        email: payload.user.email || state.email,
        username: payload.user.username || state.username,
        first_name: payload.user.first_name || state.first_name,
        last_name: payload.user.last_name || state.last_name,
        image_body: payload.user.image_body || state.image_body,
      };
    },
    authSuccess(state) {
      state.isAuth = true;
    },
    authFail(state) {
      state.isAuth = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const getSelfInfo = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const res = await profile('get', {
      headers: {
        access_token: getToken(),
      },
    });
    console.log(res.data);
    if (res.data) {
      dispatch(
        saveUserState({
          user: res.data as IUser,
        })
      );
      dispatch(authSuccess());
    }
  } catch (e) {
    console.log(e);
  }
  dispatch(stopLoading());
};

export const saveToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

export const removeToken = (key: string = tokenKey) => {
  localStorage.removeItem(key);
};

export const getToken = () => localStorage.getItem(tokenKey);

export const {
  saveUserState,
  authSuccess,
  authFail,
  startLoading,
  stopLoading,
} = userSlice.actions;

export default userSlice.reducer;
