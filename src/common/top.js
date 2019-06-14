import React, {Component} from 'react';

export default class PageTop extends Component{
    render(){
        return (
            <div className="page-top-bar">
                <div className="ptb-wrapper">
                    <div className="ptb-each-item">
                        <div className="su-si-link">
                            Hi! <a data-toggle="modal" data-target="#myLoginModal" className="link pink-red pointer">Sign in</a> or <a data-toggle="modal" data-target="#myRegisterModal" className="pointer link pink-red">Register</a>
                        </div>
                    </div>
                    {/* <div className="ptb-each-item">
                        <div className="inline-help-bar">
                            <ul>
                                <li>
                                    <a className="link dark-grey">Daily Deals</a>
                                </li>
                                <li>
                                    <a className="link dark-grey">Sell</a>
                                </li>
                                <li>
                                    <a className="link dark-grey">help & Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="ptb-each-item">
                        <div className="currency-bl">
                    <span className="cbl-ic">
                        <img src="assets/images/united_kng.png" />
                    </span>
                            <span className="cbl-txt">
                        £ GBP
                    </span>
                        </div>
                    </div>
                    <div className="ptb-each-item">
                        <div className="bag-wrapper">
                            <a data-toggle="modal" data-target="#myModal" className="bag-notification pointer">
                                <i className="fa fa-shopping-basket"></i>
                                <span className="bn-num">6</span>
                            </a>
                            <div className="bag-txt">
                                Your bag: £3.99
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}