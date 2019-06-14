/**
 * Test the app itself
 * confirm that the app runs on load
 */

import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import App from '../App';


describe('Confirm that App.js', ()=>{
    it('renders without crashing', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('returns empty cart key for cart', ()=>{
        expect(App.getCartId()).toBe(null);
    });
    it('returns empty cart key for cart', ()=>{
        let cartId = 'cartIDD';
        localStorage.setItem('cartId', cartId);
        expect(App.getCartId()).toBe(cartId);
    });
});

describe('Authentication', ()=>{

    it('successfully logs user out after login', ()=>{
        let user = 'User name';
        let token = 'user token';

        localStorage.setItem('token', JSON.stringify({user, token}));
        App.logoutUser();
        expect(App.getUserToken()).toBe('');
    });
});