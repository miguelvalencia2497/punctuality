import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';

import { setStartDate, setEndDate, getRosterData, getShiftsData, setPeriodType } from '../_actions';

import 'react-datepicker/dist/react-datepicker.css';
import '../_styles/css/selection-menu.css';

class SelectionMenu extends Component {
	constructor(props) {
	  super(props);
	  this.getData = this.getData.bind(this);
	  this.handleChangeStart = this.handleChangeStart.bind(this);
	  this.handleChangeEnd = this.handleChangeEnd.bind(this);
	  this.handleClick = this.handleClick.bind(this);
	}


	componentWillMount() {
		moment.updateLocale('en', {
		  week: {
		    dow: 1,
		  },
		})
	}

	getData(start, end) {
		axios.get(`http://localhost:4567/rosters/${start}/${end}`)
			.then((res) => {
				this.props.getRosterData(res.data);
			});

		axios.get(`http://localhost:4567/shifts/${start}/${end}`)
			.then((res) => {
				this.props.getShiftsData(res.data);
			});
	}

	handleChangeStart(date) {
		this.props.setPeriodType('custom');
		this.props.setStartDate(date);
		this.getData(date.format('YYYY-MM-DD'), this.props.dates.end.format('YYYY-MM-DD'));
	}

	handleChangeEnd(date) {
		this.props.setPeriodType('custom');
		this.props.setEndDate(date);
		this.getData(this.props.dates.start.format('YYYY-MM-DD'), date.format('YYYY-MM-DD'));
	}

	handleClick(e, period) {
		e.preventDefault();
		switch(period) {
			case 'this_pay_period':
				this.props.setPeriodType('this_pay_period');
				this.props.setStartDate(moment().startOf('isoWeek'));
				this.props.setEndDate(moment().endOf('isoWeek'));
				this.getData(moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().endOf('isoWeek').format('YYYY-MM-DD'));
				break;
			case 'last_pay_period':
				this.props.setPeriodType('last_pay_period');
				this.props.setStartDate(moment().subtract(1, 'weeks').startOf('isoWeek'));
				this.props.setEndDate(moment().subtract(1, 'weeks').endOf('isoWeek'));
				this.getData(moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'), moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'));
				break;
			case 'this_pay_month':
				this.props.setPeriodType('this_pay_month');
				this.props.setStartDate(moment().startOf('month'));
				this.props.setEndDate(moment().endOf('month'));
				this.getData(moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD'));
				break;
			case 'this_financial_year':
				this.props.setPeriodType('this_financial_year');
				this.props.setStartDate(moment().startOf('year'));
				this.props.setEndDate(moment().endOf('year'));
				this.getData(moment().startOf('year').format('YYYY-MM-DD'), moment().endOf('year').format('YYYY-MM-DD'));
				break;
			case 'last_financial_year':
				this.props.setPeriodType('last_financial_year');
				this.props.setStartDate(moment().subtract(1, 'years').startOf('year'));
				this.props.setEndDate(moment().subtract(1, 'years').endOf('year'));
				this.getData(moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD'), moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD'));
				break;
			case 'custom':
				this.props.setPeriodType('custom');
				break;
			default:
				break;
		}
	}

	render() {
		return (
			<div className="selection-menu">
				<DatePicker
				    inline
				    showYearDropdown
				    selected={this.props.dates.start}
				    startDate={this.props.dates.start}
				    endDate={this.props.dates.end}
				    onChange={this.handleChangeStart}
				    ref={r => r && r.setOpen(false)}
				/>
				<DatePicker
				    inline
				    showYearDropdown
				    selected={this.props.dates.end}
				    startDate={this.props.dates.start}
				    endDate={this.props.dates.end}
				    onChange={this.handleChangeEnd}
				    ref={r => r && r.setOpen(false)}
				/>
				<ul>
					<li>
						<a style={this.props.periodType==='this_pay_period'?{background: '#3498db', color: '#fff'}:null} onClick={(e) => {this.handleClick(e, 'this_pay_period')}}>This Pay Period</a>
					</li>
					<li>
						<a style={this.props.periodType==='last_pay_period'?{background: '#3498db', color: '#fff'}:null} onClick={(e) => {this.handleClick(e, 'last_pay_period')}}>Last Pay Period</a>
					</li>
					<li>
						<a style={this.props.periodType==='this_pay_month'?{background: '#3498db', color: '#fff'}:null} onClick={(e) => {this.handleClick(e, 'this_pay_month')}}>This Pay Month</a>
					</li>
					<li>
						<a style={this.props.periodType==='this_financial_year'?{background: '#3498db', color: '#fff'}:null} onClick={(e) => {this.handleClick(e, 'this_financial_year')}}>This Financial Year</a>
					</li>
					<li>
						<a style={this.props.periodType==='last_financial_year'?{background: '#3498db', color: '#fff'}:null} onClick={(e) => {this.handleClick(e, 'last_financial_year')}}>Last Financial Year</a>
					</li>
					<li>
						<a style={this.props.periodType==='custom'?{background: '#3498db', color: '#fff'}:null} onClick={(e) => {this.handleClick(e, 'custom')}}>Custom</a>
					</li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dates: state.dates,
		periodType: state.periodType
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setStartDate: (date) => dispatch(setStartDate(date)),
		setEndDate: (date) => dispatch(setEndDate(date)),
		getRosterData: (data) => dispatch(getRosterData(data)),
		getShiftsData: (data) => dispatch(getShiftsData(data)),
		setPeriodType: (value) => dispatch(setPeriodType(value))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionMenu);



