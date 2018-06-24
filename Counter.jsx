import React from 'react'

export default class Counter extends React.Component{
    constructor(){
        super()
        this.state = {
            a: 0
        }
    }

    handClick1(){
       this.setState({a: this.state.a+1})
    }

    handClick2(){
       this.setState({a: this.state.a-1})
    }


    render(){
        return(
            <div>
                <div>{this.state.a}</div>
                <button onClick={this.handClick1.bind(this)}>+</button>
                <button onClick={this.handClick2.bind(this)}>-</button>

            </div>
        )
    }
}