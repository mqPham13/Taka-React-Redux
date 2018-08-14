import React from 'react'
import {addProductType, updateProductType} from '../actions/ProductTypeActions.jsx'
import {connect} from 'react-redux'

class ProductTypeForm extends React.Component{

    constructor(){
        super()
        this.state = {
            id: '',
            name: ''
        }
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
        console.log(this.state)

        if(this.state.name===""){
            alert("Product Type name must not be left blank")
        } else {

            if(this.state.id===undefined || this.state.id===''){
                this.props.dispatch(addProductType({
                    name: this.state.name
                })) 
            }
            else{
                this.props.dispatch(updateProductType({
                    _id: this.state.id,
                    name: this.state.name
                }))
            }
        }

        this.clearForm()
    }

    clearForm(){
        this.setState({name: '', id: ''})
    }

    componentWillReceiveProps(props){
        this.setState({
                       name: props.editedProductType.name, 
                       id: props.editedProductType._id, 
                   })
    }


    render(){
        return(
        <div>
            <div className="well">
                <form  onSubmit={e => e.preventDefault()}>
                    <legend>Product Type Form</legend>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name='name' value={this.state.name} 
                        onChange={this.handleChange.bind(this)}/>
                    </div>   
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.addOrUpdate.bind(this)}>
                    Save Product Type</button>&nbsp;

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
        productTypes: centralState.productTypes,
        editedProductType: centralState.editedProductType
    }
}

export default connect(mapStateToProps)(ProductTypeForm)


