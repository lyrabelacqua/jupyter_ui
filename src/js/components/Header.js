import React, {Component, PropTypes} from 'react';




export default class Header extends Component {
    
constructor(props){
		super(props)
		
	}    
    
    render() {
        return (
            
 <header>
          <span className="brand"><i className="fa fa-moon-o"></i><span className="brandname">Callypso</span></span>
    <a href="" className="create"><span className="titleblock"><span className="atitle">CREATE</span><br /><span className="asubtitle">NEW NOTEBOOK</span></span><span className="plus">+</span></a>
 </header>
        
        );

    }
}