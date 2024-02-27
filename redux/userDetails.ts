import { createSlice } from '@reduxjs/toolkit';

export const userDetails = createSlice({
  name: 'userDetails',
  initialState: {
    details: {},
    showLatestUpdate: true,
    attemptedQuestions: []
  },
  reducers: {
    updateUserDetails: (state, actions) => {
      state.details = actions.payload.userDetails;
    },
    updateShowLatestUpdate: (state, actions) => {
      state.showLatestUpdate = actions.payload;
    },
    updateAttemptedQuestions: (state, actions) => {
      const { questions } = actions.payload;
      state.attemptedQuestions = state.attemptedQuestions || [];
      state.attemptedQuestions = [...new Set(state.attemptedQuestions.concat(questions))];
    },
  },
});

export const { updateUserDetails, updateShowLatestUpdate, updateAttemptedQuestions } = userDetails.actions;

export default userDetails.reducer;
