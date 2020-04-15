const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const contractPath = path.resolve(__dirname,'contracts','Campaign.sol');
const buildPath = path.resolve(__dirname,'../','kickstart-frontend','src','build');
console.log(buildPath);

fs.emptyDirSync(buildPath);

const source = fs.readFileSync(contractPath,"utf-8");

var input = {
    language: 'Solidity',
    sources: {
      'Campaign.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
};
 
fs.ensureDirSync(buildPath);
let output = JSON.parse(solc.compile(JSON.stringify(input)));

const CampaignBuild = output['contracts']['Campaign.sol']['Campaign'];
const CampaignFactoryBuild = output['contracts']['Campaign.sol']['CampaignFactory'];

fs.writeFileSync(`${buildPath}//Campaign.json`,JSON.stringify(CampaignBuild));
fs.writeFileSync(`${buildPath}//CampaignFactory.json`,JSON.stringify(CampaignFactoryBuild));