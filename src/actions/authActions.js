import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../helperFunctions';
import store from '../store';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export function registerUser(userData){
    let url = '/register';
    let postData = userData;

    axios({method: 'post', url:url,data:postData})
        .then(response =>{
            console.log(response)
            login(response.data);
            window.location.href = '/';
        })
        .catch(error => {
            store.dispatch({
                type:GET_ERRORS,
                payload: error.response.data
            })
        })
}

export function login(userLoginData){
    let url = '/login';
    let postData = userLoginData;

    axios({method: 'post',url:url,data:postData})
        .then(response=>{
            const { token } = response.data;
            localStorage.setItem('jwtToken',token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            store.dispatch({
                type:SET_CURRENT_USER,
                payload:decoded,
            })
        })
        .catch(error=>{
            store.dispatch({
            type:GET_ERRORS,
            payload:error.response.data,
            })
        })
}


export function logoutUser(){
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    store.dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    })
}