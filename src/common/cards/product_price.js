import React, {Component} from 'react';

export default class ProductWithPriceCard extends Component{
    render(){
        return (
            <div className="card-01-sx card ">
                <div className="card-body">
                    <div className="card-img">
                        <img src="assets/images/cashmere-crew-neck-sweater-original-19740.jpg" />
                    </div>
                    <div className="card-title">
                        Men's Knitwear Offers
                    </div>
                    <div className="card-fo">
                        <span className="btn btn-default font text-capitalize font-big-bold font-pink">from £3.99</span>
                    </div>
                </div>
            </div>
        );
    }
}