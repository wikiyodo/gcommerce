/**
 * Test login modal
 */

import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import ProductWithColorsCard from '../common/cards/product_buy_now';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { shallow } from 'enzyme';


describe('ProductWithColorsCard  ', ()=>{
    
    it('renders without crashing', ()=>{
        const div = document.createElement('div');
        let cart = <Router>
            <ProductWithColorsCard />
        </Router>;
        ReactDOM.render(cart, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('renders correctly with product', ()=>{
        const div = document.createElement('div');
        let product = <Router><ProductWithColorsCard product={{
            "product_id": 2,
            "name": "Chartres Cathedral",
            "description": "\"The Fur Merchants\". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!",
            "price": "16.95",
            "discounted_price": "15.95",
            "thumbnail": "chartres-cathedral-thumbnail.gif"
            }} /></Router>;
        const component = renderer.create(product);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});
