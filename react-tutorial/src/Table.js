import React, {Component} from 'react'
import TableHeader from './TableHeader.js'
import TableBody from './TableBody.js'

class Table extends Component {
	render() {

		const {characterData, removeCharacter}= this.props

		return (
			<div>
		<TableHeader/>
			<TableBody removeCharacter={removeCharacter} characterData={characterData}/>
</div>
		)
	}
}
export default Table;
