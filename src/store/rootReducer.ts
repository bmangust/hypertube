import { combineReducers } from '@reduxjs/toolkit';
import UI from './features/UISlice';
import movies from './features/MoviesSlice';
import filter from './features/FilterSlice';
import snack from './features/SnackSlice';

const rootReducer = combineReducers({ UI, movies, filter, snack });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
