import React from 'react'
import ProductDisplay from './ProductDisplay.jsx'
import ProductSearch from './ProductSearch.jsx'
import FilterByType from './FilterByType.jsx'
import FilterByPrice from './FilterByPrice.jsx'
import {fetchProducts} from '../actions/ProductActions.jsx'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import '../styles/SearchBox.css'

class AllProductsPage extends React.Component{
	constructor(){
		super()
		this.state={
			filterByType: true
		}
	}

	onToggle(){
		
		this.setState({
			filterByType: !this.state.filterByType
		})
		console.log(this.state.filterByType)
		if (this.state.filterByType===false){
			this.props.dispatch({type:'FILTER_CLEAR'})	
		} else {
			this.props.dispatch(fetchProducts())
		}
	}


	render(){
		return(
			<div>
				<Helmet>
					<meta charSet="utf-8" />
                    <title>Taka - All Products</title>
				</Helmet>
				<div className="container">
					<p className="lead">All Products</p>
                	<hr/>
					<div className="row">
						<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<button type="button" className="btn btn-default btn-sm" onClick={this.onToggle.bind(this)}>
								{this.state.filterByType ? "Toggle filter by price" : "Toggle filter by product type"}
							</button>
						</div>
						<div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
							<ProductSearch/>
						</div>
					</div>	
					<div className="row">
						<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							{this.state.filterByType ?
								<FilterByType/>
								:
								<FilterByPrice/>
							}
						</div>
						<div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
							<ProductDisplay/>
						</div>
					</div>
	        						
				</div>
			</div>
		)
	}
}

function mapStateToProps(centralState){
    return {
    }
}

export default connect(mapStateToProps)(AllProductsPage)
