export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_USER':
            return [...state, action.payload]
        case 'ADD_POINTS':
            return state.map(function(user){
                user.points = action.payload["New Points"];
                return user;
            })
        default:
            return state;
    }
}