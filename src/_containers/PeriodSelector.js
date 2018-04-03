import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { changeSelectorShown } from '../_actions';

import SelectionMenu from './SelectionMenu';
import FaCalendar from 'react-icons/lib/fa/calendar';

import '../_styles/css/period-selector.css';

class PeriodSelector extends Component {
	getSelector() {
		return this.props.selectorShown?<SelectionMenu/>:'';
	}
	
	getPeriodType() {
		switch(this.props.periodType) {
			case 'this_pay_period':
				return 'This Pay Period';
			case 'last_pay_period':
				return 'Last Pay Period';
			case 'this_pay_month':
				return 'This Pay Month';
			case 'this_financial_year':
				return 'This Financial Year';
			case 'last_financial_year':
				return 'Last Financial Year';
			case 'custom':
				return 'Custom';
			default:
				return 'Custom';
		}
	}

	render() {
		return (
			<div className="period-selector-container">
				<button className="select-period" onClick={() => {
					this.props.selectorShown?this.props.showSelector(false):this.props.showSelector(true);
				}}>
					<FaCalendar /> {this.getPeriodType()} &#9662;
				</button>
				{this.getSelector()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectorShown: state.selectorShown,
		periodType: state.periodType
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		showSelector: (value) => dispatch(changeSelectorShown(value))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodSelector);