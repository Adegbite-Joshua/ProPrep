import { createSlice } from '@reduxjs/toolkit';

export const userDetails = createSlice({
  name: 'userDetails',
  initialState: {
    details: {},
  },
  reducers: {
    updateUserDetails: (state, actions) => {
      state.details = actions.payload.userDetails;
    },
    decrement: (state, actions) => {
      state.details = actions.payload;
    },
  },
});

export const { updateUserDetails, decrement } = userDetails.actions;

export default userDetails.reducer;
