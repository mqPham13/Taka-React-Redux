import React from 'react'
import {connect} from 'react-redux'

import Counter from './Counter.jsx'
import Caculator from './Caculator.jsx'
import Student from './Student.jsx'

class App extends React.Component{

    render(){
        return (
            <div>
                 <Student />
            </div>

        )
    }
    
}

function mapStateToProps(centralState){
    return {
        counter: centralState.counter
    }
}


export default connect(mapStateToProps)(App)