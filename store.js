import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import products from './reducers/productsReducer.jsx'
import editedProduct from './reducers/editedProductReducer.jsx'
import productTypes from './reducers/productTypesReducer.jsx'
import editedProductType from './reducers/editedProductTypeReducer.jsx'
import searchedProduct from './reducers/searchedProductReducer.jsx'
import priceRange from './reducers/priceRangeReducer.jsx'

//Combine all reducers
var centralState = combineReducers({
    products, 
    editedProduct,
    productTypes,
    editedProductType,
    searchedProduct,
    priceRange
})

//create and provide store to App
const store = createStore(centralState, applyMiddleware(thunk))

export default store