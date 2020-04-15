import {GET_CAMPAIGN_DETAILS} from "../actionTypes";
import initWeb3 from "../../services/web3";
import {abi} from "../../build/Campaign.json";

export function getCampaignDetails(id){
    return async dispatch =>{
        const web3Instance = await initWeb3();
        const campaignInstance = await new web3Instance.eth.Contract(
            abi,
            id    
        );
        const res = await campaignInstance.methods.getCampaignDetails().call();
        dispatch({
            type: GET_CAMPAIGN_DETAILS,
            minimumContribution: res[0],
            balance: web3Instance.utils.fromWei(res[1],'ether'),
            approversCount: res[2],
            requestsLength: res[3],
            manager: res[4]
        });
    };
}