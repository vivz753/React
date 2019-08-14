import React, {Component} from 'react'

class Form extends Component {
	constructor(props){
		super(props)

		this.initialState={
			name:'',
			job:'',
		}

	this.state = this.initialState
	}

	handleChange = event => {
		const {name, value} = event.target
		this.setState({
			[name]:value,
		})
	console.log('handling change')
	}


	submitForm = () => {
		this.props.handleSubmit(this.state)
		
		console.log('setting state to: ' + JSON.stringify(this.initialState)) 
		this.setState(this.intialState)
	console.log('submitting form')
	}
	render(){
		console.log(this.state)
		const{name, job} = this.state;

		return( <div>
			<form>
			<label>Name</label>
			<input
				type="text"
				name="name"
				value={name}
				onChange={this.handleChange}/>
			<label>Job</label>
			<input
				type="text"
				name="job"
				value={job}
				onChange={this.handleChange}/>
			</form>
	<input type="button" value="Submit" onClick={this.submitForm}/>	
		</div>
		);
	}

}

export default Form;
