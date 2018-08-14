export default (state = [], action) =>{
    switch(action.type){
     case'FETCH_PRODUCT_TYPES_SUCCESS':
        return action.payload
    case 'ADD_PRODUCT_TYPE':
        console.log(action.payload)
        return [...state, action.payload]
    case'DELETE_PRODUCT_TYPE': //by id now
        return state.filter((p)=>p._id!==action.payload)
    default:
        return state
    }
}