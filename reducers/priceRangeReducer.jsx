export default (state = [], action) =>{
    switch(action.type){
    case 'FILTER_PRICE':
        return [action.payload]
    case 'FILTER_CLEAR':
    	return state = []
    default:
        return state
    }
}