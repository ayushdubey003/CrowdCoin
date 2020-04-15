import initWeb3 from "../services/web3";
import {abi} from "../build/CampaignFactory.json";

export default async function factory(){
    const web3 = await initWeb3();
    let factory = await new web3.eth.Contract(
            abi,
            "0x1aFc6248020DA6723D5f2D2bfDc4D8735ed765c9",
        );
    return factory;
}