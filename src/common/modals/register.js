import React, {Component} from 'react';
import {REGISTER_USER} from "../../network/auth";
import LoginModal from "./login";

export default class RegisterModal extends Component{

    state = {
        error:{},
        loading: false
    };

    registerUser = (e)=>{
        console.log("-------------------------");
        e.preventDefault();
        if(this.state.loading) return;

        let {name, email, password} = this.refs;
        name = name.value;
        email = email.value;
        password = password.value;
        let that = this;
        this.setState({
            error:{},
            loading: true
        });

        REGISTER_USER({name, email, password}, (err, payload)=>{
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
                    LoginModal.storeToken(body.customer, body.accessToken);
                    alert("You account has been created! please wait while we log you in!")
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

    renderError = ()=>{
        if(!this.state.error.message){
            return <span />;
        }
        return <div className="alert alert-danger">{this.state.error.message}</div>
    };

    render(){
        return (
            <div className="modal" id="myRegisterModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Register</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form className={""} onSubmit={this.registerUser}>
                                <div className={"form-group"}>
                                    {this.renderError()}
                                </div>
                                <div className={"form-group"}>
                                    <label>Name</label>
                                    <input ref={"name"} required={true} className={"form-control"} type={"text"} />
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