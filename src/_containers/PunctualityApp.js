import React, { Component } from 'react';
import ShowShifts from './ShowShifts';
import ShiftsList from './ShiftsList';

export default class PunctualityApp extends Component {
	render() {
		return (
			<div>
				<ShiftsList/>
				<ShowShifts/>
			</div>
		);
	}
}