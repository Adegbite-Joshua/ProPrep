import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../constants/constants';
import { updateShowLatestUpdate } from '../redux/userDetails';
import { useDispatch, useSelector } from 'react-redux';



const getNetworkInfo = () => {
    const dispatch = useDispatch();
    const [latestUpdate, setLatestUpdate] = useState({});
    let showLatestUpdate = useSelector((state: any)=>state.userDetails.showLatestUpdate)

    useEffect(() => {        
        if(showLatestUpdate){
            console.log('fetching')
            axios.get(`${serverUrl}/api/testing_route/user/get_latest_update`)
            .then((response)=>{
                console.log('fetched')
                setLatestUpdate(response.data)
                dispatch(updateShowLatestUpdate(false));
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }, [showLatestUpdate, latestUpdate]);

    return [showLatestUpdate, latestUpdate]
}

export default getNetworkInfo;

