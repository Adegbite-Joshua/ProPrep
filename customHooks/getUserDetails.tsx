import React, { Fragment, useLayoutEffect, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserDetails } from '../redux/userDetails';
import { userDetailsTypes } from '../types/userDetails';
import { courseCodes } from '../constants/constants';


// const dispatch = useDispatch();
// import { updateUserDetails } from '../redux/userDetails';
// import { useDispatch, useSelector } from 'react-redux';



const getUserDetails = ():[userDetailsTypes] => {
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState<userDetailsTypes>({})

    useEffect(() => {
        (async () => {
            // if (!userDetails.fullName) {
                const localUserDetails = JSON.parse(await AsyncStorage.getItem('@user'));
                const semester = await AsyncStorage.getItem('@semester') || 'firstSemester';
                if (localUserDetails) {
                    // dispatch(updateUserDetails(localUserDetails));
                    setUserDetails({...localUserDetails, semester});
                }
            // }
        })();
    }, [])

    return [userDetails]
}

export default getUserDetails

