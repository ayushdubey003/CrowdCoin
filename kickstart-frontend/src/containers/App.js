import React from 'react';
import {Switch,Route,Link} from "react-router-dom";
import Home from "../components/Home";
import {connect} from 'react-redux';
import {loadAccounts} from "../store/actions/loadAccounts";
import {deployedCampaigns} from "../store/actions/deployedCampaigns";
import Error from "../components/Error";
import NewCampaign from "../components/NewCampaign";

class App extends React.Component{

  constructor(props){
    super(props);
  }

  async componentDidMount(){
    // await this.props.dispatch(loadAccounts());
    await this.props.dispatch(deployedCampaigns());
  }

  render(){
    return (
      <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/campaigns/new" component={NewCampaign} exact></Route>
          <Route path="/*" component={Error}></Route>
      </Switch>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps,null)(App);