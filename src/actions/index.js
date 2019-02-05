import apiary from '../apis/apiary';

export const fetchUser = () => async dispatch => {
    const response = await apiary.get('/user/me');
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
}

export const fetchProducts = () => async (dispatch) => {
    const response = await apiary.get('/products');
    //here goes the parser method then put it here
    dispatch({
        type: 'FETCH_PRODUCTS',
        payload: response.data
    });
}