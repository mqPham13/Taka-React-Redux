import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsByType, fetchProducts} from '../actions/ProductActions.jsx'
import '../styles/FilterByType.css'


class FilterByType extends React.Component{

    constructor(){
        super()
        this.state = {
            productType:'all',
            productTypeChoices:[],
        }
        this.getObjName = this.getObjName.bind(this)
    }

    componentDidMount(){
        let initialProductTypes = []
        fetch('http://pybro.crabdance.com:8080/productTypes')
        .then(function(res){
            return res.json()
        })
        .then(data => {
            initialProductTypes = data.map((pt) => {return pt})
            this.setState({
                productTypeChoices: initialProductTypes
            })
            console.log(this.state.productTypeChoices)
        })
    }

    getObjName() {
        var obj = this.state.productTypeChoices.find(obj=>{
            return obj._id === this.state.productType
        })
        return (obj===undefined ? "" : obj.name)
    }

    handleChange(e){
        this.setState({
            productType: e.target.value
        })
    }

    onFilter(){
        if (this.state.productType==='all'){
            this.props.dispatch(fetchProducts())
        } else {
            this.props.dispatch(fetchProductsByType(this.state.productType))
        }
    }


    render(){
        return(
        <div>  
            <div className="well well-sm">
                <label>Product Type</label>
                <select name="productType" className="form-control" onChange={this.handleChange.bind(this)}>
                    <option value='all'>All Product Types</option>
                    {this.state.productTypeChoices.map((pt,index)=><option key={index} value={pt._id}>
                    {pt.name}</option>)}                  
                </select>
                <button type="button" className="btn btn-success btn-sm" onClick={this.onFilter.bind(this)}>
                    Filter
                </button>
            </div>
        </div>  
        )
    }
}

function mapStateToProps(centralState){
    return {
    }
}

export default connect(mapStateToProps)(FilterByType)


