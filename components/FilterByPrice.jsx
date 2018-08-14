import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../actions/ProductActions.jsx'
import '../styles/FilterByType.css'


class FilterByPrice extends React.Component{

    constructor(){
        super()
        this.state = {
            min:'',
            max:''
        }
    }


    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onFilter(){
        this.props.dispatch({type:'FILTER_PRICE',payload: 
            {
                min: this.state.min,
                max: this.state.max
            }
        })  
    }

    onClearForm(){
        this.setState({
            min:'',
            max:''
        })
        this.props.dispatch({type:'FILTER_PRICE',payload: 
            {
                min: '',
                max: ''
            }
        })
    }


    render(){
        return(
        <div>  
            <div className="well well-sm">
                <label>Price Range</label>
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        Min
                        <input type="text" name="min" className="form-control input-sm" 
                        onChange={this.handleChange.bind(this)} value={this.state.min}/>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        Max
                        <input type="text" name="max" className="form-control input-sm" 
                        onChange={this.handleChange.bind(this)} value={this.state.max}/>
                    </div>
                </div>
                
                <button type="button" className="btn btn-success btn-sm" onClick={this.onFilter.bind(this)}>
                    Filter
                </button>&nbsp;
                <button type="button" className="btn btn-warning btn-sm" onClick={this.onClearForm.bind(this)}>
                    Clear
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

export default connect(mapStateToProps)(FilterByPrice)


