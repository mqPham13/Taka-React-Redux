import React from 'react'
import './Styles/App.css'
import AllProductsPage from './components/AllProductsPage.jsx'
import ProductDetailsPage from './components/ProductDetailsPage.jsx'
import HomePage from './components/HomePage.jsx'
import {BrowserRouter as Router, browserHistory as history, Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'

class App extends React.Component{    
    render(){
        return(
        <Router history={history}>
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Taka - Home</title>
                </Helmet>

                <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img src='./15.png'/></a>
                    <ul className="nav navbar-nav">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-products">All Products</NavLink>
                        </li>
                        <li>
                            <NavLink to="/product-details">Product Details</NavLink>
                        </li>
                    </ul>
                </div>
                </nav>
        
                <Route path="/" exact component={HomePage}/>
                <Route path="/all-products" component={AllProductsPage}/>
                <Route path="/product-details" component={ProductDetailsPage}/>
            </div>
        </Router>
        )
    }
}
function mapStateToProps(centralState){
    return {

    }
}
export default connect(mapStateToProps)(App)

