import { configureStore } from '@reduxjs/toolkit';
import userDetails from './userDetails';

export const store = configureStore({
  reducer: {
    userDetails: userDetails,
  },
});
