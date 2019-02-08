import apiary from '../apis/apiary';
import _ from 'lodash';

export const fetchUser = () => async dispatch => {
    const response = await apiary.get('/user/me');
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
}

export const fetchProducts = (perPage) => async (dispatch) => {
    const response = await apiary.get('/products');
    const paginatedProducts = paginate(response.data, perPage);
    const numPages = paginatedProducts.length;
    const currentPage = 0;

    dispatch({
        type: 'FETCH_PRODUCTS',
        payload: {
            'products' : response.data,
            'paginatedProducts' : paginatedProducts,
            'numPages' : numPages,
            'currentPage' : currentPage,
            'perPage' : perPage
        }
    });
}

export const addPoints = () => async (dispatch, getState) => {
    const body = {
        'amount': 1000
      };
    const response = await apiary.post('/user/points',body);
    
    dispatch({
        type: 'ADD_POINTS',
        payload: response.data
    });
}

export const getLowerProducts = () => (dispatch, getState) => {
    const objProducts = getState().products;
    objProducts.products = _.orderBy(objProducts.products, ['cost'],['asc']); //lower first
    return sortProducts(dispatch, objProducts, getState);
}

export const getHighestProducts = () => (dispatch, getState) => {
    const objProducts = getState().products;
    objProducts.products = _.orderBy(objProducts.products, ['cost'],['desc']); //lower first
    return sortProducts(dispatch, objProducts, getState);
}

export const nextPage = () => (dispatch, getState) => {
    const objProducts = getState().products;
    objProducts.currentPage = objProducts.currentPage + 1
    return sortProducts(dispatch, objProducts, getState);
}

export const prevPage = () => (dispatch, getState) => {
    const objProducts = getState().products;
    objProducts.currentPage = objProducts.currentPage - 1
    return sortProducts(dispatch, objProducts, getState);
}

/********** */
const paginate = (products, perPage) => {
    const paginatedProducts = [];
    const totalElements = products.length;
    const cuts = Math.ceil(totalElements / perPage);

    for(let i = 0; i < cuts; i++){
        paginatedProducts.push(products.slice(i*perPage,(i+1)*perPage));
    }
    return paginatedProducts;
}

const sortProducts = (dispatch, response, getState) => {
    const perPage = getState().products.perPage;
    const paginatedProducts = paginate(response.products, perPage);
    const numPages = paginatedProducts.length;
    dispatch({
        type: 'SORTING_PRODUCTS',
        payload: {
            'products' : response.products,
            'paginatedProducts' : paginatedProducts,
            'numPages' : numPages,
            'currentPage' : response.currentPage,
            'perPage' : perPage
        }
    });
}
/********** */

export const setRedeem = (product) => async (dispatch,getState) => {
    const body = {
        'productId': product._id
      };
    await apiary.post('/redeem',body);

    dispatch(fetchUser());
}
