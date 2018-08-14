import React from 'react'
import {connect} from 'react-redux'
import '../styles/SearchBox.css'

class ProductSearch extends React.Component{
	constructor(){
		super()
		this.state={
			searchText:''
		}
	}

	handleSearchBarChange(e){
		this.setState({
			searchText: e.target.value
		})
	}

	onSearch(){
		this.props.dispatch({type:'SEARCH_PRODUCT',payload:this.state.searchText})
	}


	render(){
		return(
			<div>
				<div className="col-sm-6 col-sm-offset-6">
		            <div className="imaginary_container"> 
		                <div className="input-group stylish-input-group">
		                    <input type="text" className="form-control" placeholder="Search" onChange={this.handleSearchBarChange.bind(this)}/>
		                    <span className="input-group-addon">
		                        <button type="submit" onClick={this.onSearch.bind(this)}>
		                            <span className="glyphicon glyphicon-search"></span>
		                        </button>  
		                    </span>
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
export default connect(mapStateToProps)(ProductSearch)