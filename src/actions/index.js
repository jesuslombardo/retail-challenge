import apiary from '../apis/apiary';
import _ from 'lodash';

export const fetchUser = () => async dispatch => {
    const response = await apiary.get('/user/me');
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
}

export const fetchProducts = () => async (dispatch) => {
    const response = await apiary.get('/products');
    const paginatedProducts = paginate(response.data);
    dispatch({
        type: 'FETCH_PRODUCTS',
        payload: {'products' : response.data, 'paginatedProducts' : paginatedProducts}
    });
}

const paginate = (products) => {
    const perPage = 6;
    const paginatedProducts = [];
    const totalElements = products.length;
    const cuts = Math.ceil(totalElements / perPage);

    for(let i = 0; i < cuts; i++){
        paginatedProducts.push(products.slice(i*perPage,(i+1)*perPage));
    }
    return paginatedProducts;
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
    const products = getState().products.products;
    const response = _.orderBy(products, ['cost'],['asc']); //lower first
    const paginatedProducts = paginate(response);
    dispatch({
        type: 'SORT_PRODUCTS',
        payload: {'products' : response, 'paginatedProducts' : paginatedProducts}
    });
}

export const getHighestProducts = () => (dispatch, getState) => {
    const products = getState().products.products;
    const response = _.orderBy(products, ['cost'],['desc']); //lower first
    const paginatedProducts = paginate(response);
    dispatch({
        type: 'SORT_PRODUCTS',
        payload: {'products' : response, 'paginatedProducts' : paginatedProducts}
    });
}