import {combineReducers} from "redux"; 
import loadAccounts from "./loadAccounts";
import deployedCampaigns from "./deployedCampaigns";
import getCampaignDetails from "./getCampaignDetails";
import getRequests from "./getRequests";

const rootReducer = combineReducers({
    loadAccounts,
    deployedCampaigns,
    getCampaignDetails,
    getRequests
});

export default rootReducer;