import React from 'react'
import UneditableProductList from './UneditableProductList.jsx'
import UneditableProductGrid from './UneditableProductGrid.jsx'
import '../styles/ProductDetails.css'
import {Helmet} from 'react-helmet'

export default class ProductDetailsPage extends React.Component{
	constructor(){
		super()
		this.state={
			listMode: true
		}
	}

	onListClick(){
		this.setState({
			listMode: true
		})
	}

	onGridClick(){
		this.setState({
			listMode: false
		})
	}

	render(){
		return(
			<div>
				<Helmet>
					<meta charSet="utf-8" />
                    <title>Taka - Product Details</title>
                </Helmet>
				<div className="container">
					<div className="well well-sm">
						<strong className="lb">View mode</strong>&nbsp;
	        			<div className="btn-group">
	            			<a className="btn btn-default btn-sm" onClick={this.onListClick.bind(this)}><span className="glyphicon glyphicon-th-list">
	            			</span>List</a> 
	            			<a className="btn btn-default btn-sm" onClick={this.onGridClick.bind(this)}><span className="glyphicon glyphicon-th"></span>Grid</a>
        				</div>
   				 	</div>
   				 	{this.state.listMode ? <UneditableProductList/> : <UneditableProductGrid/>}
				</div>
			</div>
		)
	}
}