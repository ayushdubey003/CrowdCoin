const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const factory = require("../kickstart-frontend/src/build/CampaignFactory.json");

const provider = new HDWalletProvider(
    "earth since banner hard face ordinary merge color magnet cloth woman twist",
    "https://rinkeby.infura.io/v3/b01d4ab35099466aa23bc12a4ed8f852"
);

const web3 = new Web3(provider);
let accounts;
async function deploy(){
    accounts = await web3.eth.getAccounts();
    const deployed = await new web3.eth.Contract(factory.abi).
        deploy({
            data: "0x"+factory.evm.bytecode.object
        }).
        send({
            from: accounts[0],
            gas: "1000000"
        })
    console.log(await deployed.options.address);
}

deploy();