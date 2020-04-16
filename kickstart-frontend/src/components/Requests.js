import React,{Component} from "react";
import Header from "../containers/Header";
import {Link} from "react-router-dom";
import {getRequests} from "../store/actions/getRequests";
import {connect} from "react-redux";
import web3 from "web3";
import initWeb3 from "../services/web3";
import {abi} from "../build/Campaign.json";

class Requests extends Component{

    constructor(props){
        super(props);
        this.approveRequest = this.approveRequest.bind(this);
        this.finalizeRequest = this.finalizeRequest.bind(this);
        this.state = {
            "loading": true,
            "errorVisible": false,
            'errorMessage': "",
            requests: []
        }
    }

    async approveRequest(e){
        const uid = e.target.id;
        const id = this.props.match.params.id;
        const web3Instance = await initWeb3();
        const CampaignInstance = await new web3Instance.eth.Contract(
            abi,
            id
        );
        const accounts = await web3Instance.eth.getAccounts();
        try{
            this.setState({
                "loading": true
            })
            await CampaignInstance.methods.approveRequest(uid).send({
                from: accounts[0]
            });
            await this.props.dispatch(getRequests(id));
        }
        catch(e){
            this.setState({
                "loading": false,
                "errorVisible": true,
                "errorMessage": e.message
            });
            setTimeout(()=>{
                this.setState({
                    "errorVisible": false,
                    "errorMessage": ""
                })
            },3000);
        }
    }

    async finalizeRequest(e){
        const uid = e.target.id;
        const id = this.props.match.params.id;
        const web3Instance = await initWeb3();
        const CampaignInstance = await new web3Instance.eth.Contract(
            abi,
            id
        );
        const accounts = await web3Instance.eth.getAccounts();
        try{
            this.setState({
                "loading": true
            })
            await CampaignInstance.methods.finalizeRequest(uid).send({
                from: accounts[0]
            });
            await this.props.dispatch(getRequests(id));
        }
        catch(e){
            this.setState({
                "loading": false,
                "errorVisible": true,
                "errorMessage": e.message
            });
            setTimeout(()=>{
                this.setState({
                    "errorVisible": false,
                    "errorMessage": ""
                })
            },3000);
        }
    }

    async componentDidMount(){
        await this.props.dispatch(getRequests(this.props.match.params.id));
    }

    componentWillReceiveProps(){
        this.setState({
            "loading": false
        });
    }

    render(){
        const approversCount = this.props.approversCount;
        let requests = this.props.requests.map((value,index)=>{
            let val = web3.utils.fromWei(value.value,"ether");
            console.log(value.completed);
            return <tr key={index}>
                <td className={value.completed?"one modified":"one"}><p>{index}</p></td>
                <td className={value.completed==false?"two modified":"two"}><p>{value.description}</p></td>
                <td className={value.completed?"three modified":"three"}><p>{val}</p></td>
                <td className={value.completed?"four modified":"four"}><p>{value.recipient}</p></td>
                <td className={value.completed?"five modified":"five"}><p>{`${value.approvalCount}/${approversCount}`}</p></td>
                <td className="six" id={index} style={value.completed?{opacity:"0"}:{opacity:"1"}}><div className="table-button" id={index} onClick={this.approveRequest}><p id={index} onClick={this.approveRequest}>Approve</p></div></td>
                <td className="seven" id={index} style={value.completed?{opacity:"0"}:{opacity:"1"}}><div className="table-button table-button-two" id={index} onClick={this.finalizeRequest}><p id={index} onClick={this.finalizeRequest}>Finalize</p></div></td>
            </tr>
        });
        return <div className="requests">
            <Header></Header>
            <h2>Requests</h2>
            <div className="link-container">
                <Link to={`/campaigns/${this.props.match.params.id}/requests/new`}>
                    <div className="button">
                        <p>Add Request</p>
                    </div>
                </Link>
            </div>
            <table style={this.state.loading?{display: "none"}:{display:"block"}}>
                <tr>
                    <th className="one">ID</th>
                    <th className="two">Description</th>
                    <th className="three">Amount</th>
                    <th className="four">Recipient</th>
                    <th className="five">Approval Count</th>
                    <th className="six">Approve</th>
                    <th className="seven">Finalize</th>
                </tr>
                {requests}
            </table>
            <div className="loader-container" style={this.state.loading==false?{display: "none"}:{display:"flex"}}>
                <div className="loader"></div>
            </div>
            <div className="error-message" style={this.state.errorVisible?{display: "block"}:{display: "none"}} >{this.state.errorMessage}</div>
        </div>
    }
}

function mapStateToProps(state){
    
    let newState = {
        requests: state.getRequests.requests,
        approversCount: state.getRequests.approversCount
    }
    return newState;
}

export default connect(mapStateToProps,null)(Requests);