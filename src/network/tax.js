import {GET, POST} from "./index";
import {API_TAXES} from "../routes/api";
import App from "../App";
import ParseRoute from "../routes/parse";

export const GET_TAXES = (params, callback) =>  {
    return GET(API_TAXES, params).set('USER-KEY',App.getUserToken().token).end(callback);
};
