import React, {Component} from 'react';
import {API_PRODUCTS_DETAILS} from "../routes/api";
import {
    GET_PRODUCT, GET_PRODUCT_LOCATION, GET_PRODUCT_REVIEWS, GET_PRODUCTS,
    POST_PRODUCT_REVIEW
} from "../network/products";
import { ADD_ITEM_TO_CARD } from '../network/cart';
import {Image} from "../network/images";
import ParseRoute from "../routes/parse";
import {ROUTE_PRODUCTS_IN_DEPARTMENT} from "../routes/routes";
import {Link} from 'react-router-dom';
import {ROUTE_HOME} from "../constant/const";
import ProductAttr from '../common/product-attr';
import { getCardId, getCartId, stripeKey } from '../helpers';
import { GET_USER } from '../network/auth';
import { GET_SHIPPING_REGIONS, GET_SHIPPING_REGION_DETAILS } from '../network/shipping';
import { GET_TAXES } from '../network/tax';
import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import StripePay from './stripe-pay';
import { CREATE_ORDER, UPDATE_USER, GET_ORDER, STRIPE_CHARGE } from '../network/order';
/*global Stripe*/
export default class Checkout extends Component{

    state = {
        user: {},
        regions: [],
        shipping:[],
        step: 'delivery',
        cartItems:[],
        taxes: [],
        selected_shipping:{},
        selected_tax:{},
        loading: false,
        order: {},
        orders:[]
    };

    componentDidMount(){
        this.loadUserDetails();
        this.loadShippingRegions();
        this.loadTaxes();
        
        let {cartItems} = this.props;
        cartItems = cartItems || [];
        this.setState({cartItems});
    }

    componentWillReceiveProps({cartItems}){
        cartItems = cartItems || [];
        this.setState({cartItems});
    }
    

    createOrder = ()=>{
        let cart_id = getCartId();
        let shipping_id = this.state.selected_shipping.shipping_id ;
        let tax_id = this.state.selected_tax.tax_id;

        CREATE_ORDER({cart_id,shipping_id, tax_id}, (err, res)=>{
            if(err){
                setTimeout(this.loadUserDetails, 5000);
                return;
            }
            let order = res.body.orderId;
            this.fetchOrder(order);
        });
    };

    fetchOrder = (order_id)=>{

        GET_ORDER({order_id}, (err, res)=>{
            if(err){
                setTimeout(this.loadUserDetails, 5000);
                return;
            }
            let orders = res.body;
            this.setState({orders});
        });
    };

    loading = (loading = false)=>{
        this.setState({loading});
    };

    checkoutStep = (step = 'delivery')=>{
        this.setState({step});
    };

    updateUserAddress = (e)=>{
        e.preventDefault();
        console.log("WIWKWIWIW");
        let address_1  = this.refs.address_1.value;
        let city   = this.refs.city.value;
        let region   = this.refs.region.value;
        let postal_code   = this.refs.postal_code.value;
        let country   = this.refs.country.value;
        let shipping_region_id   = this.state.shipping_region_id;
        if(!address_1 || !city || !region || !postal_code || !country || !shipping_region_id){
            alert("Non of these fields can be left empty");
            return;
        }
        this.loading(true);
        UPDATE_USER({shipping_region_id, address_1,city, region, postal_code, country}, (err, res)=>{
            this.loading();
            if(err){
                setTimeout(this.loadUserDetails, 5000);
                return;
            }
            this.checkoutStep('confirmation')
            let user = res.body;
            this.setState({user});
        });
        return false;
    };


    shippingRegionSelected = (e)=>{
        let shipping_region_id = e.target.value;
        this.setState({
            shipping_region_id
        })
    }

    loadUserDetails = ()=>{
        GET_USER({}, (err, res)=>{
            if(err){
                setTimeout(this.loadUserDetails, 5000);
                return;
            }
            let user = res.body;
            this.setState({user});
        });
    };

    loadShippingRegions = ()=>{
        GET_SHIPPING_REGIONS({}, (err, res)=>{
            if(err){
                setTimeout(this.loadShippingRegions, 5000);
                return;
            }
            let regions = res.body;
            this.setState({regions});
        });
    };

    loadTaxes = ()=>{
        GET_TAXES({}, (err, res)=>{
            if(err){
                setTimeout(this.loadTaxes, 5000);
                return;
            }
            let taxes = res.body;
            this.setState({taxes});
        });
    };

    countrySelected = (e)=>{
        let shipping_id = e.target.value;
        this.loadShippingRegionDetails(shipping_id);
    }

    loadShippingRegionDetails = (shipping_id)=>{
        GET_SHIPPING_REGION_DETAILS({shipping_id}, (err, res)=>{
            if(err){
                setTimeout(this.loadShippingRegionDetails, 5000);
                return;
            }
            let shipping = res.body;
            this.setState({shipping});
        });
    };

    renderDeliveryStep = ()=>{
        let {name, email, address_1, address_2, city, region, postal_code, country, shipping_region_id, day_phone, eve_phone, mob_phone, credit_card} = this.state.user;

        return (
            <form ref="deliveryForm" onSubmit={this.updateUserAddress}>
            <div className="card card-01 bd-side-bottom">
                <div className="card-body no-border product-ples">
                    <div className="checkout-xp">
                        <div className="steps-dp">
                            <div className="str-line">
                                <div className="ln active"></div>
                                <div className="ln"></div>
                                <div className="ln"></div>
                            </div>
                            <div className="str-circ">
                                <div className="ln"></div>
                                <div className="ln"></div>
                                <div className="ln"></div>
                                <div className="ln"></div>
                            </div>
                            <div className="str-label">
                                <div className="ln active">Delivery</div>
                                <div className="ln">Confirmation</div>
                                <div className="ln">Payment</div>
                                <div className="ln">Finish</div>
                            </div>
                        </div>
                        <div className="space-average-h"></div>
                        <div className="space-average-h"></div>
                        <div className="form-gl">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="font font-grey-light">Full name *</label>
                                            <input className="form-control" defaultValue={name} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="font font-grey-light">Address *</label>
                                            <input required className="form-control" ref="address_1" defaultValue={address_1} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="font font-grey-light">City *</label>
                                            <input required className="form-control" ref="city" defaultValue={city} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="font font-grey-light">Region *</label>
                                            <input required className="form-control" ref="region" defaultValue={region} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="font font-grey-light">Zip code *</label>
                                            <input required className="form-control" ref="postal_code" defaultValue={postal_code} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="font font-grey-light">Country: <span className="font font-black">Great Britain *</span></label>
                                            <input required className="form-control" ref={"country"} defaultValue={country} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="font font-grey-light">Region:</label>
                                            <select required className="form-control" onChange={this.countrySelected}>
                                            {
                                                (()=>{
                                                    if(this.state.regions.length === 0)
                                                    return <option value="">loading available regions...</option>
                                                })()
                                            }
                                            {
                                                this.state.regions.map((region, i)=>{
                                                    return <option value={region.shipping_region_id} key={"region"+region.shipping_region}>{region.shipping_region}</option>;
                                                })
                                            }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="c-check">
                                                My Billing information is the same as my delivery information
                                                <input type="checkbox" checked="checked" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="space-average-h"></div>
                                        <hr />
                                        <div className="space-average-h"></div>
                                        <h3>Delivery options</h3>
                                        <div className="space-average-h"></div>
                                        {
                                            (()=>{
                                                if(!this.state.shipping.length)
                                                return <p><strong><i>waiting for you to select your region... </i></strong></p>
                                            })()
                                        }

                                        <div className="row">
                                        {
                                            this.state.shipping.map((location, i)=>{
                                                return (  
                                                    <div className="col-lg-6">
                                                        <label className="c-check">
                                                            {location.shipping_type}: <span className="font font-grey-light">(costs ${location.shipping_cost})</span>
                                                            <input type="radio" defaultValue={location.shipping_id} onInput={this.shippingRegionSelected} name="shipping" />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="flex flex-space-btw padding-cs-43">
                        <button type="button" className="btn btn-danger btn-gr btn-white no-border" data-dismiss="modal">Back</button>
                        <button type="submit" className="btn btn-danger btn-gr btn-pink-red">Next step</button>
                    </div>
                </div>
            </div>
            </form>

        );
    };

    getCartPrice = ()=>{
        let total = 0;
        this.state.cartItems.forEach((cartItem, i)=>{
            total += parseFloat(cartItem.price)
        });

        return total;
    };

    computeTotalTax = (productPrice)=>{
        let total = 0;
        this.state.taxes.forEach((tax, i)=>{
            total += (parseFloat(tax.tax_percentage)/100) * productPrice;
        });

        return total;
    };

    renderTax = ()=>{
        let total = [];
        this.state.taxes.forEach((tax, i)=>{
            if(tax.tax_percentage > 0)
                total.push(tax.tax_type+':'+tax.tax_percentage);
        });

        return total.join(' ');
    };

    renderConfirmationStep = ()=>{
        let cartPrice =  this.getCartPrice();
        let totalTax = this.computeTotalTax(cartPrice);
        console.log(totalTax);
        let grandTotal = totalTax + cartPrice;
        return (
            <div className="card card-01 bd-side-bottom">
                <div className="card-body no-border product-ples">
                    <div className="checkout-xp">
                        <div className="steps-dp">
                            <div className="str-line">
                                <div className="ln active"></div>
                                <div className="ln active"></div>
                                <div className="ln"></div>
                            </div>
                            <div className="str-circ">
                                <div className="ln"></div>
                                <div className="ln"></div>
                                <div className="ln"></div>
                                <div className="ln"></div>
                            </div>
                            <div className="str-label">
                                <div className="ln active">Delivery</div>
                                <div className="ln">Confirmation</div>
                                <div className="ln">Payment</div>
                                <div className="ln">Finish</div>
                            </div>
                        </div>
                        <div className="space-average-h"></div>
                        <div className="space-average-h"></div>
                        <div className="form-gl">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <td className="font-weight-bold">Order Summary</td>
                                        <td className="font-weight-bold">Delivery</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <table className="table table-striped table-borderless font font-grey">
                                                <thead>
                                                <tr>
                                                    <td>Item</td>
                                                    <td>Qty</td>
                                                    <td>Price</td>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.cartItems.map((cartItem, i)=>{
                                                            return (         
                                                                <tr>
                                                                    <td>{cartItem.name}</td>
                                                                    <td>{cartItem.quantity}</td>
                                                                    <td>£{cartItem.price}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <table className="table table-borderless font font-grey">
                                                <tbody>
                                                    <tr>
                                                        <td className="font font-grey-light font-weight-bold">Address</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font font-grey">{this.state.user.address_1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font font-grey-light font-weight-bold">Delivery</td>
                                                    </tr>{this.state.user.address_1}
                                                    <tr>
                                                        <td className="font font-grey">{this.state.selected_shipping.shipping_type}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="font font-weight-bold font-grey">
                                        Subtotal
                                    </div>
                                    <div className="font font-weight-bold">
                                        £{cartPrice}
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="font font-weight-bold font-grey">
                                        Shipping
                                    </div>
                                    <div className="font font-weight-bold">
                                        {
                                            ((this.state.selected_shipping.shipping_cost && parseFloat(this.state.selected_shipping.shipping_cost) > 0) ? '$'+(this.state.selected_shipping.shipping_cost) : 'free')
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="font font-weight-bold font-grey">
                                        Tax: <small>{this.renderTax()}</small>
                                    </div>
                                    <div className="font font-weight-bold">
                                        {
                                            ((totalTax > 0) ? '$'+(totalTax) : 'free')
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="font font-weight-bold font-grey">
                                        Grandtotal
                                    </div>
                                    <div className="font font-weight-bold">
                                        £{grandTotal}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="flex flex-space-btw padding-cs-43">
                        <button type="button" className="btn btn-danger btn-gr btn-white no-border" data-dismiss="modal">Back</button>
                        <button type="button" className="btn btn-danger btn-gr btn-pink-red" onClick={()=>{this.checkoutStep('payment')}}>Next step</button>
                    </div>
                </div>
            </div>
        );
    };


    paymentSucessful = (stripeToken )=>{
        // send token to the server
        stripeToken = stripeToken.id;
        let {orders} = this.state;
        let order = orders[0];
        let {order_id} = order;
        
        let cartPrice =  this.getCartPrice();
        let totalTax = this.computeTotalTax(cartPrice);
        let amount  = totalTax + cartPrice;
        amount = parseInt(amount * 100);
        let currency = 'USD';
        let source = stripeKey();
        STRIPE_CHARGE({order_id,source, stripeToken,currency, description:"order", amount }, (err, res)=>{
            if(err){
                setTimeout(this.loadUserDetails, 5000);
                return;
            }
            if(res.status == 200){
                let orders = res.body;
                this.setState({orders});
                this.checkoutStep('success');
            }
        });
    };

    stripePay = ()=>{
        if(this.state.orders.length == 0){
            // return loading and create order
            this.createOrder();
            return <div><strong>creating order...</strong></div>
        }
        
        let cartPrice =  this.getCartPrice();
        let totalTax = this.computeTotalTax(cartPrice);
        console.log(totalTax);
        let grandTotal = totalTax + cartPrice;
        return (
            <StripePay price={grandTotal} onSuccess={this.paymentSucessful} />
        );
    }

    renderSuccess = ()=>{
        return (
            <div className="card card-01 bd-side-bottom">
                <div className="card-body no-border product-ples">
                    <div className="checkout-xp">
                        <div className="steps-dp">
                            <div className="str-line">
                                <div className="ln active"></div>
                                <div className="ln active"></div>
                                <div className="ln active"></div>
                            </div>
                            <div className="str-circ">
                                <div className="ln"></div>
                                <div className="ln"></div>
                                <div className="ln"></div>
                                <div className="ln"></div>
                            </div>
                            <div className="str-label">
                                <div className="ln active">Delivery</div>
                                <div className="ln active">Confirmation</div>
                                <div className="ln active">Payment</div>
                                <div className="ln active">Finish</div>
                            </div>
                        </div>
                        <div className="space-average-h"></div>
                        <div className="space-average-h"></div>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 offset-lg-4 text-center">
                                <img className="img-res" src="/success.png" />
                                <h3>Success!</h3>
                                <p className="font font-grey">Your item will be shipped shortly, you will get email with this details</p>
                                <Link className="btn btn-default btn-gr btn-pink-red btn-sub" to="/">Back to shop</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    renderSteps = ()=>{
        switch(this.state.step){
            case 'delivery':
                return this.renderDeliveryStep();
            case 'confirmation':
                return this.renderConfirmationStep();
            case 'payment':
                return this.stripePay();
            case 'success':
                return this.renderSuccess();

        }
    };

    render(){
        return(
            <section className="boxed-body">
                <div className="hm-products-wrapper space-bottom-average">
                    {this.renderSteps()}
                </div>
            </section>
        )
    }
}