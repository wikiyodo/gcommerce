import React, {Component} from 'react';
import {LOGIN_USER} from "../../network/auth";

export default class LoginModal extends Component{

    state = {
        error:{},
        loading: false
    };

    static storeToken = (user, token)=>{
        localStorage.setItem('token', JSON.stringify({user, token}));
    };

    loginAction = (email, password)=>{
        let that = this;
        LOGIN_USER({email, password}, (err, payload)=>{
            if(!err || payload.statusCode === 400){
                let body = payload.body;

                if(body.error) {
                    console.log(body.errors);
                    that.setState({
                        error: body.error,
                        loading:false
                    });
                }
                else{
                    LoginModal.storeToken(body.user, body.accessToken);
                    alert("Login successful!")
                }
            }else {
                that.setState({
                    error: {
                        message:"Internet connection problem."
                    },
                    loading:false
                });
            }
        });
    };

    loginUser = (e)=>{

        e.preventDefault();
        if(this.state.loading) return;

        let {email, password} = this.refs;
        email = email.value;
        password = password.value;
        this.setState({
            error:{},
            loading: true
        });

        this.loginAction(email, password);
    };

    renderError = ()=>{
        if(!this.state.error.message){
            return <span />;
        }
        return <div className="alert alert-danger">{this.state.error.message}</div>
    };

    render(){
        return (
            <div className="modal" id="myLoginModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Login</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form className={""} onSubmit={this.loginUser}>
                                <div className={"form-group"}>
                                    {this.renderError()}
                                </div>
                                <div className={"form-group"}>
                                    <label>Email</label>
                                    <input ref={"email"} required={true} className={"form-control"} type={"email"} />
                                </div>
                                <div className={"form-group"}>
                                    <label>Password</label>
                                    <input ref={"password"} required={true} className={"form-control"} type={"password"} />
                                </div>
                                <div className={"form-group"}>
                                    <button type="submit" className="btn btn-danger btn-gr btn-pink-red no-border" disabled={this.state.loading}>Register</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer flex-space-btw">
                            <button type="button" className="btn btn-danger btn-gr btn-white no-border" data-dismiss="modal">Back to shop</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}