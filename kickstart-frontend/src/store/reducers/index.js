import {combineReducers} from "redux"; 
import loadAccounts from "./loadAccounts";
import deployedCampaigns from "./deployedCampaigns";

const rootReducer = combineReducers({
    loadAccounts,
    deployedCampaigns
});

export default rootReducer;