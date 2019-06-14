import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ParseRoute from "../routes/parse";
import {ROUTE_PRODUCTS_IN_DEPARTMENT} from "../routes/routes";
import { ROUTE_HOME } from '../constant/const';

export default class Header extends Component{

    state = {
        cartItems:[]
    };

    componentDidMount(){
        let {cartItems} = this.props;
        cartItems = cartItems || [];
        this.setState({cartItems});
    }

    componentWillReceiveProps({cartItems}){
        cartItems = cartItems || [];
        this.setState({cartItems});
    }
    
    logout = ()=>{
        localStorage.removeItem('token');
        document.location.href = '/';
    };

    renderMenuLinks = ()=>{

        return this.props.departments.map((item)=>(
            <li>
                <Link to={
                    ParseRoute.local(ROUTE_PRODUCTS_IN_DEPARTMENT, {
                        department_id: item.department_id
                    })} className="link white" href="">{ item.name }</Link>
            </li>
        ));
    };

    onSearch = (e)=>{
        let keycode = (e.keyCode ? e.keyCode : e.which);

        if (parseInt(keycode) === 13) {
            this.props.onSearch(e.target.value);
        }
    };

    render(){
        return (
            <header className="header-1">
                <div className="header-wrapper">
                    <div className="hw-logo">
                        <Link to={ROUTE_HOME} style={{color: '#f62f5e'}}>
                        <span>GCOMMERCE</span>
                        </Link>
                    </div>
                    <div className="hw-links">
                        <ul>
                            {
                                this.renderMenuLinks()
                            }
                        </ul>
                    </div>
                    <div className="hw-search">
                        <div className="search-wrp">
                            <i className="fa fa-search search-ic-s"></i>
                            <input type="text" placeholder="search anything" onKeyPress={this.onSearch} />
                            <div className="elso">
                                <i className="fa fa-close close-ic-s"></i>
                            </div>
                        </div>
                    </div>

                    <div className="bag-wrapper">
                        <a className={"pointer"} data-toggle="modal" data-target="#myModal">
                            <div className="bag-notification">
                                <i className="fa fa-shopping-basket"></i>
                                <span className="bn-num">{this.state.cartItems.length}</span>
                            </div>
                        </a>
                        <a href="#" onClick={this.logout} className={"pointer"} style={{paddingLeft: "10px", color: "red"}}>
                            <div className="bag-notification">
                                <i className="fa fa-sign-out"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </header>
        );
    }
}