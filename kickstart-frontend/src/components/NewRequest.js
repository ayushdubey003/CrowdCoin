import React,{Component} from "react";
import Header from "../containers/Header";
import {connect} from "react-redux";
import initWeb3 from "../services/web3";
import {abi} from "../build/Campaign.json";

class NewRequest extends Component{

    constructor(props){
        super(props);
        this.state = {
            handlingTransaction: false,
            description:"",
            value: "",
            recipient: "",
            errorVisible: false,
            errorMessage: ""
        }
        this.handleFormChanges = this.handleFormChanges.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    async handleFormSubmit(e){
        e.preventDefault();
        const {description,value,recipient} = {...this.state};
        if(description.length>0&&value.length>0&&isFinite(value)&&recipient.length>0)
        {
            try{
                this.setState({
                    handlingTransaction: true
                })
                const web3Instance = await initWeb3();
                const accounts = await web3Instance.eth.getAccounts();
                const campaignInstance = await new web3Instance.eth.Contract(abi,this.props.match.params.id);
                await campaignInstance.methods.createRequest(description,
                    web3Instance.utils.toWei(value,'ether'),
                    recipient).send({
                        from: accounts[0]
                    });
                this.props.history.push(`\campaigns\${this.props.match.params.id}\requests`); 
            }
            catch(e){
                this.setState({
                    errorVisible: true,
                    errorMessage: e.message,
                    handlingTransaction: false
                });
                setTimeout(()=>{
                    this.setState({
                        errorVisible: false,
                        errorMessage: ""
                    });
                },3000);
            }
        }
        else{
            this.setState({
                errorVisible: true,
                errorMessage: "One or more fields appear to be empty or have invalid inputs"
            });
            setTimeout(()=>{
                this.setState({
                    errorVisible: false,
                    errorMessage: ""
                });
            },3000);
            return;
        }
    }

    handleFormChanges(e){
        const cn=e.target.className;
        if(cn == "value"){
            if(!isFinite(e.target.value))
                return;
        }
        const value = e.target.value;
        switch(cn){
            case "description":
                this.setState({
                    "description": value
                });
                return;
            case "value":
                this.setState({
                    "value": value
                });
                return;
            case "recipient":
                this.setState({
                    "recipient": value
                });
                return;
            default:
                return;
        }
    }

    render(){
        return <div className="new-request">
            <Header></Header>
            <h2>Create a Request</h2>
            <form onSubmit={this.handleFormSubmit}>
                <div className="input-box-new">
                    <p>Description</p>
                    <input className="description" type="text" value={this.state.description} onChange={this.handleFormChanges}></input>
                    <p>Value in Ether</p>
                    <input className="value" type="text" value={this.state.value} onChange={this.handleFormChanges}></input>
                    <p>Recipient</p>
                    <input className="recipient" type="text" value={this.state.recipient} onChange={this.handleFormChanges}></input>
                    <div className="error-message" style={this.state.errorVisible?{display: "block"}:{display: "none"}} >{this.state.errorMessage}</div>
                    <div className="button" onClick={this.handleFormSubmit}>
                        <p style={this.state.handlingTransaction?{display: "none"}:{display: "block"}}>Create!</p>
                        <div className="loader" style={this.state.handlingTransaction?{display: "block"}:{display: "none"}}></div>
                    </div>
                </div>
            </form>
        </div>
    }
}

function mapStatetoProps(state){
    const {getCampaignDetails} = {...state};
    return getCampaignDetails;
}

export default connect(mapStatetoProps,null)(NewRequest);