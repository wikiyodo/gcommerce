/**
 * Test the cart modal
 */

import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Cart from '../common/modals/cart';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";


describe('Cart ', ()=>{
    
    it('renders without crashing', ()=>{
        const div = document.createElement('div');
        let cart = <Router>
            <Cart  cartItems={[]} />
        </Router>;
        ReactDOM.render(cart, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('modal renders properly when there is one item', ()=>{

        const div = document.createElement('div');
        let cart = <Router>
            <Cart  cartItems={[
                {
                    "item_id": 2,
                    "name": "Arc d'Triomphe",
                    "attributes": "LG, red",
                    "product_id": 2,
                    "price": "14.99",
                    "quantity": 1,
                    "image": "arc-d-triomphe.gif",
                    "subtotal": "14.99"
                }
                ]} />
        </Router>;
        ReactDOM.render(cart, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
