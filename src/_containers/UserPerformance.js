import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';

import { connect } from 'react-redux'; 
import moment from 'moment';

import { setUserPerformance, setFilter, setCurrentPage } from '../_actions';

import 'react-circular-progressbar/dist/styles.css';
import '../_styles/css/user-performance.css';

class UserPerformance extends Component {
	getRoster = (date) => {
		var roster = this.props.roster.filter(
			r => r.date === date
		)[0];
		return roster?roster:{date:null, start:null, finish:null}
	}

	getArrivedLate = () => {
		let arrivedLate = 0;
		this.props.shifts.map((shift) => {
			let roster = this.getRoster(shift.date)
			if (roster.start!==null&&(moment(shift.start).isAfter(roster.start))) {
				arrivedLate++;
			}
			return arrivedLate;
		});

		return arrivedLate;
	}

	getLeftEarly = () => {
		let leftEarly = 0;
		this.props.shifts.map((shift) => {
			let roster = this.getRoster(shift.date)
			if (roster.finish!==null&&(moment(shift.finish).isBefore(roster.finish))) {
				leftEarly++;
			}
			return leftEarly;
		});

		return leftEarly;
	}

	handleClick(filter) {
		this.props.setCurrentPage(1);
		filter===this.props.filter?this.props.setFilter('none'):this.props.setFilter(filter);
	}
		

	render() {
		var arrivedLate = this.getArrivedLate();
		var leftEarly = this.getLeftEarly();
		var punctual = ((this.props.shifts.length*2) - arrivedLate - leftEarly);
		var punctuality = (punctual/(this.props.shifts.length*2))*100;
		return (
			<div className="user-performance-container">
				<CircularProgressbar 
					percentage={isNaN(punctuality)?0:Math.round(punctuality)}
					textForPercentage={(pct) => `${pct}`}
				 />
				<p>
					For clocks ins and outs within 30 minutes of his roster,
					Mike is punctual {isNaN(punctuality)?0:Math.round(punctuality)}% of the time.
				</p>

				<div className="info-container">
					<div className="arrived-late" style={this.props.filter==='arrivedLate'?{background: '#e5e5e5', boderColor: '#333'}:null} onClick={() => {this.handleClick('arrivedLate')}}>
						<h4>Arrived Late</h4>
						<span>{arrivedLate}</span>
					</div>
					<div className="punctual" style={this.props.filter==='punctual'?{background: '#e5e5e5'}:null} onClick={() => {this.handleClick('punctual')}}>
						<h4>Punctual</h4>
						<span>{punctual}</span>
					</div>
					<div className="left-early" style={this.props.filter==='leftEarly'?{background: '#e5e5e5'}:null} onClick={() => {this.handleClick('leftEarly')}}>
						<h4>Left Early</h4>
						<span>{leftEarly}</span>
					</div>
				</div>
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
		roster: state.roster,
		shifts: getVisible(state.shifts, state.showShiftsValue),
		filter: state.filter
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUserPerformance: (data) => dispatch(setUserPerformance(data)),
		setFilter: (filter) => dispatch(setFilter(filter)),
		setCurrentPage: (page) => dispatch(setCurrentPage(page))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPerformance);