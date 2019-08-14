import React from 'react'
const TableBody=(props)=> {
	const {characterData, removeCharacter} = props
	const rows = characterData.map((row, index) => {
		return(
			<tr key={index}>
			<td>{row.name}</td>
			<td>{row.job}</td>
			<td>
				<button onClick={() => removeCharacter(index)}> Delete</button>
			</td>
			</tr>
		)
	})
	return <tbody>{rows}</tbody>
}
export default TableBody;
