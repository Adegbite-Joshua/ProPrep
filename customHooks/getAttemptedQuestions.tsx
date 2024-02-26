import React, { useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../constants/constants';
import { updateAttemptedQuestions } from '../redux/userDetails';
import { useDispatch, useSelector } from 'react-redux';
import getUserDetails from './getUserDetails';

const getAttemptedQuestionss = async (startingNumber, endingNumber, courseCode, userDetails, dispatch) => {
  try {
    let reqBody = {
      startingNumber,
      endingNumber,
      courseCode,
      userId: userDetails?._id,
    };

    const response = await axios.post(`${serverUrl}/api/testing_route/user/get_attempted_questions`, reqBody);

    const newAttemptedQuestions = response.data;

    dispatch(updateAttemptedQuestions({ courseCode, questions: newAttemptedQuestions }));
  } catch (error) {
    console.error('Error fetching attempted questions:', error);
  }
};

const getAttemptedQuestions = (startingNumber, endingNumber, courseCode) => {
  const dispatch = useDispatch();
  const userDetails = getUserDetails();
  const attemptedQuestions = useSelector((state: any) => state.userDetails.attemptedQuestions[courseCode] || []);

  useEffect(() => {
    // Add your conditions here if needed
    getAttemptedQuestionss(startingNumber, endingNumber, courseCode, userDetails, dispatch);
  }, [startingNumber, endingNumber, courseCode, dispatch, userDetails]);

  return [attemptedQuestions];
};

export default getAttemptedQuestions;














// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import { serverUrl } from '../constants/constants';
// import { updateShowLatestUpdate } from '../redux/userDetails';
// import { useDispatch, useSelector } from 'react-redux';
// import getUserDetails from './getUserDetails';


// const getAttemptedQuestions = (startingNumber, endingNumber, courseCode) => {
//     const dispatch = useDispatch();
//     const [userDetails] = getUserDetails();

//     let attemptedQuestions = useSelector((state: any)=>state.userDetails.attemptedQuestions)

//     useEffect(() => {        
//         // if(!attemptedQuestions){
//             let reqBody = {
//                 startingNumber,
//                 endingNumber,
//                 courseCode,
//                 userId: userDetails?._id
//             };
//             console.log('fetching')
//             axios.post(`${serverUrl}/api/testing_route/user/save_attempted_questions`, reqBody)
//             .then((response)=>{
//                 console.log(response)
//                 // dispatch(updateShowLatestUpdate(false));
//             })
//             .catch((err)=>{
//                 console.log(err);
//             })
//         // }
//     }, [startingNumber, endingNumber]);

//     return [attemptedQuestions]
// }

// export default getAttemptedQuestions;
