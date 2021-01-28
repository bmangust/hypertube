import { combineReducers } from '@reduxjs/toolkit';
import UI from './features/UISlice';
import movies from './features/MoviesSlice';
import filter from './features/FilterSlice';

const rootReducer = combineReducers({ UI, movies, filter });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
