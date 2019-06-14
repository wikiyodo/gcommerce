import React, {Component} from 'react';

export default class Footer extends Component{
    render(){
        return (
            <footer>
                <div className="footer-wrapper">
                    <div className="subscrition-01">
                        <h5 className="sb-ti">SUBSCRIBE FOR SHOP NEW, UPDATES AND SPECIAL OFFERS</h5>
                        <div className="sub-form">
                            <i className="fa fa-envelope-o ic-msg"></i>
                            <input type="text" className="form-control form-ig input-01 email-input" placeholder="Your e-mail here" />
                            <button className="btn btn-default btn-gr btn-pink-red btn-sub">Subscribe</button>
                        </div>
                    </div>
                    <div className="footer-inner">
                        <div className="fi-links">
                            <ul>
                                <li>Women</li>
                                <li>Men</li>
                                <li>Kids</li>
                                <li>Shoes</li>
                                <li>Brands</li>
                            </ul>
                        </div>
                        <div className="fi-social">
                            <ul>
                                <li><i className="fa fa-instagram"></i></li>
                                <li><i className="fa fa-pinterest"></i></li>
                                <li><i className="fa fa-twitter"></i></li>
                                <li><i className="fa fa-facebook"></i></li>
                            </ul>
                        </div>
                        <div className="fi-btm">
                            <ul>
                                <li>@2016 shopmate Ltd.</li>
                                <li>Contact</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}