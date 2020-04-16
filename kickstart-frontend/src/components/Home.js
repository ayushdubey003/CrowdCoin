import React,{Component} from 'react';
import Header from "../containers/Header";
import "../Home.css";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            "loading": true
        }
    }

    render(){
        return <div className="home">
            <Header></Header>
            <h2>Open Campaigns</h2>
            <div className="main-body">
                <div className="main-body-left">
                    {this.props.campaigns}
                </div>
                {/* <div className="loader-container" style={this.state.loading?{display: "flex"}:{display:" none"}}>
                    <div className="loader"></div>
                </div> */}
                <Link to="/campaigns/new">
                    <div className="main-body-right">
                        <div className="plus-border">+</div>
                        <p>Create Campaign</p>
                    </div>
                </Link>
            </div>
        </div>
    }
}

function mapStateToProps(state){
    let campaigns =  state.deployedCampaigns.campaigns.map((value,index)=>{
        return  <div className="list" id={index} key={index} style={{marginBottom: "16px"}}>
                    {value}
                    <Link to={`/campaigns/${value}`}><p id={index} style={{margin:"0",marginTop:"8px"}}>View Campaign</p></Link>
                </div>
    });
    let newState = {
        campaigns: campaigns,
    }
    return newState;
}

export default connect(mapStateToProps,null)(Home);