pragma solidity ^0.6.6;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint mininmumContribution) public{
        Campaign newCampaign = new Campaign(mininmumContribution,msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }
    
    function getDeployedCampaigns() public view returns(address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{
    
    address public manager;
    uint public mininmumContribution;
    
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool completed;
        uint approvalCount;
        mapping(address=>bool) approvals;
    }
    Request[] public requests;
    
    mapping(address=>bool) approvers;
    uint public approversCount;
    
    constructor(uint minAmt,address creator) public{
        manager = creator;
        mininmumContribution = minAmt;
    }
    
    modifier isContributor() {
        require(msg.value>=mininmumContribution);
        _;
    }
    
    function contribute() public payable isContributor(){
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    modifier isManager(){
        require(msg.sender == manager);
        _;
    }
    
    function createRequest(string memory desc,uint val,address payable rec) public isManager(){
        Request memory request = Request({
            description: desc,
            value: val,
            recipient: rec,
            completed: false,
            approvalCount: 0
        });
        requests.push(request); 
    }
    
    function approveRequest(uint ind) public{
        require(approvers[msg.sender]);
        require(requests[ind].approvals[msg.sender] == false);
        requests[ind].approvals[msg.sender] = true;
        ++requests[ind].approvalCount;
    }
    
    function finalizeRequest(uint ind) public isManager{
        require(!requests[ind].completed);
        require(requests[ind].approvalCount > (approversCount/2));
        requests[ind].recipient.transfer(requests[ind].value);
        requests[ind].completed = true;
    }
}