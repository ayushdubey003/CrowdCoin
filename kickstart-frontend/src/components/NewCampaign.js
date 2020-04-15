import React,{Component} from "react";
import Header from "../containers/Header";
import "../Home.css";
import factory from "../services/campaignfactory";
import initWeb3 from "../services/web3";
import {connect} from "react-redux";

class NewCampaign extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
            errorMessage: "",
            errorVisible: false
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
                const thash = await factoryInstance.methods.createCampaign(minContribution).send({
                    from: accounts[0],
                });
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
                <input type="text" value={this.state.value} onChange={this.handleInputChange} placeholder="Minimum Contribution(in Wei)"></input>
                <div className="error-message" style={this.state.errorVisible?{display: "block"}:{display: "none"}} >{this.state.errorMessage}</div>
                <div className="button">
                    <p >Create!</p>
                    {/* <div className="loader"></div> */}
                </div>
            </form>
        </div>
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps,null)(NewCampaign);