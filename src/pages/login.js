import React, {Component} from 'react';

export default class Login extends Component{
    render(){
        return (
            <div class="su-si-link text-center h2" style={{marginTop: "20px", marginBottom: "20px"}}>Hi! <a data-toggle="modal" data-target="#myLoginModal" class="link pink-red pointer">Sign in</a> or <a data-toggle="modal" data-target="#myRegisterModal" class="pointer link pink-red">Register</a></div>
        );
    }
}