const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const factory = require("../kickstart-frontend/src/build/CampaignFactory.json");

const provider = new HDWalletProvider(
    <INSERT YOUR MNEMONIC HERE>,
    <INSERT YOUR INFURA PROJECT ADDRESS HERE>
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