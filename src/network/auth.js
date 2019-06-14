import {GET, POST} from "./index";
import {API_LOGIN_USER, API_REGISTER_USER, API_GET_USER} from "../routes/api";
import App from "../App";


export const CHECK_AUTHENTICATION = (apiKey, callback) =>  {
    // return GET(ROUTE_AUTHENTICATION_CHECK, {}).set('Authorization',apiKey).end(callback);
};

export const REGISTER_USER = (params, callback) =>  {
    return POST(API_REGISTER_USER, params).end(callback);
};

export const LOGIN_USER = (params, callback) =>  {
    return POST(API_LOGIN_USER, params).end(callback);
};

export const GET_USER = (params, callback) =>  {
    return GET(API_GET_USER, params).set('USER-KEY',App.getUserToken().token).end(callback);
};
