import React from 'react'
import '../styles/Footer.css'

export default class Footer extends React.Component{    
    render(){
        return(
            <div>
                <hr/>
                <nav className="footer">
                    <div className="ml-20">
                        <h5>Copyright © 2018 Pham Minh Quang</h5>
                    </div>
                </nav>
            </div>
        )
    }
}


