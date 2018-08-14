import React from 'react'
import '../styles/ProductDisplay.css'
import {connect} from 'react-redux'
import {fetchProducts} from '../actions/ProductActions.jsx'
import {numberWithCommas} from '../miscellaneous.js'

class ProductDisplay extends React.Component{

    constructor(){
        super()
        this.state = {
            activePage: 1,
            productsPerPage: 9,
        }
    }

    componentDidMount(){
        this.load()
    }

    componentWillReceiveProps(){
        this.setState({
            activePage: 1
        })
    }

    load(){
        this.props.dispatch(fetchProducts())
    }

    handlePageChange(e) {
        this.setState({activePage: e.target.id})
    }

    render(){
        //logic to search
        const searchResults = []
        
        this.props.products.map((p) => {
            if (p.name.toLowerCase().includes(this.props.searching) || this.props.searching===''){
                searchResults.push(p)
            }
        })

        //logic to filter
        const filterResults = []

        if(this.props.priceRange.length !== 0){
            searchResults.map((p)=>{this.props.priceRange.map((price) => {

                if(price.min==="" & price.max===""){
                        filterResults.push(p)
                    } else {
                        if(parseInt(price.min)<=parseInt(p.price) && parseInt(p.price) <= parseInt(price.max)){
                            filterResults.push(p)
                        }
                    }
                })
            })
        } else {
            searchResults.map((p)=>{filterResults.push(p)})
        }

        //pagination logic
        const {activePage, productsPerPage} = this.state
        const indexOfLastProduct = activePage*productsPerPage
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage
        const currentProducts = filterResults.slice(indexOfFirstProduct,indexOfLastProduct)

        const renderProducts = currentProducts.map((p, index) => {
                 return (<div className="col-md-4 column productbox" key={index}>
                                                        <img src={p.imageUrl!==""? p.imageUrl : 
                                                        "https://www.rspcansw.org.au/wp-content/themes/noPhotoFound.png"} className="img"/>
                                                        <div className="producttitle">{p.name}</div>
                                                        <div className="productprice">
                                                        <div className="pricetext">{numberWithCommas(p.price)} VND</div>
                                                        </div>
                                                    </div>)
              
        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filterResults.length / productsPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li key={number}>
              <a id={number} onClick={this.handlePageChange.bind(this)}>{number}</a>
            </li>
          )
        })


        if (filterResults.length > 0){
            return(
            <div>
                <div className="row">
                    {renderProducts}
                </div>
                <div className="row">
                    <ul className="pagination pagination-sm">
                        {renderPageNumbers}
                    </ul>  
                </div>
            </div>)
        } else {          
            return (
                <div>
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Nothing found</h3>
                        </div>
                        <div className="panel-body">
                            Sorry we could not find any products matching those criterion
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(centralState){
    return {
        products: centralState.products,
        searching: centralState.searchedProduct,
        priceRange: centralState.priceRange
    }
}
export default connect(mapStateToProps)(ProductDisplay)

