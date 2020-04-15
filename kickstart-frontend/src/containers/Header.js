import React,{Component} from "react";
import {Link} from "react-router-dom";
import "../Home.css";

class Header extends Component{
    render(){
        return <div className="header">
            <div className="left-nav">
                <Link to="/">CrowdCoin</Link>
            </div>
            <div className="right-nav">
                <Link to="/campaigns">Campaigns</Link>
                <Link to="/campaigns/new">+</Link>
            </div>
        </div>
    }
}

export default Header;