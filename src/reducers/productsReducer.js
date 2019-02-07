export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_PRODUCTS':
            return action.payload;
        case 'SORT_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}