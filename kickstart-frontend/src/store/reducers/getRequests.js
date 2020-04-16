import {GET_REQUESTS} from "../actionTypes";

const defaultState = {
    requests: [],
    approversCount: 0
}

export default function getRequests(state = defaultState, action){
    switch(action.type){
        case GET_REQUESTS:
            return {
                ...state,
                requests: action.requests,
                approversCount: action.approversCount
            };
        default:
            return state;
    }
}