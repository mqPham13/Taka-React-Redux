import React from 'react'
import ProductForm from './ProductForm.jsx'
import ProductList from './ProductList.jsx'
import ProductTypeForm from './ProductTypeForm.jsx'
import ProductTypeList from './ProductTypeList.jsx'
import {connect} from 'react-redux'

class HomePage extends React.Component{

    constructor(){
        super()
        this.state = {
            productsListVisible: true
        }
    }

    handleButton(){
        this.setState({
            productsListVisible: !(this.state.productsListVisible)
        })
    }

    render(){
        return(
        
            
        <div>
            <div className="container">
                <button type="button" onClick={this.handleButton.bind(this)} className="btn btn-default btn-sm">
                {this.state.productsListVisible ? "Show Product Types" : "Show Product List"}</button>
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                       {(this.state.productsListVisible) ? <ProductForm/>:<ProductTypeForm/>}
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {(this.state.productsListVisible) ? <ProductList/>:<ProductTypeList/>}
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
export default connect(mapStateToProps)(HomePage)

