import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, getProduct, deleteProduct} from '../actions/ProductActions.jsx'
import {numberWithCommas} from '../miscellaneous.js'

class ProductList extends React.Component{

    constructor(){
        super()
        this.state = {
            id: '',
            name: '',
            price: 0,
            description:'', 
            brand:'', 
            producer:'', 
            imageUrl:'',
            activePage: 1,
            productsPerPage: 5,
        }
    }

    componentDidMount(){
        this.load()
    }

    load(){
        this.props.dispatch(fetchProducts())
    }

    handleDelete(id){
        if(confirm('Do you want to delete?')){
            this.props.dispatch(deleteProduct(id))  
        }
    }

    handleEdit(id){
        this.props.dispatch(getProduct(id))  
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
                            <button type="button" className="btn btn-danger btn-sm" 
                            onClick={()=>this.handleDelete(p._id)}>Delete</button>&nbsp;
                            <button type="button" className="btn btn-warning btn-sm" 
                            onClick={()=>this.handleEdit(p._id)}>Edit</button>
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
            <p className="lead">Product Details List</p>
            <table className="table table-bordered">
                <thead>
                    <tr className="success">
                        <th className="th2">Name</th>
                        <th className="th1">Price (VND)</th>
                        <th className="th2">Description</th>
                        <th className="th1">Brand</th>
                        <th className="th1">Producer</th>
                        <th className="th1">Image URL</th>
                        <th className="th1">Actions</th>
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
export default connect(mapStateToProps)(ProductList)

