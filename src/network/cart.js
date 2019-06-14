import {GET, POST, PUT, DELETE} from "./index";
import ParseRoute from "../routes/parse";
import {
    API_CART_ID_GENERATE, API_ADD_ITEM_TO_CART,
    API_PRODUCTS_DETAILS, API_PRODUCTS_LOCATION, API_PRODUCTS_REVIEWS, ROUTE_PRODUCTS,
    ROUTE_PRODUCTS_SEARCH,
    API_GET_ITEMS_IN_CART,
    API_UPDATE_ITEM_IN_CART,
    API_DELETE_ITEM_IN_CART
} from "../routes/api";
import App from "../App";


export const GET_GENERATE_CART_ID = (parameter, urlParam, callback) =>  {
    return GET(ParseRoute.local(API_CART_ID_GENERATE, urlParam), parameter).set('USER-KEY',App.getUserToken().token).end(callback);
};

export const ADD_ITEM_TO_CARD = (parameter, callback) =>  {
    return POST(ParseRoute.local(API_ADD_ITEM_TO_CART), parameter).set('USER-KEY',App.getUserToken().token).end(callback);
};

export const GET_CART_ITEMS = (parameter, callback) =>  {
    return GET(ParseRoute.local(API_GET_ITEMS_IN_CART, parameter)).set('USER-KEY',App.getUserToken().token).end(callback);
};

export const UPDATE_CART_ITEM = (parameter, payload, callback) =>  {
    return PUT(ParseRoute.local(API_UPDATE_ITEM_IN_CART, parameter),payload).set('USER-KEY',App.getUserToken().token).end(callback);
};

export const DELETE_CART_ITEM = (parameter, payload, callback) =>  {
    return DELETE(ParseRoute.local(API_DELETE_ITEM_IN_CART, parameter),payload).set('USER-KEY',App.getUserToken().token).end(callback);
};
