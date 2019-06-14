import React, {Component} from 'react';
import {Image} from "../../network/images";
import {Link} from 'react-router-dom';
import ParseRoute from "../../routes/parse";
import {ROUTE_PRODUCTS_DETAILS} from "../../routes/routes";

export default class ProductWithBuyNowCard extends Component{
    render(){
        let product = this.props.product;
        if(!product) return <span />;
        return (
            <div className="card-01-sx card ">
                <div className="card-body">
                    <div className="card-img">
                        <img src={Image(product.thumbnail)} />
                    </div>
                    <div className="card-title">
                        {
                            product.name
                        }
                    </div>
                    <div className="card-fo">
                        <Link to={ParseRoute.local(ROUTE_PRODUCTS_DETAILS, {product_id:product.product_id})} className="btn  btn-gr btn-pink-red">Buy now</Link>
                    </div>
                </div>
            </div>
        );
    }
}