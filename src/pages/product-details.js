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
import { getCardId } from '../helpers';

export default class ProductDetails extends Component{

    state = {
        details:{},
        locations:[],
        reviews:[],
        mainImage:'',
        auth: false,
        error:{},
        loading: false,
        quantity: 1,
        attrs: {},
        cartSuccess: false
    };

    constructor(props){
        super(props);
        this.state.auth  = props.auth;
    }

    componentWillReceiveProps({auth}){
        if(auth !== this.state.auth)
            this.setState({auth});
    }

    componentDidMount(){
        console.log(this.props.match);
        this.getProducts(this.props.match.params.product_id);
        this.getProductLocation(this.props.match.params.product_id);
        this.getProductReviews(this.props.match.params.product_id);
    }

    getProducts = (product_id)=>{
        let that = this;

        GET_PRODUCT({}, {product_id}, (err, payload)=>{
            if(!err){
                that.setState({
                    details: payload.body[0],
                });
            }else {
                setTimeout(2000, ()=>{
                    that.getProducts()
                });
            }
            that.loading = false;
        });
    };

    getCardId = ()=>{
        return getCardId();
    };

    processAttrs = (attrs)=>{
        let rt = [];
        for(let i in attrs){
            let attr =attrs[i];
            rt = rt.concat(attr);
        }
        return rt.join(' ');
    };

    addToCart = (e)=>{
        e.preventDefault();
        let that = this;
        let {product_id} = this.state.details;
        let {quantity, attrs} = this.state;
        let cart_id = this.getCardId();
        let attributes = this.processAttrs(attrs);
        console.log(attributes);
        ADD_ITEM_TO_CARD({product_id, cart_id, quantity, attributes}, (err, payload)=>{
            if(!err){
                this.setState({
                    cartSuccess: true
                });
                alert("Item has been successfully added to cart!")
            }else {
                alert("Please add to card again")
            }
            that.loading = false;
        });
    };

    getProductLocation = (product_id)=>{
        let that = this;

        GET_PRODUCT_LOCATION({}, {product_id}, (err, payload)=>{
            if(!err){
                that.setState({
                    locations: payload.body,
                });
            }else {
                setTimeout(2000, ()=>{
                    that.getProducts()
                });
            }
            that.loading = false;
        });
    };

    getProductReviews = (product_id)=>{
        let that = this;

        GET_PRODUCT_REVIEWS({}, {product_id}, (err, payload)=>{
            if(!err){
                that.setState({
                    reviews: payload.body,
                });
            }else {
                setTimeout(2000, ()=>{
                    that.getProducts()
                });
            }
            that.loading = false;
        });
    };

    submitReview = (e)=>{
        e.preventDefault();
        let that = this;
        let product_id = this.state.details.product_id;
        let review = this.refs.review.value;
        let rating = this.refs.rating.value;
        this.setState({
            error:{},
            loading: true
        });

        POST_PRODUCT_REVIEW({review, rating}, {product_id}, (err, payload)=>{
            if(!err || payload.statusCode === 400){

                this.refs.review.value = '';
                this.refs.rating.value = '';
                alert("Thanks! your review has been added");
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

    changeMainImage = (url)=>{
      this.setState({mainImage:url})
    };

    renderProductLocation = ()=>{
        return (
            <ul className="breadcrumb breadcrumb-gr">
                <li><Link to={ROUTE_HOME}>Home</Link></li>
                {
                    this.state.locations.map((e, i)=>{
                        return (
                            <li className="breadcrumb-item" key={'Product-location-'+i}>
                                <Link to={ParseRoute.local(ROUTE_PRODUCTS_IN_DEPARTMENT, {
                                department_id: e.department_id
                            })}> &nbsp; {e.department_name}&nbsp; </Link></li>
                        );
                    })
                }
            </ul>
        );
    };

    renderRatings = (value)=>{
        value = parseInt(value);

        let star = [];
        for(let i=0; i < value; i++){
            star.push(<i className="fa fa-star"></i>)
        }
        for(let i=0; i < (5-value); i++){
            star.push(<i className="fa fa-star-o"></i>)
        }

        return (
            <div className="ratings">
                {
                    star.map((e, i)=>{
                        return e;
                    })
                }
            </div>
        );
    };

    renderReviews = ()=>{
        return (
            <div className="rw-each">
                {
                    this.state.reviews.map((review, i)=>{
                       return (
                           <div className="row" key={"review-sd-"+i}>
                               <div className="col-lg-3 col-md-3 col-sm-4">
                                   <div className="pr-left">
                                       {this.renderRatings(review.rating)}
                                       <div className="rw-author font-weight-bold">
                                           {review.name}
                                       </div>
                                       <div className="rw-time">
                                           {review.created_on}
                                       </div>
                                   </div>
                               </div>
                               <div className="col-lg-9 col-md-9 col-sm-8">
                                   <div className="pr-right">
                                       <div className="rw-comment space-top-tiny">
                                           {review.review}
                                       </div>
                                       {/*<div className="rw-stat space-top-tiny">
                                           <div className="rws-each">
                                                            <span className="ic-wrp">
                                                                <i className="fa fa-heart-o font font-pink"></i>
                                                            </span>
                                               <span className="font font-grey-light">113</span>
                                           </div>
                                           <div className="rws-each space-left-average">
                                                            <span className="ic-wrp">
                                                                <i className="fa fa-comment-o"></i>
                                                            </span>
                                               <span className="font font-grey-light">6</span>
                                           </div>
                                       </div>*/}
                                   </div>
                               </div>
                           </div>
                       );
                    })
                }
            </div>
        );
    };
    renderError = ()=>{
        if(!this.state.error.message){
            return <span />;
        }
        return <div className="alert alert-danger">{this.state.error.message}</div>
    };
    renderReviewForm = ()=>{
        if(this.state.auth)
            return (
                <div className="rw-form">
                    <div className="form">
                        <form className="form" onSubmit={this.submitReview}>
                            <div className={"form-group"}>
                                {this.renderError()}
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <label>Your review</label>
                                </div>
                                <div className="col-lg-9">
                                    <textarea required={true} ref={"review"} type="text" className="form-control"></textarea>
                                    <span className="font font-grey font-small">Your review must be atleast 80 characters</span>
                                </div>
                                <div className="col-lg-12 space-average-h"></div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <label>Overall Rating</label>
                                </div>
                                <div className="col-lg-9">
                                    <select ref={"rating"} className="form-control">
                                        <option value="5">5 stars</option>
                                        <option value="4">4 stars</option>
                                        <option value="3">3 stars</option>
                                        <option value="2">2 stars</option>
                                        <option value="1">1 star</option>
                                    </select>
                                </div>
                                <div className="col-lg-12 space-average-h"></div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                </div>
                                <div className="col-lg-9">
                                    <button disabled={this.state.loading} className="btn btn-default btn-gr btn-pink-red">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
    };

    changeInputValue = (e)=>{
        e.preventDefault();
        let val = e.target.value;
        val = parseInt(val);
        if(isNaN(val)) val = 0;
        if(val > 1)
        this.setState({quantity:val});
    };

    incrementQuantity = (e)=>{
        e.preventDefault();
        let {quantity} = this.state;
        ++quantity;
        this.setState({quantity});
    }

    decrementQuantity = (e)=>{
        e.preventDefault();
        let {quantity} = this.state;
        if(quantity > 1)
            --quantity;
        this.setState({quantity});
    }

    addAttr = (attrs)=>{
        this.setState({attrs})
    };

    render(){
        return (
            <span>  
                <section className="boxed-body">
                    <div className="hm-products-wrapper space-bottom-average">
                        <div className="card card-01 bd-side-bottom">
                            <div className="card-body no-border product-ples">
                                <div className="row">
                                    <div className="col-lg-5 col-md-6 col-sm-12">
                                        <div className="product-img">
                                            <div className="pimg-lg">
                                                <img src={Image(this.state.mainImage || this.state.details.image)} className="img-fluid" />
                                            </div>
                                            <div className="pimg-ic">
                                                <img onClick={()=>{
                                                    this.changeMainImage(this.state.details.image)
                                                }} src={Image(this.state.details.image)} className={((!this.state.mainImage || this.state.mainImage === this.state.details.image) ? "img-fluid active" : "img-fluid")} />
                                                <img onClick={()=>{
                                                    this.changeMainImage(this.state.details.image_2)
                                                }} src={Image(this.state.details.image_2)} className={(this.state.mainImage === this.state.details.image_2 ? "img-fluid active" : "img-fluid")} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 col-md-6 col-sm-12">
                                        <div className="l-ds">
                                            {this.renderProductLocation()}
                                            <div className="ratings">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star inactive"></i>
                                            </div>
                                            <div className="card-title-dr space-top-tiny">
                                                {this.state.details.name}
                                            </div>
                                            <div className="card-title-dr font font-pink space-top-tiny">
                                                <span>£{this.state.details.discounted_price}</span>
                                                <br />
                                                <span style={{textDecoration:'line-through',fontSize:'15px'}}>£{this.state.details.price}</span>
                                            </div>
                                            <div className="filters-01 space-top-tiny">
                                                <div className="each-filter">
                                                    <div className="ef-title">
                                                        Description
                                                    </div>
                                                    <div className="product-sizes compact-left">
                                                        <p>
                                                            {this.state.details.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ProductAttr onAddFilters={this.addAttr} product_id={this.props.match.params.product_id} />
                                                <div className="each-filter">
                                                    <div className="ef-title">
                                                        Quantity
                                                    </div>
                                                    <div className="tbl-md-hg7">
                                                        <div className="it-sdm2-fx">
                                                            <div className="e-its pointer" onClick={this.decrementQuantity}><i className="fa fa-minus"></i></div>
                                                            <div className="e-its2"><input onInput={this.changeInputValue} value={this.state.quantity} /></div>
                                                            <div className="e-its pointer" onClick={this.incrementQuantity}><i className="fa fa-plus"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="flex-space-btw">
                                                    <button type="button" disabled={this.cartSuccess} onClick={this.addToCart} className="btn btn-danger btn-gr btn-pink-red" data-dismiss="modal">{this.cartSuccess?"Added to cart":"Add to cart"}</button>
                                                    <button type="button" onClick={()=>{alert("This feature is not available")}} className="btn btn-danger btn-gr btn-white no-border font font-grey" data-dismiss="modal"><i className="fa fa-heart-o font font-pink font-weight-bold"></i> Add to wish list</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="reviews product-ples">
                                    <div className="rw-title">
                                        <h4>Product reviews</h4>
                                    </div>
                                    {this.renderReviews()}
                                    <div className="rw-title">
                                        <h4>Product Title</h4>
                                        <div className="space-average-h"></div>
                                    </div>
                                    {
                                        this.renderReviewForm()
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="space-average-h"></div>
                <div className="space-average-h"></div>
            </span>
        );
    }
}