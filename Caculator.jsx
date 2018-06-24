import React from 'react'


export default class Calculator extends React.Component{

    constructor(){
        super()
        this.state = {
            a: 0,
            b: 0,
            result:0
        }

        
    }

    handleChange(e){
        let text = {}
        text[e.target.name] = e.target.value     
        this.setState(text)

    }

    calculate(){
        let result = parseInt(this.state.a) + parseInt(this.state.b)
        this.setState({result: result })
       
    }
   
    render(){
        return(
            <div>
                <h1>Calculator</h1>
                <button onClick={this.calculate.bind(this)}>Calculate</button>
                <br/>
                a<input type="text" name='a' value={this.state.a} onChange={this.handleChange.bind(this)}/>
                +
                b<input type="text" name='b' value={this.state.b} onChange={this.handleChange.bind(this)}/>
                =   
                <span>{this.state.result}</span>
            </div>

        )
    }
}