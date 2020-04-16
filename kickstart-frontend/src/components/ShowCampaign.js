import React,{Component} from "react";
import Header from "../containers/Header";
import "../Home.css";
import {getCampaignDetails} from "../store/actions/getCampaignDetails";
import {connect} from "react-redux";
import initWeb3 from "../services/web3";
import {abi} from "../build/Campaign.json";
import {Link} from "react-router-dom";

class ShowCampaign extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
            handlingTransaction: false,
            errorMessage: "",
            errorVisible: false,
            loading: true
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillReceiveProps(){
        this.setState({
            loading: false
        });
    }

    handleInputChange(e){
        if(isFinite(e.target.value)){
            this.setState({
                value: e.target.value
            });
        }
    }

    async handleFormSubmit(e){
        e.preventDefault();
        const contribution = this.state.value;
        
        if(contribution.length>0){
            const web3Instance = await initWeb3();
            const accounts = await web3Instance.eth.getAccounts();
            const campaignInstance = await new web3Instance.eth.Contract(
                abi,
                this.props.match.params.id    
            );
            try{
                this.setState({
                    handlingTransaction: true
                });
                const weiValue = web3Instance.utils.toWei(contribution,'ether');

                const thash = await campaignInstance.methods.contribute().send({
                    from: accounts[0],
                    value: weiValue
                });
                
                const id = this.props.match.params.id;
                this.props.dispatch(getCampaignDetails(id));
            }
            catch(e){
                this.setState({
                    errorMessage: e.message,
                    errorVisible: true
                });
                setTimeout( () => {
                    this.setState({
                        errorMessage: "",
                        errorVisible: false
                    });
                },3000);
            }
            finally{
                this.setState({
                    handlingTransaction: false
                });
            }
        }
        else{
            this.setState({
                errorMessage: "Minimum Contribution field cannot be empty",
                errorVisible: true
            });
            setTimeout( () => {
                this.setState({
                    errorMessage: "",
                    errorVisible: false
                });
            },3000);
        }
    }

    async componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch(getCampaignDetails(id));
    }

    render(){
        const {minimumContribution,balance,approversCount,requestsLength,manager} = this.props.getCampaignDetails;
        return <div className="show-campaigns">
            <Header></Header>
            <h2>Campaign Show</h2>
            <div className="show-campaigns-main">
                <div className="card-grid"  style={this.state.loading?{display:"none"}:{display:"flex"}}>
                    <div className="card-row">
                        <div className="card">
                            <h1>{manager}</h1>
                            <p className="first-p" style={{color: "#a9a9a9"}}>Address of Manager</p>
                            <p>The manager created this campaign and can create requests to withdraw money</p>
                        </div>
                        <div className="card">
                            <h1>{minimumContribution}</h1>
                            <p className="first-p" style={{color: "#a9a9a9"}}>Minimum Contribution(wei)</p>
                            <p>You must contribute at least this much wei to become a contributor</p>
                        </div>
                    </div>
                    
                    <div className="card-row">
                        <div className="card">
                            <h1>{requestsLength}</h1>
                            <p className="first-p" style={{color: "#a9a9a9"}}>Number of Requests</p>
                            <p>A request tries to withdraw money from the contract. Requests must be approved by approvers.</p>
                        </div>
                        <div className="card">
                            <h1>{approversCount}</h1>
                            <p className="first-p" style={{color: "#a9a9a9"}}>Number of Approvers</p>
                            <p>Number of people who have already donated to this campaign</p>
                        </div>
                    </div>

                    <div className="card-row">
                        <div className="card">
                            <h1>{balance}</h1>
                            <p className="first-p" style={{color: "#a9a9a9"}}>Campaign Balance(ether)</p>
                            <p>The balance is how much money this campaign has left to spend</p>
                        </div>
                    </div>

                    <Link to={`/campaigns/${this.props.match.params.id}/requests`}>
                        <div className="button">
                            <p >View Requests</p>
                        </div>
                    </Link>

                </div>
                <div className="loader-container" style={this.state.loading?{display: "flex"}:{display:" none"}}>
                    <div className="loader"></div>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                    <p>Amount to Contribute</p>
                    <div className="input-box">
                        <input type="text" value={this.state.value} onChange={this.handleInputChange} placeholder="Contribute"></input>
                        <div style={{width: "15%"}}>ether</div>
                    </div>
                    <div className="error-message" style={this.state.errorVisible?{display: "block"}:{display: "none"}} >{this.state.errorMessage}</div>
                    <div className="button" onClick={this.handleFormSubmit}>
                        <p style={this.state.handlingTransaction?{display: "none"}:{display: "block"}}>Contribute!</p>
                        <div className="loader" style={this.state.handlingTransaction?{display: "block"}:{display: "none"}}></div>
                    </div>
                </form>
            </div>
        </div>
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps,null)(ShowCampaign);