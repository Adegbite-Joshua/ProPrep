// getAttemptedQuestions.js

import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { serverUrl } from '../constants/constants';
import { updateAttemptedQuestions } from '../redux/userDetails';
import { useDispatch, useSelector } from 'react-redux';
import getUserDetails from './getUserDetails';

const getAttemptedQuestions = () => {
  const dispatch = useDispatch();
  const [userDetails] = getUserDetails();

  let attemptedQuestions =  useSelector((state: any) => state.userDetails.attemptedQuestions) || [];

  const fetchAttemptedQuestions = useCallback(async (startingNumber, endingNumber) => {
    try {
      let reqBody = {
        startingNumber,
        endingNumber,
        userId: userDetails?._id,
      };
      
      const response = await axios.post(`${serverUrl}/api/testing_route/user/get_attempted_questions`, reqBody);
      
      const newAttemptedQuestions = response.data;
      dispatch(updateAttemptedQuestions({ questions: newAttemptedQuestions }));
    } catch (error) {
      console.error('Error fetching attempted questions:', error);
    }
  }, [dispatch, userDetails]);

  return {
    fetchAttemptedQuestions,
    attemptedQuestions,
  };
};

export default getAttemptedQuestions;