import {GET_REQUESTS} from "../actionTypes";
import {abi} from "../../build/Campaign.json";
import initWeb3 from "../../services/web3";

export function getRequests(id){
    return async dispatch=>{
        const web3Instance = await initWeb3();
        const Campaign = await new web3Instance.eth.Contract(
            abi,
            id
        );
        const reqLength = await Campaign.methods.getRequestsCount().call();
        let requests = [];
        for(let i=0;i<reqLength;i++){
            const req = await Campaign.methods.requests(i).call();
            requests.push(req);
        }
        const approversCount = await Campaign.methods.approversCount().call();
        dispatch({
            type: GET_REQUESTS,
            requests: requests,
            approversCount: approversCount
        })
    }
}