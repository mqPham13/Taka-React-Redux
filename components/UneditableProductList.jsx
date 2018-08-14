import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../actions/ProductActions.jsx'
import {numberWithCommas} from '../miscellaneous.js'

class UneditableProductList extends React.Component{

    constructor(){
        super()
        this.state = {
            productTypeChoices: [],
            activePage: 1,
            productsPerPage: 5,
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
        this.setState({activePage: e.target.id})
    }


    render(){
        const {activePage, productsPerPage} = this.state
        const indexOfLastProduct = activePage*productsPerPage
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage
        const currentProducts = this.props.products.slice(indexOfFirstProduct,indexOfLastProduct)

        const renderProducts = currentProducts.map((p, index) => {
          return (<tr scope="row" key={index}>
                        <td>{p.name}</td>
                        <td>{numberWithCommas(p.price)}</td>
                        <td>{p.description}</td>
                        <td>{p.brand}</td>
                        <td>{p.producer}</td>
                        <td>{p.imageUrl===''? 
                            <span className="label label-danger">Not Available</span> :
                            <a href={p.imageUrl}>Image</a>}
                        </td>
                        <td>
                          {p.productType===""?
                            <span className="label label-warning">Unspecified</span>
                            :
                            this.getProductTypeName(p.productType)}
                        </td>
                    </tr>)
        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.products.length / productsPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li key={number}>
              <a id={number} onClick={this.handlePageChange.bind(this)}>{number}</a>
            </li>
          )
        })

        return(
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr className="success">
                        <th className="th2">Name</th>
                        <th className="th1">Price (VND)</th>
                        <th className="th2">Description</th>
                        <th className="th1">Brand</th>
                        <th className="th1">Producer</th>
                        <th className="th1">Image URL</th>
                        <th className="th1">Product Types</th>
                    </tr>
                </thead>
                <tbody>
                    {renderProducts}
                </tbody>
            </table>
            <ul className="pagination pagination-sm">
                {renderPageNumbers} 
            </ul>
        </div>
    )}
    }
function mapStateToProps(centralState){
    return {
        products: centralState.products
    }
}
export default connect(mapStateToProps)(UneditableProductList)

