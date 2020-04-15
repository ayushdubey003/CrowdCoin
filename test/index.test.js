const ganache = require('ganache-cli');
const fs = require('fs-extra');
const path = require('path');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const buildPath = path.resolve(__dirname,"../","ethereum/build");
const assert = require("assert");
const Campaign = require("../ethereum/build/Campaign.json");
const CampaignFactory = require("../ethereum/build/CampaignFactory.json");

let account;
let CampaignFactoryDeployed;
let campaign;
let campaignAddress;

beforeEach(async ()=>{
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    CampaignFactoryDeployed = await new web3.eth.Contract(CampaignFactory.abi).
                                deploy({
                                    data: "0x"+CampaignFactory.evm.bytecode.object
                                }).
                                send({
                                    "from": account,
                                    "gas": 1000000
                                });
    await CampaignFactoryDeployed.methods.createCampaign('0').send({
            'from': account,
            'gas': 1000000
        });
    
    [campaignAddress] = await CampaignFactoryDeployed.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(Campaign.abi,campaignAddress);
    console.log(campaign);
});

describe('CampaignTest',()=>{
    it('creates a new campaign',async ()=>{
        
        // console.log(CampaignDeployed);
        // assert.ok(CampaignDeployed);
    });
})