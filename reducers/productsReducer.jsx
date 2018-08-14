export default (state = [], action) =>{
    switch(action.type){
     case'FETCH_PRODUCTS_SUCCESS':
        return action.payload
    case 'ADD_PRODUCT':
        console.log(action.payload)
        return [...state, action.payload]
    case'DELETE_PRODUCT': //by id now
        return state.filter((p)=>p._id!==action.payload)
    case 'FETCH_PRODUCTS_BY_TYPE_SUCCESS':
        return action.payload
    default:
        return state
    }
}

