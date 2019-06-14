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
});