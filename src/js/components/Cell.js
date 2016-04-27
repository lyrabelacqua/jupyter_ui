import React, {Component, PropTypes} from 'react';

import services, {
	startNewKernel,
	connectToKernel, 
	listRunningKernels,
} from 'jupyter-js-services';

export default class Cell extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	handleEvent(e){
		if (e.key == 'Enter' && e.shiftKey) {
            e.preventDefault();
            this.kernelExecute(e.target.value);
        }
	}

	kernelExecute(code){
		let future = this.props.session.kernel.execute({code});

		future.onDone = (msg) => {
			//console.log('IKernelFuture done handler',msg);
			var timer = setTimeout(function(){ future.dispose(); clearTimeout(timer) }, 5000);
		}
		future.onIOPub = (msg) => {
			//console.log("IKernelFuture IOPub handler",msg);
			this.handleOutput(msg); 
		}
		future.onReply = (msg) => {
			//console.log("IKernelFuture reply handler",msg);
		}
		future.onStdin = (msg) => {
			//console.log("IKernelFuture stdin handler", msg);
		}
	}

	handleOutput(msg){
		if(services.isExecuteResultMessage(msg)){
			//console.log("execute_result", msg);
			this.setState({
                    output: msg.content.data["text/plain"],
                    number: msg.content.execution_count
                });
		}
		if(services.isClearOutputMessage(msg)){
			//console.log("clear_output", msg);
		}
		if(services.isDisplayDataMessage(msg)){
			//console.log("display_data", msg);
		}
		if(services.isErrorMessage(msg)){
			//console.log("error", msg);
			this.setState({
                    output: `${msg.content.ename}: ${msg.content.evalue}`,
                    number: null
                });
		}
		if(services.isExecuteInputMessage(msg)){
			//console.log("execute_input", msg);
		}
		if(services.isStatusMessage(msg)){
			//console.log("status", msg);
		}
		if(services.isStreamMessage(msg)){
			//console.log("stream", msg);
			this.setState({
                    output: msg.content.text.match(/[^\n]+(?:\r?\n|$)/g),
                    number: null
                });
		}
	}

	interrupt(){
		this.props.session.kernel.interrupt().then(() => {
			//do sth when is interrupted
		});
	}

	exitCell(){
		this.props.deleteMe(this.props.uuid)
	}

	render(){	
		return (
 		<div>

 			<div className="panel panel-default">
            	<div className="panel-heading">
            		<span style={stR}>
            			<button type="button" onClick={this.exitCell.bind(this)} className="btn btn-xs btn-default"><i className="fa fa-times" title="Exit Cell"></i></button>
            			&nbsp;<button type="button" onClick={this.interrupt.bind(this)} className="btn btn-xs btn-default"><i className="fa fa-stop" title="Przerwij wykonywanie"></i></button>
            		</span>

		            	<div className="form-group">
							<label for="comment">Input:</label>
							<textarea className="form-control" rows="3" id="comment" onKeyPress={this.handleEvent.bind(this)}></textarea>
						</div>

						<div className="form-group">
							<label for="comment">Output:</label>
							<p>{this.state.output}</p>
						</div>
            	</div>
          </div>
        </div>
		)
	}
}

Cell.propTypes = {
	deleteMe: PropTypes.func.isRequired,
	session: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired
};

let stL = {
	float: 'left'
}

let stR = {
	float: 'right'
}