import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import * as queryString from 'query-string';

import AuthService from '../../actions/user'
import Spinner from "../spinner/Spinner";


const TwitterAuth = () => {

    const navigate = useNavigate();

    const getCodeUrl = async() => {

        const urlParams = queryString.parse(window.location.search);    
        if (urlParams.error) {
            console.log(`An error occurred: ${urlParams.error}`);
        } else {  
            console.log(urlParams);
            const {error, msg} = await AuthService.twitterlogin(urlParams.code)    
            if (error) {                           
                Notify.failure(msg);
                navigate('/')
            }else{
                Notify.success('Login Success');
                navigate('/profile')
            }             
        }
    }

    useEffect(() => {
        console.log('useEffect')
        getCodeUrl()
    }, [])

    return(
        <Spinner />
    )
}


export default TwitterAuth