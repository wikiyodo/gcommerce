import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import PageTop from "./common/top";
import Header from "./common/header";
import Footer from "./common/footer";
import {ROUTE_HOME} from "./constant/const";
import HomePage from "./pages/homepage";
import {GET_DEPARTMENTS_CATEGORIES, GET_SITE_CATEGORIES, GET_SITE_DEPARTMENTS} from "./network/site";
import {ROUTE_PRODUCTS_DETAILS,ROUTE_CHECKOUT, ROUTE_PRODUCTS_IN_DEPARTMENT, ROUTE_PRODUCTS_SEARCH, ROUTE_LOGIN} from "./routes/routes";
import SearchPage from "./pages/search";
import ProductDetails from "./pages/product-details";
import LoginModal from "./common/modals/login";
import RegisterModal from "./common/modals/register";
import {GET_GENERATE_CART_ID, GET_CART_ITEMS} from "./network/cart";
import {getCartId} from './helpers';
import CartModal from './common/modals/cart';
import Checkout from './pages/checkout';
import Login from './pages/login';
let gct;
class App extends Component {

    state = {
        categories:[],
        departments:[],
        department:{},
        search: false,
        auth: false,
        cartItems:[]
    };

    constructor(props){
        super(props);
        this.bootstrap();
    }

    getCartItem = ()=>{
        GET_CART_ITEMS({cart_id: getCartId()}, (err, res)=>{
            let cartItems = res.body;
            this.setState({cartItems});
            gct = setTimeout(()=>this.getCartItem(), 4000);
        });
    };

    componentDidMount(){
        if(gct){
            clearTimeout(gct);
        }
        this.userLoggedIn();
        this.createCartToken();
        this.getCartItem();
    }

    componentWillMount() {

    }


    bootstrap = ()=>{
        this.getDepartments();
    };

    addPayload = (name, value)=>{
        console.log(value);
        this.setState({
            [name]: value
        });
    };

    getCategories   = (department_id)=>{
        let that = this;
        GET_DEPARTMENTS_CATEGORIES({department_id}, (err, payload)=>{
            if(!err){
                that.addPayload('categories', payload.body);
            }else {
                setTimeout(2000, ()=>{
                    that.getCategories()
                });
            }
        });
    };

    getDepartments   = ()=>{
        let that = this;
        GET_SITE_DEPARTMENTS({}, (err, payload)=>{
            if(!err){
                that.addPayload('departments', payload.body);
                that.addPayload('department', payload.body[0]);
                that.getCategories(payload.body[0].department_id)
            }else {
                setTimeout(2000, ()=>{
                    that.getDepartments()
                });
            }
        });
    };

    loadProductInDepartment = (department_id)=>{
        this.getCategories(department_id);
        for(let index in this.state.departments){
            if(this.state.departments[index].department_id == department_id) {
                this.addPayload('department', this.state.departments[index]);
            }
        }
    };

    renderGuestRoutes() {

        return (
            <Switch>
                  <Route exact path={ROUTE_HOME} render={params => <HomePage categories={this.state.categories} departments={this.state.departments} department={this.state.department} />
                  } />
                  <Route exact path={ROUTE_PRODUCTS_IN_DEPARTMENT} render={params => <HomePage loadProductInDepartment={this.loadProductInDepartment} location={params.location} match={params.match} categories={this.state.categories} departments={this.state.departments} department={this.state.department} />} />
                  <Route exact path={ROUTE_PRODUCTS_SEARCH} render={params => <SearchPage location={params.location} match={params.match} />} />
                  <Route exact path={ROUTE_PRODUCTS_DETAILS} render={params => <ProductDetails auth={this.state.auth} location={params.location} match={params.match} />} />
                  {
                      (()=>{
                          if(App.getUserToken()){
                            return <Route exact path={ROUTE_CHECKOUT} render={params => <Checkout auth={this.state.auth}  cartItems={this.state.cartItems} location={params.location} match={params.match} />} />
                          }else{
                            return <Route exact path={ROUTE_CHECKOUT} render={params => <Redirect to={ROUTE_LOGIN} />} />
                          }
                      })()
                  }
                  <Route exact path={ROUTE_LOGIN} render={params => <Login />} />
                  <Route render={() => <h2>Page not found!</h2>} />
            </Switch>
        );
    }

    navigateToSearchPage = (queryString) => {
        this.setState({
            search:queryString
        });
    };

    stopNavToSearchPage = ()=>{
        this.setState({
            search: false
        });
    };

    userLoggedIn = ()=>{
        if(App.getUserToken()){
            this.setState({
               auth: true
            });
        }
    };

    createCartToken = ()=>{
        if(App.getCartId())
            return;
        GET_GENERATE_CART_ID({},{}, (err, payload)=>{
           if(err){
               this.createCartToken();
               return;
           }

           localStorage.setItem('cartId', payload.body.cart_id);
        });
    };

    static getUserToken = ()=>{

        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')):'';
    };

    static getCartId = ()=>{
        return localStorage.getItem('cartId');
    };

    static logoutUser = ()=>{
        return localStorage.removeItem('token');
    };

    render() {
        return (
            <div className={"body-wrapper"}>
                  <Router>
                      {
                          (()=>{
                              if(this.state.search) {
                                  let query = this.state.search;
                                  this.stopNavToSearchPage();
                                  return <Redirect to={ROUTE_PRODUCTS_SEARCH+"?"+query} />;
                              }
                          })()
                      }

                      {
                          (()=>{
                              if(!this.state.auth)
                                  return (
                                      <PageTop categories={this.state.categories} departments={this.state.departments} />
                                  )
                          })()
                      }
                        <Header cartItems={this.state.cartItems} categories={this.state.categories} departments={this.state.departments} onSearch={this.navigateToSearchPage} />
                        {this.renderGuestRoutes()}
                        <Footer />
                      {
                          (()=>{
                              if(!this.state.auth)
                                  return (
                                      <span>
                                        <LoginModal />
                                        <RegisterModal />
                                      </span>
                                  )
                          })()
                      }
                      <CartModal  cartItems={this.state.cartItems} />
                  </Router>
            </div>
        );
    }
}

export default App;
