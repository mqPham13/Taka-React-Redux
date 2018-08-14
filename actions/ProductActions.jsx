import types from '../types.jsx'

//ACTIONS
export function fetchProducts(){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/products')
        .then(function(res){
            return res.json()
        })
        .then(function(data){

            console.log(data)
            dispatch({
                type: types.FETCH_PRODUCTS_SUCCESS,
                payload: data
            })
        })
    }
}

export function addProduct(product){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/products', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            method: 'post', 
            body: JSON.stringify(product)
        })
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            dispatch({
                type: types.ADD_PRODUCT,
                payload: data
            })
        })
    }
}

export function updateProduct(product){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/products', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            method: 'put', 
            body: JSON.stringify(product)
        })
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            dispatch(fetchProducts())
        })
    }
}

export function deleteProduct(id){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/products/'+id, {
            method: 'delete'
        })
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            dispatch({
                type: types.DELETE_PRODUCT,
                payload: id
            })
        })
    }
}

export function getProduct(id){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/products/'+id)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            dispatch({
                type: types.EDIT_PRODUCT,
                payload: data
            })
        })
    }
}

export function fetchProductsByType(id){
    return function(dispatch){
        fetch('http://pybro.crabdance.com:8080/products/byType/'+id)
        .then(function(res){
            return res.json()
        })
        .then(function(data){

            console.log(data)
            dispatch({
                type: types.FETCH_PRODUCTS_BY_TYPE_SUCCESS,
                payload: data
            })
        })
    }
}

