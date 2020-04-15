import {LOAD_ACCOUNTS} from "../actionTypes";

const defaultState = {
    account : 0x0
}

export default function loadAccounts(state=defaultState,action){
    switch(action.type){
        case LOAD_ACCOUNTS:
            return {
                ...state,
                account: action.account
            };
        default:
            return state;
    }
}