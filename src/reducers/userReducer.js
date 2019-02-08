export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_USER':
            return action.payload
        case 'ADD_POINTS':
            state.points = action.payload["New Points"];
            return { ...state}
        default:
            return state;
    }
}