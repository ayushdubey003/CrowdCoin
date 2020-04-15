import initWeb3 from "../services/web3";
import {abi} from "../build/CampaignFactory.json";

export default async function factory(){
    const web3 = await initWeb3();
    let factory = await new web3.eth.Contract(
            abi,
            "0x1F435E08a8937B31DeE764B32925FC3E7a4338c9",
        );
    return factory;
}