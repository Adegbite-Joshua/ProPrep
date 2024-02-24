import { createSlice } from '@reduxjs/toolkit';

export const userDetails = createSlice({
  name: 'userDetails',
  initialState: {
    details: {},
    showLatestUpdate: true,
    attemptedQuestions: {

    }
  },
  reducers: {
    updateUserDetails: (state, actions) => {
      state.details = actions.payload.userDetails;
    },
    updateShowLatestUpdate: (state, actions) => {
      state.showLatestUpdate = actions.payload;
    },
    updateAttemptedQuestions: (state, actions) => {
      const { courseCode, questions } = actions.payload;
      state.attemptedQuestions[courseCode] = state.attemptedQuestions[courseCode] || [];
      state.attemptedQuestions[courseCode] = [...new Set(state.attemptedQuestions[courseCode].concat(questions))];
    },
  },
});

export const { updateUserDetails, updateShowLatestUpdate, updateAttemptedQuestions } = userDetails.actions;

export default userDetails.reducer;
