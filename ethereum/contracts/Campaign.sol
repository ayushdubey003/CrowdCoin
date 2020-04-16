pragma solidity ^0.6.6;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint mininmumContribution) public{
        address newCampaign = address(new Campaign(mininmumContribution,msg.sender));
        deployedCampaigns.push(newCampaign);
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
        if(!approvers[msg.sender])
            approversCount++;
        approvers[msg.sender] = true;
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
    
    function getCampaignDetails() public view returns(uint,uint,uint,uint,address){
        return (
            mininmumContribution,
            address(this).balance,
            approversCount,
            requests.length,
            manager
        );
    }
    
    function getRequestsCount() public view returns (uint){
        return (requests.length);
    }
}