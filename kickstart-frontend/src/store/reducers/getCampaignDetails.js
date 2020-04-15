import {GET_CAMPAIGN_DETAILS} from "../actionTypes";

const defaultState = {
    minimumContribution: 0,
    balance: 0.0,
    approversCount: 0,
    requestsLength: 0,
    manager: 0x0,
}

export default function getCampaignDetails(state=defaultState, action){
    switch(action.type){
        case GET_CAMPAIGN_DETAILS:
            return {
                ...state,
                minimumContribution: action.minimumContribution,
                balance: action.balance,
                approversCount: action.approversCount,
                requestsLength: action.requestsLength,
                manager: action.manager
            };
        default:
            return state;
    }
}