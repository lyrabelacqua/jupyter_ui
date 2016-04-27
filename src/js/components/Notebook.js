import React, {Component, PropTypes} from 'react';
import UUID from 'uuid-js';
import _ from 'lodash';

import Cell from './Cell';

import services, {
	startNewSession, 
	connectToSession, 
	listRunningSessions,
} from 'jupyter-js-services';


export default class Notebook extends Component {
	constructor(props){
		super(props)

		this.state = {
			options: props.options,
			session: null,
			cells: []
		}

		this.startSession()
	}

	startSession(){
		startNewSession(this.state.options).then(session => {

			this.setState({session: session});
			console.log(`Session started : ${session.id}`);

		}).catch(err => {
			console.log("Starting Error:", err);
		});
	}

	addCell(){
		var newUUID = UUID.create().hex
		this.setState({
			cells: [
				...this.state.cells, 
				{
					uuid: newUUID,
					cell: <Cell key={newUUID} uuid={newUUID} deleteMe={this.removeCell.bind(this)} session={this.state.session}/> 
				}
			]
		});
	}

	removeCell(uuid){
		this.setState({
			cells:  _.remove(this.state.cells, obj => obj.uuid !== uuid)
		})
	}

	restartKernel(){
		this.state.session.kernel.restart().then(() => {
			//do sth after kernel restart
		})
	}

	shutdownNotebook(){
		this.state.session.shutdown().then(() => {
			this.props.removeNotebook(this.props.uuid)
		});
	}

	render(){
		return (
			<div>
				<div className="row">
			        <div style={styles} className="col-xs-12 col-sm-12">
			        	<span style={napis}>Notebook</span> <i>#{this.props.uuid}</i>
						 <p>
						 <button type="button" onClick={this.addCell.bind(this)} className="btn btn-lg btn-default" title="Add New Cell"><i className="fa fa-plus"></i><i className="fa  fa-file-code-o fa-2x"></i></button>
						 &nbsp;<button type="button" onClick={this.restartKernel.bind(this)} className="btn btn-lg btn-default" title="Restart Notebook kernel"><i className="fa fa-refresh fa-2x"></i></button>
						 &nbsp;<button type="button" onClick={this.shutdownNotebook.bind(this)} className="btn btn-lg btn-default" title="Exit Notebook"><i className="fa fa-trash fa-2x"></i></button>
						 </p>
			        </div>
		      	</div>

    			<div className="row">
			        <div className="col-xs-12 col-sm-1"></div>
			        <div className="col-xs-12 col-sm-10">
			        	{this.state.cells.map( obj => obj.cell)}
			        </div>
			        <div className="col-xs-12 col-sm-1"></div>
			     </div>
			</div>
		)
	}
}

// ------------------------------------> pozniej zrobic selecta dla wybranych jezykow (domyslnie jest python) oraz pobierac sciezke do notebooka

Notebook.defaultProps = {
	options: {
		baseUrl: 'http://localhost:8888',
		name: 'python',
		notebookPath:'./test.ipynb'
	}
}

Notebook.propTypes = {
	options: PropTypes.object.isRequired
};


//na szybko :P
let styles = {
	textAlign: 'center'
}

let napis = {
    fontVariant:'small-caps',
    fontSize: 33
}





