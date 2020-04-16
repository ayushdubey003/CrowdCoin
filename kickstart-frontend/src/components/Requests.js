import React,{Component} from "react";
import Header from "../containers/Header";
import {Link} from "react-router-dom";
import {getRequests} from "../store/actions/getRequests";
import {connect} from "react-redux";
import web3 from "web3";

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
            <table>
                <tr>
                    <th className="one">ID</th>
                    <th className="two">Description</th>
                    <th className="three">Amount</th>
                    <th className="four">Recipient</th>
                    <th className="five">Approval Count</th>
                    <th className="six">Approve</th>
                    <th className="seven">Finalize</th>
                </tr>
                {this.props.requests}
            </table>
        </div>
    }
}

function mapStateToProps(state){
    const approversCount = state.getRequests.approversCount;
    let requests = state.getRequests.requests.map((value,index)=>{
        let val = web3.utils.fromWei(value.value,"ether");
        return <tr key={index}>
            <td className="one"><p>{index}</p></td>
            <td className="two"><p>{value.description}</p></td>
            <td className="three"><p>{val}</p></td>
            <td className="four"><p>{value.recipient}</p></td>
            <td className="five"><p>{`${value.approvalCount}/${approversCount}`}</p></td>
            <td className="six"><div class="table-button"><p>Approve</p></div></td>
            <td className="seven"><div class="table-button table-button-two"><p>Finalize</p></div></td>
        </tr>
    });
    
    let newState = {
        requests: requests
    }
    return newState;
}

export default connect(mapStateToProps,null)(Requests);