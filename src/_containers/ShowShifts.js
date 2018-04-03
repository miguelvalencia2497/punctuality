import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pagination from './Pagination';

import { changeShowShiftsValue } from '../_actions';

import '../_styles/css/show_shifts.css';

class ShowShifts extends Component {
	render() {
		return (
			<div className='show-shifts-container'>
				<div className="select">
					Show &nbsp;
					<select onChange={(e) => {
							this.props.showShiftsValue(e.target.value);
						}}>
							<option value='25'>25</option>
							<option value='50'>50</option>
							<option value='100'>100</option>
							<option value='all'>All</option>
					</select>
					&nbsp; shifts
				</div>
				
				<Pagination/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		shiftsValue: state.showShiftsValue
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		showShiftsValue: (value) => dispatch(changeShowShiftsValue(value))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowShifts);