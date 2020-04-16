import React,{Component} from "react";
import Header from "../containers/Header";
import {Link} from "react-router-dom";
import {getRequests} from "../store/actions/getRequests";
import {connect} from "react-redux";

class Requests extends Component{
    async componentDidMount(){
        await this.props.dispatch(getRequests(this.props.match.params.id));
    }
    render(){
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
        </div>
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps,null)(Requests);