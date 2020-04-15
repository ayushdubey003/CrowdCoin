import React,{Component} from "react";
import Header from "../containers/Header";
import "../Home.css";
import factory from "../services/campaignfactory";
import initWeb3 from "../services/web3";
import {connect} from "react-redux";
import {deployedCampaigns} from "../store/actions/deployedCampaigns";

class NewCampaign extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
            errorMessage: "",
            errorVisible: false,
            handlingTransaction: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
        const minContribution = this.state.value;
        if(minContribution.length>0){
            const factoryInstance = await factory();
            const web3Instance = await initWeb3();
            const accounts = await web3Instance.eth.getAccounts();
            try{
                this.setState({
                    handlingTransaction: true
                });
                const thash = await factoryInstance.methods.createCampaign(minContribution).send({
                    from: accounts[0],
                });
                await this.props.dispatch(deployedCampaigns());
                this.props.history.push("/");
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

    render(){
        return <div className="new-campaign-page">
            <Header></Header>
            <h2>Create a Campaign</h2>
            <h3>Minimum Contribution</h3>
            <form onSubmit={this.handleFormSubmit}>
                <div className="input-box">
                    <input type="text" value={this.state.value} onChange={this.handleInputChange} placeholder="Minimum Contribution(in Wei)"></input>
                    <div>wei</div>
                </div>
                <div className="error-message" style={this.state.errorVisible?{display: "block"}:{display: "none"}} >{this.state.errorMessage}</div>
                <div className="button" onClick={this.handleFormSubmit}>
                    <p style={this.state.handlingTransaction?{display: "none"}:{display: "block"}}>Create!</p>
                    <div className="loader" style={this.state.handlingTransaction?{display: "block"}:{display: "none"}}></div>
                </div>
            </form>
        </div>
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps,null)(NewCampaign);