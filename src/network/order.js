import {GET, POST, PUT, DELETE} from "./index";
import ParseRoute from "../routes/parse";
import {
    API_CREATE_ORDER, API_UPDATE_USER, API_GET_ORDER, API_STRIPE_CHARGE
} from "../routes/api";
import App from "../App";


export const CREATE_ORDER = (parameter, callback) =>  {
    return POST(ParseRoute.local(API_CREATE_ORDER), parameter).set('USER-KEY',App.getUserToken().token).end(callback);
};

export const GET_ORDER = (parameter, callback) =>  {
    return GET(ParseRoute.local(API_GET_ORDER, parameter)).set('USER-KEY',App.getUserToken().token).end(callback);
};

export const UPDATE_USER = (parameter, callback) =>  {
    return PUT(ParseRoute.local(API_UPDATE_USER), parameter).set('USER-KEY',App.getUserToken().token).end(callback);
};

export const STRIPE_CHARGE = (parameter, callback) =>  {
    return POST(ParseRoute.local(API_STRIPE_CHARGE), parameter).set('USER-KEY',App.getUserToken().token).end(callback);
};
