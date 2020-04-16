import React,{Component} from "react";
import Header from "../containers/Header";
import {Link} from "react-router-dom";

export default class Requests extends Component{
    render(){
        return <div className="requests">
            <Header></Header>
            <h2>Requests</h2>
            <Link to={`/campaigns/${this.props.match.params.id}/requests/new`}>
                <div className="button">
                    <p>Add Request</p>
                </div>
            </Link>
        </div>
    }
}