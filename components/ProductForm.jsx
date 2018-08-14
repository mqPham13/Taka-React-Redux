import React from 'react'
import {connect} from 'react-redux'
import {addProduct,updateProduct} from '../actions/ProductActions.jsx'


class ProductForm extends React.Component{

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
            productType:'',
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

    componentWillUnmount(){
        this.props.dispatch({type:"UNMOUNT",payload:""})
    }


    handleChange(e){
        var change = {}
        if(e.target.value===null) e.target.value=''
        change[e.target.name] = e.target.value
        this.setState(change)
    }


    addOrUpdate(e){

       
        var dirtyForm = false
        var message = "Field must not be left blank: "

        if (this.state.name === ""){
            dirtyForm = true
            message += "Name,"
        }
        if (this.state.price === ""){
            dirtyForm = true
            message += " Price,"
        }
        if (this.state.description === ""){
            dirtyForm = true
            message += " Description,"
        }
        if (this.state.brand === ""){
            dirtyForm = true
            message += " Brand,"
        }
        if (this.state.producer === ""){
            dirtyForm = true
            message += " Producer"
        }

        if (isNaN(this.state.price)){
            dirtyForm = true
            message += "\nPrice must be numeric"
        }

        if (dirtyForm===true){
            alert(message)
        }else{
            if(this.state.id===undefined || this.state.id===''){
                this.props.dispatch(addProduct({
                    name: this.state.name,
                    price: this.state.price,
                    description: this.state.description,
                    brand: this.state.brand,
                    producer: this.state.producer,
                    imageUrl: this.state.imageUrl,
                    productType: this.state.productType
                })) 
            }else{
                this.props.dispatch(updateProduct({
                    _id: this.state.id,
                    name: this.state.name,
                    price: this.state.price,
                    description: this.state.description,
                    brand: this.state.brand,
                    producer: this.state.producer,
                    imageUrl: this.state.imageUrl,
                    productType: this.state.productType
                }))
            }
        }
    }

    clearForm(){
        this.setState({name: '', id: '', price: 0, description:'', brand:'', producer:'', imageUrl:'', productType:''})
    }

    componentWillReceiveProps(props){
        this.setState({
                       name: props.editedProduct.name, 
                       id: props.editedProduct._id, 
                       price: props.editedProduct.price, 
                       description: props.editedProduct.description, 
                       brand: props.editedProduct.brand, 
                       producer: props.editedProduct.producer, 
                       imageUrl: props.editedProduct.imageUrl,
                       productType: props.editedProduct.productType
        })
    }

    getObjName() {
        var obj = this.state.productTypeChoices.find(obj=>{
            return obj._id === this.state.productType
        })
        return (obj===undefined ? "" : obj.name)
    }


    render(){
        return(
        <div>
            <div className="well">
                <form  onSubmit={e => e.preventDefault()}>
                    <legend>Product Form</legend>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name='name' value={this.state.name} 
                        onChange={this.handleChange.bind(this)}/>

                        <label>Price</label>
                        <input type="text" className="form-control" name='price' value={this.state.price} 
                        onChange={this.handleChange.bind(this)}/>

                        <label>Description</label>
                        <input type="text" className="form-control" name='description' value={this.state.description} 
                        onChange={this.handleChange.bind(this)}/>

                        <label>Brand</label>
                        <input type="text" className="form-control" name='brand' value={this.state.brand} 
                        onChange={this.handleChange.bind(this)}/>

                        <label>Producer</label>
                        <input type="text" className="form-control" name='producer' value={this.state.producer}
                        onChange={this.handleChange.bind(this)}/>

                        <label>Image URL</label>
                        <input type="text" className="form-control" name='imageUrl' 
                        value={this.state.imageUrl} 
                        onChange={this.handleChange.bind(this)}/>

                        <label>Product Type</label>
                <select name="productType" className="form-control" onChange={this.handleChange.bind(this)}>
                            {this.state.id===undefined || this.state.id==='' || this.state.productType===''?
                                    <option value="">Select product type</option>       
                                :
                                    <option value={this.state.productType}>{this.getObjName()}</option>
                            } 

                            {this.state.productTypeChoices.map((pt,index) => 
                                        <option key={index} value={pt._id}>{pt.name}</option>)}                  
                        </select>
                    </div>   
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.addOrUpdate.bind(this)}>
                    Save Product</button>&nbsp;

                    <button type="button" className="btn btn-warning btn-sm" onClick={this.clearForm.bind(this)}>
                    Clear Form</button>
                </form>
            </div>
        </div>
               
        )
    }
}

function mapStateToProps(centralState){
    return {
        products: centralState.products,
        editedProduct: centralState.editedProduct
    }
}

export default connect(mapStateToProps)(ProductForm)


