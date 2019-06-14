/**
 * Test login modal
 */

import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Login from '../common/modals/login';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";


describe('Login ', ()=>{
    
    it('renders without crashing', ()=>{
        const div = document.createElement('div');
        let cart = <Router>
            <Login />
        </Router>;
        ReactDOM.render(cart, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
