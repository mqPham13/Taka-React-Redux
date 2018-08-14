import types from '../types.jsx'

//ACTIONS
export function fetchProductTypes(){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/productTypes')
        .then(function(res){
            return res.json()
        })
        .then(function(data){

            console.log(data)
            dispatch({
                type: types.FETCH_PRODUCT_TYPES_SUCCESS,
                payload: data
            })
        })
    }
}

export function addProductType(productType){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/productTypes', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            method: 'post', 
            body: JSON.stringify(productType)
        })
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            dispatch({
                type: types.ADD_PRODUCT_TYPE,
                payload: data
            })
        })
    }
}

export function updateProductType(productType){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/productTypes', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            method: 'put', 
            body: JSON.stringify(productType)
        })
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            dispatch(fetchProductTypes())
        })
    }
}

export function deleteProductType(id){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/productTypes/'+id, {
            method: 'delete'
        })
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            dispatch({
                type: types.DELETE_PRODUCT_TYPE,
                payload: id
            })
        })
    }
}

export function getProductType(id){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/productTypes/'+id)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            dispatch({
                type: types.EDIT_PRODUCT_TYPE,
                payload: data
            })
        })
    }
}
