import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {Provider} from 'react-redux'
import products from './reducers/productsReducer.jsx'
import editedProduct from './reducers/editedProductReducer.jsx'
import store from './store.js'


//logging to console
var logging = store => next => action => {
    console.log(action.type)
}

ReactDOM.render(
	<div>
		<Provider store={store}>    
		    <App />
		</Provider>    
	</div>
	    , document.getElementById('root')
)
