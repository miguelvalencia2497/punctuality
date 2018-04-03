import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import moment from 'moment';

import { getShiftsData, getRosterData } from '../_actions';

import Shift from '../_components/Shift';

import '../_styles/css/shifts-list.css';

class ShiftsList extends Component {
	componentDidMount() {
		// axios.get('http://localhost:4567/rosters/2013-09-15/2014-06-07')
			axios.get(`http://localhost:4567/rosters/${this.props.dates.start.format('YYYY-MM-DD')}/${this.props.dates.end.format('YYYY-MM-DD')}`)
			.then((res) => {
				this.props.getRosterData(res.data);
			});

		// axios.get('http://localhost:4567/shifts/2013-07-31/2014-06-25')
		axios.get(`http://localhost:4567/shifts/${this.props.dates.start.format('YYYY-MM-DD')}/${this.props.dates.end.format('YYYY-MM-DD')}`)
			.then((res) => {
				this.props.getShiftsData(res.data);
			});
		
	}

	// getPunctuality = () => {
	// 	var userPerformance = {
	// 		arrivedLate: 0,
	// 		punctual: 0,
	// 		leftEarly: 0,
	// 		timeSaved: 0
	// 	}
		
	// 	var total = this.props.shifts.length;

	// 	this.props.shifts.map((shift)=> {
	// 		let roster = this.getRoster(shift.date)
	// 		if (roster.start!==null&&(moment(shift.start).isAfter(roster.start))) {
	// 			userPerformance.arrivedLate++;
	// 		}

	// 		if (roster.finish!==null&&(moment(shift.finish).isBefore(roster.finish))) {
	// 			userPerformance.leftEarly++;
	// 		}

	// 		userPerformance.punctual = (total - userPerformance.arrivedLate - userPerformance.leftEarly);
	// 	});

	// 	this.props.setUserPerformance(userPerformance);
	// }

	getRoster = (date) => {
		var roster = this.props.roster.filter(
			r => r.date === date
		)[0];
		return roster?roster:{date:null, start:null, finish:null}
	}

	filterThis =(shifts) => {
		if(this.props.filter==='none')
			return shifts;

		return shifts.filter((shift, index) => {
			let roster = this.getRoster(shift.date);
			if(this.props.filter==='arrivedLate'&&(moment(shift.start).isAfter(roster.start)))
				return shift;
			else if (this.props.filter==='leftEarly' &&(moment(shift.finish).isBefore(roster.finish)))
				return shift;
			else if (this.props.filter==='punctual'&&!((moment(shift.start).isAfter(roster.start))&&(moment(shift.finish).isBefore(roster.finish))))
				return shift;

			return null;
		});
	}

	renderShifts = () => {
		var indexOfLastShift = this.props.pagination.currentPage * this.props.pagination.dataPerPage;
		var indexOfFirstShift = indexOfLastShift - this.props.pagination.dataPerPage;

		var currentShifts = this.filterThis(this.props.shifts).slice(indexOfFirstShift, indexOfLastShift);

		return currentShifts.map((s, index) => {
			let roster = this.getRoster(s.date)
			return <Shift key={index} date={s.date} start={s.start} finish={s.finish} roster={roster}/>
			// <li key={index}>{moment(s.date).format('MMMM Do YYYY')} {moment(s.start).format('h:mm a')} {moment(s.finish).format('h:mm a')}</li>	
		});
	}

	render() {
		return (
			<div className="table-container">
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
						{this.renderShifts()}
					</tbody>
				</table>
			</div>
		);
	}
}

const getVisible = (data, value) => {
	switch(value) {
		case '25':
			return data.slice(0, 25);
		case '50':
			return data.slice(0, 50);
		case '100':
			return data.slice(0, 100);
		case 'all':
			return data;
		default:
			return data;
	}
}

const mapStateToProps = (state) => {
	return {
		dates: state.dates,
		roster: state.roster,
		shifts: getVisible(state.shifts, state.showShiftsValue),
		filter: state.filter,
		pagination: state.pagination
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getRosterData: (data) => dispatch(getRosterData(data)),
		getShiftsData: (data) => dispatch(getShiftsData(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftsList);