import { combineReducers } from '@reduxjs/toolkit';
import UI from './features/UISlice';

const rootReducer = combineReducers({ UI });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
