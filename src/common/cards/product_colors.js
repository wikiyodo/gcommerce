import React, {Component} from 'react';

export default class ProductWithColorsCard extends Component{
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
                        <div className="product-colors compact">
                            <div className="pc-each active">
                                <div className="pce-s"></div>
                            </div>
                            <div className="pc-each ">
                                <div className="pce-s"></div>
                            </div>
                            <div className="pc-each ">
                                <div className="pce-s"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}