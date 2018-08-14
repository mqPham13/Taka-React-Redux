import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../actions/ProductActions.jsx'
import {numberWithCommas} from '../miscellaneous.js'

class UneditableProductGrid extends React.Component{

    constructor(){
        super()
        this.state = {
            productTypeChoices: [],
            activePage: 1,
            productsPerPage: 6,
        }
    }

    componentWillMount(){
        this.load()

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


    load(){
        this.props.dispatch(fetchProducts())
    }

    getProductTypeName(id) {
        var obj = this.state.productTypeChoices.find(obj=>{
            return obj._id === id
        })
        return (obj===undefined ? "" : obj.name)
    }

    handlePageChange(e) {
        console.log(e.target.id)
        this.setState({activePage: e.target.id})
    }


    render(){
        const {activePage, productsPerPage} = this.state
        const indexOfLastProduct = activePage*productsPerPage
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage
        const currentProducts = this.props.products.slice(indexOfFirstProduct,indexOfLastProduct)
        console.log(currentProducts)

        const renderProducts = currentProducts.map((p, index) => {
          return (<div className="item col-xs-4 col-lg-4" key={index}>
                    <div className="thumbnail card">
                        <div className="caption card-body">
                            <h4 className="group card-title inner list-group-item-heading">
                                {p.name}</h4>
                                <ul>
                                    <li>Price: {numberWithCommas(p.price)} VND</li>
                                    <li>Description: {p.description}</li>
                                    <li>Brand: {p.brand}</li>
                                    <li>Producer: {p.producer}</li>
                                    <li>ImageUrl: {p.imageUrl===''? 
                                        <span className="label label-danger">Not Available</span> :
                                        <a href={p.imageUrl}>Image</a>}
                                    </li>
                                    <li>Product Type:&nbsp;
                                          {p.productType===""?
                                            <span className="label label-warning">Unspecified</span>
                                            :
                                            this.getProductTypeName(p.productType)}
                                    </li>
                                </ul> 
                        </div>
                    </div>
                </div>)
        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.products.length / productsPerPage); i++) {
          pageNumbers.push(i);
        }
        console.log(pageNumbers)

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li key={number}>
              <a id={number} onClick={this.handlePageChange.bind(this)}>{number}</a>
            </li>
          )
        })

        return(
        <div>  
            <div class="row">
                {renderProducts}
            </div>
            <div class="row">
                <ul className="pagination pagination-sm">
                    {renderPageNumbers} 
                </ul>  
            </div>      
        </div>
        )
    }
}
function mapStateToProps(centralState){
    return {
        products: centralState.products
    }
}
export default connect(mapStateToProps)(UneditableProductGrid)

