import {LOAD_ACCOUNTS} from "../actionTypes";
import initWeb3 from "../../services/web3";

export function loadAccounts(){
    return async function(dispatch){
        const web3 = await initWeb3();
        console.log(await web3.eth);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        dispatch({
            type: LOAD_ACCOUNTS,
            account: accounts[0]
        });
    }
}