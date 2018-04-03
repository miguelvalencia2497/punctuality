import React, { Component } from 'react';
import ShowShifts from './ShowShifts';
import ShiftsList from './ShiftsList';
import UserPerformance from './UserPerformance';

import Header from '../_components/Header';

import '../_styles/css/punctuality-app.css';

export default class PunctualityApp extends Component {
	render() {
		return (
			<div className="container">
				<Header/>
				<UserPerformance/>
				<ShiftsList/>
				<ShowShifts/>
			</div>
		);
	}
}