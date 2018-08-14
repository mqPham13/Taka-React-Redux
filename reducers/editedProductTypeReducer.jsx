export default (state = {id: '', name: ''}, action) => {
    if(action.type==='EDIT_PRODUCT_TYPE'){
        return action.payload
    }
    else if(action.type==='UNMOUNT'){
    	return state = {id: '', name: ''}
    }
    else{ 
    	return state
    }
}