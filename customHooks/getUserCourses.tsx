import React, { Fragment, useLayoutEffect, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserDetails } from '../redux/userDetails';
import { userDetailsTypes } from '../types/userDetails';
import { courseCodes } from '../constants/constants';
import getUserDetails from './getUserDetails';



const getUserCourses = () => {
    const [userDetails] = getUserDetails();
    const [userCourses, setUserCourses] = useState([]);


    useEffect(() => {
        if(userDetails?.department && userCourses.length == 0){
            if(userDetails?.semester == 'firstSemester') {
                let localCourses = ['mth101', 'gns101', 'lib101']
                if(userDetails?.department == 'science'){
                    localCourses = [...localCourses, 'phy101', 'bio101', 'chm101']
                } else if(userDetails?.department == 'art'){
                    localCourses = [...localCourses, 'art101', 'law101', 'fjm101']
                }
                setUserCourses(localCourses);               
            } else {
                let localCourses = ['mth101', 'gns101', 'csc101']
                if(userDetails?.department == 'science'){
                    localCourses = [...localCourses, 'phy101', 'bio101', 'chm101']
                } else if(userDetails?.department == 'art'){
                    localCourses = [...localCourses, 'art101', 'law101', 'fjm101']
                }
                setUserCourses(localCourses);               
            }
        } else {
            console.log('no semester');
        }
        // (async () => {
        //     // if (!userCourses.fullName) {
        //     //     const localUserCourses = JSON.parse(await AsyncStorage.getItem('@user'));
        //     //     if (localUserCourses) {
        //     //         // dispatch(updateUserCourses(localUserCourses));
        //     //         setUserCourses(localUserCourses);
        //     //     }
        //     // }
        // })();
    }, [])

    return [userCourses]
}

export default getUserCourses;

