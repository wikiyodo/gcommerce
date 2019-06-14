import React, {Component} from 'react'
import CardModal from "../common/modals/cart";
import ProductWithBuyNowCard from "../common/cards/product_buy_now";
import ProductWithColorsCard from "../common/cards/product_colors";
import ProductWithPriceCard from "../common/cards/product_price";
import FilterPane from "../common/filter";
import {GET_PRODUCTS} from "../network/products";
import {ROUTE_PRODUCTS_IN_DEPARTMENT} from "../routes/routes";

export default class HomePage extends Component{

    state  = {
        categories:[],
        products:[],
        page: 1,
        row: 0,
        filter:{}
    };

    loading = false;

    componentDidUpdate(prevProps){
        const locationChanged = this.props.location !== prevProps.location;

        if(prevProps.department.department_id !== this.props.department.department_id){
            this.loading = false;
            this.getProducts(1, this.props.department.department_id);
        }

        if(this.props.department.department_id  && this.props.match && this.props.match.params.department_id != this.props.department.department_id){
            if(this.props.match.path === ROUTE_PRODUCTS_IN_DEPARTMENT) {
                this.props.loadProductInDepartment(this.props.match.params.department_id);
                return;
            }
        }

        if(locationChanged && this.props.location){
            if(this.props.match.path === ROUTE_PRODUCTS_IN_DEPARTMENT) {
                this.props.loadProductInDepartment(this.props.match.params.department_id);
            }
        }
    }

    componentDidMount(){

        if(this.props.department.department_id  && this.props.match && this.props.match.params.department_id != this.props.department.department_id){
            if(this.props.match.path === ROUTE_PRODUCTS_IN_DEPARTMENT) {
                this.props.loadProductInDepartment(this.props.match.params.department_id);
                return;
            }
        }
        if(this.props.department.department_id)
            this.getProducts();
        window.addEventListener('scroll', this.listenToScrollEvent);
    }

    listenToScrollEvent = () => {
        if((window.scrollY) > (document.body.offsetHeight-750) && !this.loading && this.state.row > this.state.products.length){
            // load the next page
            this.getProducts(this.state.page+1);
        }
    };

    componentWillReceiveProps({categories}){
        // let categories = payload.categories;
        if(JSON.stringify(categories) !== JSON.stringify(this.state.categories))
            this.setState({categories});

        if(this.props.department.department_id)
            this.getProducts();
    }

    reshapeCategoriesArray(y, categories){
        let newCategories = [];
        let arrayLength = categories.length;
        let d_y = parseInt(arrayLength / y);
        let rem_y = arrayLength - (d_y * y);

        for(let i =0; i < y; i++){
            for(let j = 0; j < d_y; j++){
                if(newCategories[i] === undefined)
                    newCategories.push([]);
                newCategories[i][j] = categories[i+j];
            }
        }

        // now deal with the remainder

        for(let i =0; i < y && i < rem_y; i++){
            if(newCategories[i] === undefined){
                newCategories.push([]);
            }
            newCategories[i].push(categories[(d_y * y)+i]);
        }

        return newCategories;
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

    renderCategoryListing = ()=>{

        let categories = this.reshapeCategoriesArray(3,this.state.categories);

        return (
            <div className="row">
                {
                    categories.map((subCategories, x)=>{
                        return (
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6" key={"sub-category"+x}>
                                <ul className="category-listings">
                                    {
                                        subCategories.map((category, i)=>{
                                            return (
                                                <li key={"sub-category"+category.name}>{ category.name }</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        );
                    })
                }
            </div>
        );
    };

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
            </span>
        );
    };

    getProducts = (page = 1, department_id)=>{
        if(this.loading) return;
        this.loading = true;
        let that = this;
        if(!department_id) {
            department_id = this.props.department.department_id;
        }
        if(!department_id) return;

        GET_PRODUCTS({page}, {department_id}, (err, payload)=>{
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
                    <div className="hm-banner-01">
                        <div className="inner-wrapper">
                            <div className="col-lg-10 col-md-10 col-sm-10 offset-lg-1 offset-sm-1">
                                <div className="title-wrapper">
                                    <h2>{this.props.department.name}</h2>
                                </div>
                                <div className="categories-wrapper">
                                    {this.renderCategoryListing()}

                                </div>
                            </div>
                        </div>
                    </div>
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