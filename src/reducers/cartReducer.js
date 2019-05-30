import {  SET_CART } from '../actions/types';

const initialState = {
        cart: []
}


export default function(state = initialState, action){
    switch(action.type){
        case SET_CART:
            return {
                ...state,
                cart: [...action.payload]
                
            };
            default: 
                return state;
    }
}



