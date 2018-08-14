import React from 'react'
import {connect} from 'react-redux'
import {fetchProductTypes, getProductType, deleteProductType} from '../actions/ProductTypeActions.jsx'

class ProductTypeList extends React.Component{

    constructor(){
        super()
        this.state = {
            id: '',
            name: '',
        }
    }

    componentDidMount(){
        this.load()
    }


    load(){
        this.props.dispatch(fetchProductTypes())
    }

    handleDelete(id){
        if(confirm('Do you want to delete?')){
            this.props.dispatch(deleteProductType(id))  
        }
    }

    handleEdit(id){
        this.props.dispatch(getProductType(id))  
    }

    render(){
        return(
        <div>
            <p className="lead">Product Type List</p>
            <table className="table table-bordered">
                <thead>
                    <tr className="success">
                        <th className="th2">Name</th>
                        <th className="th2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.productTypes.map((p,index)=>
                    <tr scope="row" key={index}>
                        <td>{p.name}</td>
                        <td>
                            <button type="button" className="btn btn-danger btn-sm" 
                            onClick={()=>this.handleDelete(p._id)}>Delete</button>&nbsp;
                            <button type="button" className="btn btn-warning btn-sm" 
                            onClick={()=>this.handleEdit(p._id)}>Edit</button>
                        </td>
                    </tr> )}
                </tbody>
            </table>
        </div>
        )
    }
}
function mapStateToProps(centralState){
    return {
        productTypes: centralState.productTypes
    }
}
export default connect(mapStateToProps)(ProductTypeList)

