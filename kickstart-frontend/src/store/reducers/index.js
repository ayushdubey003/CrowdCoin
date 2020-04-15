import {combineReducers} from "redux"; 
import loadAccounts from "./loadAccounts";
import deployedCampaigns from "./deployedCampaigns";
import getCampaignDetails from "./getCampaignDetails";

const rootReducer = combineReducers({
    loadAccounts,
    deployedCampaigns,
    getCampaignDetails
});

export default rootReducer;