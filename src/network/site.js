import {GET} from "./index";
import {
    ROUTE_ATTRIBUTES, ROUTE_ATTRIBUTES_VALUES, ROUTE_CATEGORY_LISTINGS, ROUTE_DEPARTMENT_CATEGORIES,
    ROUTE_DEPARTMENT_LISTINGS
} from "../routes/api";
import ParseRoute from "../routes/parse";

export const GET_SITE_CATEGORIES = (formData, callback) =>  {
    return GET(ROUTE_CATEGORY_LISTINGS, formData).end(callback);
};

export const GET_SITE_DEPARTMENTS = (formData, callback) =>  {
    return GET(ROUTE_DEPARTMENT_LISTINGS, formData).end(callback);
};


export const GET_DEPARTMENTS_CATEGORIES = (urlData, callback) =>  {
    return GET(ParseRoute.local(ROUTE_DEPARTMENT_CATEGORIES, urlData), {}).end(callback);
};

export const GET_ATTRIBUTES = (urlData, callback) =>  {
    return GET(ParseRoute.local(ROUTE_ATTRIBUTES, urlData), {}).end(callback);
};


export const GET_ATTRIBUTES_VALUES = (urlData, callback) =>  {
    return GET(ParseRoute.local(ROUTE_ATTRIBUTES_VALUES, urlData), {}).end(callback);
};
