import apiary from '../apis/apiary';

export const fetchUser = () => async dispatch => {
    const response = await apiary.get('/user/me');
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
}