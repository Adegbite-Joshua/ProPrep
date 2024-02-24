import { createSlice } from '@reduxjs/toolkit';

export const userDetails = createSlice({
  name: 'userDetails',
  initialState: {
    details: {},
    showLatestUpdate: true
  },
  reducers: {
    updateUserDetails: (state, actions) => {
      state.details = actions.payload.userDetails;
    },
    updateShowLatestUpdate: (state, actions) => {
      state.showLatestUpdate = actions.payload;
    },
  },
});

export const { updateUserDetails, updateShowLatestUpdate } = userDetails.actions;

export default userDetails.reducer;
