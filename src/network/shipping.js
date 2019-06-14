import {GET, POST} from "./index";
import {API_GET_USER, API_SHIPPING_REGIONS, API_SHIPPING_REGION_DETAILS} from "../routes/api";
import App from "../App";
import ParseRoute from "../routes/parse";

export const GET_SHIPPING_REGIONS = (params, callback) =>  {
    return GET(API_SHIPPING_REGIONS, params).set('USER-KEY',App.getUserToken().token).end(callback);
};
export const GET_SHIPPING_REGION_DETAILS = (params, callback) =>  {
    return GET(ParseRoute.local(API_SHIPPING_REGION_DETAILS, params), {}).set('USER-KEY',App.getUserToken().token).end(callback);
};
