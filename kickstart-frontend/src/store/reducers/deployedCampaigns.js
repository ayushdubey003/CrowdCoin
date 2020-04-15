import {DEPLOYED_CAMPAIGNS} from "../actionTypes";

const defaultState= {
    campaigns: []
}

export default function deployedCampaigns(state=defaultState,action){
    switch(action.type){
        case DEPLOYED_CAMPAIGNS:
            return {
                ...state,
                campaigns: action.campaigns
            }
        default:
            return state;
    }
}