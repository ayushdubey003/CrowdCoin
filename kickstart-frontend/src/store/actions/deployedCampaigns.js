import {DEPLOYED_CAMPAIGNS} from "../actionTypes";
import factory from "../../services/campaignfactory";

export function deployedCampaigns(){
    return async function(dispatch){
        const factoryInstance = await factory();
        const campaigns = await factoryInstance.methods.getDeployedCampaigns().call();
        dispatch({
            type: DEPLOYED_CAMPAIGNS,
            campaigns: campaigns
        })
    }
}