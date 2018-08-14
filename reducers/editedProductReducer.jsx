//Always has to initialize this, otherwise it will inject a undefined to edit form
export default (state = {id: '', name: '', price: 0, description:'', 
                        brand:'', producer:'', imageUrl:'', productType:''}, action) => {
    if(action.type==='EDIT_PRODUCT'){
        return action.payload
    } 
    else if (action.type==='UNMOUNT'){ 
    	return state = {id: '', name: '', price: 0, description:'', 
                        brand:'', producer:'', imageUrl:'', productType:''}
    }
    else{
    	return state
    }
}