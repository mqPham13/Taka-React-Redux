import React from 'react'

export default class Student extends React.Component{
    constructor(){
        super()

        this.state = {
            students: [{name: 'Thanh', age: 10}, {name: 'Hien', age: 20}, {name: 'Toan', age: 15}],
            name: '',
            age: 0
        }
    }

    handleChange(e){
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleAdd(){

        let students = this.state.students

        students.push({name: this.state.name, age: this.state.age})

        this.setState({students: students})
    }

    render(){
        return(
            <div>
                <h1>List of students</h1>
                <ul>
                    {this.state.students.map(s=>
                        <li>{s.name} | {s.age}</li>
                    )}
                </ul>
                <h1>Manage students</h1>
                Name: <input type="text" name="name" onChange={this.handleChange.bind(this)}/><br/>
                Age: <input type="text" name="age" onChange={this.handleChange.bind(this)}/>
                <button onClick={this.handleAdd.bind(this)}>Add</button>
            </div>

        )
    }
}