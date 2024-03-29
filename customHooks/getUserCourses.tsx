import React, { Fragment, useLayoutEffect, useState, useEffect } from 'react'
import getUserDetails from './getUserDetails';



const getUserCourses = () => {
    const [userDetails] = getUserDetails();
    const [userCourses, setUserCourses] = useState([]);

    useEffect(() => {
        if(userDetails?.department && userCourses.length == 0){
            if(userDetails?.semester == 'firstSemester') {
                let localCourses = [{courseCode: 'mth101', department: 'general'}, {courseCode: 'gns101', department: 'general'}, {courseCode: 'lib101', department: 'general'}]
                if(userDetails?.department == 'science'){
                    localCourses = [...localCourses, {courseCode: 'phy101', department: 'science'}, {courseCode: 'bio101', department: 'science'}, {courseCode: 'chm101', department: 'science'}, {courseCode: 'chm191', department: 'science'}]
                } else if(userDetails?.department == 'art'){
                    localCourses = [...localCourses, {courseCode: 'art101', department: 'art'}, {courseCode: 'law101', department: 'art'}, {courseCode: 'fjm101', department: 'art'}]
                }
                setUserCourses(localCourses);               
            } else {
                let localCourses = [{courseCode: 'mth101', department: 'general'}, {courseCode: 'gns101', department: 'general'}, {courseCode: 'lib101', department: 'general'}]
                if(userDetails?.department == 'science'){
                    localCourses = [...localCourses, {courseCode: 'phy101', department: 'science'}, {courseCode: 'bio101', department: 'science'}, {courseCode: 'chm101', department: 'science'}, {courseCode: '191', department: 'science'}, {courseCode: 'bio103', department: ''}, {courseCode: 'phy103', department: ''}]
                } else if(userDetails?.department == 'art'){
                    localCourses = [...localCourses, {courseCode: 'art101', department: 'art'}, {courseCode: 'law101', department: 'art'}, {courseCode: 'fjm101', department: 'art'}]
                }
                setUserCourses(localCourses);               
            }
        }     
    }, [userDetails])

    return [userCourses]
}

export default getUserCourses;

