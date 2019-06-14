import React, {Component} from 'react'
import CardModal from "../common/modals/cart";
import ProductWithBuyNowCard from "../common/cards/product_buy_now";
import ProductWithColorsCard from "../common/cards/product_colors";
import ProductWithPriceCard from "../common/cards/product_price";
import FilterPane from "../common/filter";
import {GET_PRODUCTS, SEARCH_PRODUCTS} from "../network/products";
import {ROUTE_PRODUCTS_IN_DEPARTMENT} from "../routes/routes";

export default class SearchPage extends Component{

    state  = {
        categories:[],
        products:[],
        page: 1,
        row: 0,
        filter:{}
    };

    loading = false;

    componentDidUpdate(prevProps){

    }

    componentDidMount(){
        this.getProducts(1, this.props.location.search.substr(1,this.props.location.search.length));
        window.addEventListener('scroll', this.listenToScrollEvent);
    }

    listenToScrollEvent = () => {
        if((window.scrollY) > (document.body.offsetHeight-750) && !this.loading && this.state.row > this.state.products.length){
            // load the next page
            this.getProducts(this.state.page+1);
        }
    };

    componentWillReceiveProps({location}){
        if(location.search !== this.props.location.search)
            this.getProducts(1, location.search.substr(1,location.search.length));
    }

    reshapeProductsArray(y, categories){
        let newCategories = [];
        let arrayLength = categories.length;
        let d_y = parseInt(arrayLength / y);
        let rem_y = arrayLength - (d_y * y);

        for(let i =0; i < d_y; i++){
            for(let j = 0; j < y; j++){
                if(newCategories[i] === undefined)
                    newCategories.push([]);
                newCategories[i][j] = categories[i+j];
            }
        }

        // now deal with the remainder
        let l = newCategories.length;

        for(let i =0; i < rem_y; i++){
            if(newCategories[l] === undefined)
                newCategories.push([]);

            newCategories[l].push(categories[(d_y * y)+i]);
        }

        return newCategories;
    }

    renderProductListing = ()=>{

        let products = this.reshapeProductsArray(3,this.state.products);
        return (
            <span>
                {
                    products.map((subProduct, i)=>{
                        return (
                            <div className="row">
                                {
                                    subProduct.map((product, i)=>{
                                        return (
                                            <div className="col-lg-4 col-md-4 col-sm-12">
                                                <ProductWithBuyNowCard product={product} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    })
                }
                {
                    (()=>{
                        if(this.state.products.length === 0){
                            return <h3>No Product match your criteria!</h3>
                        }
                        return <span />
                    })()
                }
            </span>
        );
    };

    getProducts = (page = 1, query_string)=>{
        if(this.loading) return;
        this.loading = true;
        let that = this;

        SEARCH_PRODUCTS({page, query_string}, {}, (err, payload)=>{
            if(!err){
                if(page == 1) {
                    that.setState({
                        products: [].concat(payload.body.rows),
                        page,
                        row: payload.body.count.count
                    });
                }else{
                    that.setState({
                        products: that.state.products.concat(payload.body.rows),
                        page,
                        row: payload.body.count.count
                    });
                }
            }else {
                setTimeout(2000, ()=>{
                    that.getProducts()
                });
            }
            that.loading = false;
        });
    };

    render(){
        return (
            <div>
                <section className="boxed-body">
                    <div className="hm-products-wrapper">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-4">
                                <FilterPane />
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-8">
                                {this.renderProductListing()}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}