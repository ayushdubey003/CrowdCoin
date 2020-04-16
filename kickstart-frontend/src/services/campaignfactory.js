import initWeb3 from "../services/web3";
import {abi} from "../build/CampaignFactory.json";

export default async function factory(){
    const web3 = await initWeb3();
    let factory = await new web3.eth.Contract(
            abi,
            "0x473034FB5E8F09E3Bc4F52DEd5ac39D61e9002DF",
        );
    return factory;
}