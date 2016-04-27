import React, {Component, PropTypes} from 'react';




export default class Footer extends Component {
    
constructor(props){
		super(props)
		
	}    
    
    render() {
        return (
<footer>
    <div className="container">
        <div className="row row-footer">
            <div className="col-xs-12 col-sm-4">
                <h5>Authors</h5>
                <ul className="list-unstyled">
                    <li>Michał Dzik</li>
                    <li>Marcin Jadwiszczak</li>
                    <li>Monika Kłokosińska</li>
                    <li>Jan Latour</li>
                    <li>Klaudia Wereniewicz</li>
                </ul>
            </div>
             <div className="col-xs-12 col-sm-4">
                <h5>Resources</h5>
                  <ul className="list-unstyled">
                    <li><a href="#">GitHub</a></li>
                    <li><a href="#">Jupyter Site</a></li>
                </ul>
            </div>
             <div className="col-xs-12 col-sm-4">
                <h5>Help</h5>
                  <ul className="list-unstyled">
                    <li><a href="#">Project Documentation</a></li>
                    <li><a href="#">Jupyter Help Docs</a></li>
                 </ul>
            </div>
            
        </div>
    </div>
</footer>
        
        );

    }
}

