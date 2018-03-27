import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { initialShiftsData } from '../_actions';
import { initialRosterData } from '../_actions';

import Shift from './Shift';

class ShiftsList extends Component {
	componentDidMount() {
		// var startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD');
		// var endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD');

		axios.get('http://localhost:4567/rosters/2013-09-15/2014-06-07')
		// axios.get(`http://localhost:4567/rosters/${startOfWeek}/${endOfWeek}`)
			.then((res) => {
				this.props.getInitialRosterData(res.data);
			})

		axios.get('http://localhost:4567/shifts/013-07-31/2014-06-25')
		// axios.get(`http://localhost:4567/shifts/${startOfWeek}/${endOfWeek}`)
			.then((res) => {
				this.props.getInitialShiftsData(res.data);
			})
	}

	getRoster = (date) => {
		var roster = this.props.roster.filter(
			r => r.date === date
		)[0];
		return roster?roster:{date:null, start:null, finish:null}
	}

	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>Day</th>
						<th>Rostered Start</th>
						<th>Actual Start</th>
						<th>Rostered Finish</th>
						<th>Actual Finish</th>
					</tr>
				</thead>
				<tbody>
					{this.props.shifts.map((s, index) => 
						<Shift key={index} date={s.date} start={s.start} finish={s.finish} roster={this.getRoster(s.date)}/>
						// <li key={index}>{moment(s.date).format('MMMM Do YYYY')} {moment(s.start).format('h:mm a')} {moment(s.finish).format('h:mm a')}</li>	
					)}
				</tbody>
			</table>
		);
	}
}

const getVisibleRoster = (shifts, value) => {
	switch(value) {
		case '25':
			return shifts.slice(0, 25);
		case '50':
			return shifts.slice(0, 50);
		case '100':
			return shifts.slice(0, 100);
		case 'all':
			return shifts;
		default:
			return shifts;
	}
}

const mapStateToProps = (state) => {
	return {
		roster: state.roster,
		shifts: getVisibleRoster(state.shifts, state.showShiftsValue),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getInitialRosterData: (data) => dispatch(initialRosterData(data)),
		getInitialShiftsData: (data) => dispatch(initialShiftsData(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftsList);