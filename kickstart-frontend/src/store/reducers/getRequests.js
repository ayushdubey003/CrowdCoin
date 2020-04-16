import {GET_REQUESTS} from "../actionTypes";

const defaultState = {
    requests: []
}

export default function getRequests(state = defaultState, action){
    switch(action.type){
        case GET_REQUESTS:
            return {
                ...state,
                requests: action.requests
            };
        default:
            return state;
    }
}