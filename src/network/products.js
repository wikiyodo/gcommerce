import {GET, POST} from "./index";
import ParseRoute from "../routes/parse";
import {
    API_PRODUCTS_DETAILS, API_PRODUCTS_LOCATION, API_PRODUCTS_REVIEWS, ROUTE_PRODUCTS,
    ROUTE_PRODUCTS_SEARCH, ROUTE_PRODUCT_ATTRIBUTES_VALUES
} from "../routes/api";
import App from "../App";


export const GET_PRODUCTS = (parameter, urlParam, callback) =>  {
    return GET(ParseRoute.local(ROUTE_PRODUCTS, urlParam), parameter).end(callback);
};

export const SEARCH_PRODUCTS = (parameter, urlParam, callback) =>  {
    return GET(ParseRoute.local(ROUTE_PRODUCTS_SEARCH, urlParam), parameter).end(callback);
};


export const GET_PRODUCT = (parameter, urlParam, callback) =>  {
    return GET(ParseRoute.local(API_PRODUCTS_DETAILS, urlParam), parameter).end(callback);
};

export const GET_PRODUCT_LOCATION = (parameter, urlParam, callback) =>  {
    return GET(ParseRoute.local(API_PRODUCTS_LOCATION, urlParam), parameter).end(callback);
};
export const GET_PRODUCT_REVIEWS = (parameter, urlParam, callback) =>  {
    return GET(ParseRoute.local(API_PRODUCTS_REVIEWS, urlParam), parameter).end(callback);
};
export const GET_PRODUCT_ATTRIBUTES = (urlParam, callback) =>  {
    return GET(ParseRoute.local(ROUTE_PRODUCT_ATTRIBUTES_VALUES, urlParam), {}).end(callback);
};

export const POST_PRODUCT_REVIEW = (parameter, urlParam, callback) =>  {
    return POST(ParseRoute.local(API_PRODUCTS_REVIEWS, urlParam), parameter).set('USER-KEY',App.getUserToken().token).end(callback);
};
