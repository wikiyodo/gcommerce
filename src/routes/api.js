let addPrefix = (route) =>  {
    return 'https://backendapi.turing.com/'+route;
};

export const ROUTE_CATEGORY_LISTINGS = addPrefix('categories');
export const ROUTE_DEPARTMENT_LISTINGS = addPrefix('departments');
export const ROUTE_DEPARTMENT_CATEGORIES = addPrefix('categories/inDepartment/:department_id');
export const ROUTE_ATTRIBUTES = addPrefix('attributes');
export const ROUTE_ATTRIBUTES_VALUES = addPrefix('attributes/values/:attribute_id');
export const ROUTE_PRODUCT_ATTRIBUTES_VALUES = addPrefix('attributes/inProduct/:product_id');


export const ROUTE_PRODUCTS = addPrefix('products/inDepartment/:department_id');
export const ROUTE_PRODUCTS_SEARCH = addPrefix('products/search');
export const API_PRODUCTS_DETAILS = addPrefix('products/:product_id/details');
export const API_PRODUCTS_LOCATION = addPrefix('products/:product_id/locations');
export const API_PRODUCTS_REVIEWS = addPrefix('products/:product_id/reviews');


export const API_REGISTER_USER = addPrefix('customers');
export const API_LOGIN_USER = addPrefix('customers/login');
export const API_GET_USER = addPrefix('customer');
export const API_UPDATE_USER = addPrefix('customers/address');


export const API_CART_ID_GENERATE = addPrefix('shoppingcart/generateUniqueId');
export const API_ADD_ITEM_TO_CART = addPrefix('shoppingcart/add');
export const API_GET_ITEMS_IN_CART = addPrefix('shoppingcart/:cart_id');
export const API_UPDATE_ITEM_IN_CART = addPrefix('shoppingcart/update/:item_id');
export const API_DELETE_ITEM_IN_CART = addPrefix('shoppingcart/removeProduct/:item_id');

export const API_SHIPPING_REGIONS = addPrefix('shipping/regions');
export const API_SHIPPING_REGION_DETAILS = addPrefix('shipping/regions/:shipping_id');

export const API_TAXES = addPrefix('tax');

export const API_CREATE_ORDER = addPrefix('orders');
export const API_GET_ORDER = addPrefix('orders/:order_id');

export const API_STRIPE_CHARGE = addPrefix('stripe/charge');
