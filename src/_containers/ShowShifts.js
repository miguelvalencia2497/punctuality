import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeShowShiftsValue } from '../_actions';

class ShowShifts extends Component {
	render() {
		return (
			<div>
				Show
				<select onChange={(e) => {
						this.props.showShiftsValue(e.target.value);
					}}>
						<option value='25'>25</option>
						<option value='50'>50</option>
						<option value='100'>100</option>
						<option value='all'>All</option>
				</select>
				shifts
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		showShiftsValue: (value) => dispatch(changeShowShiftsValue(value))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowShifts);