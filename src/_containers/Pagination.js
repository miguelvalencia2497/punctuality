import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import moment from 'moment';

import { setCurrentPage } from '../_actions';

class Pagination extends Component {
	handleClick = (action) => {
		if(action==='previous')
			this.props.setCurrentPage(this.props.pagination.currentPage-1);
		else if(action==='next')
			this.props.setCurrentPage(this.props.pagination.currentPage+1);
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
		});
	}

	getRoster = (date) => {
		var roster = this.props.roster.filter(
			r => r.date === date
		)[0];
		return roster?roster:{date:null, start:null, finish:null}
	}

	render() {
		var shifts = this.filterThis(this.props.shifts);

		var lastPage = Math.ceil(shifts.length/this.props.pagination.dataPerPage);
		var indexOfLastShift = this.props.pagination.currentPage * this.props.pagination.dataPerPage;
		var indexOfFirstShift = indexOfLastShift - this.props.pagination.dataPerPage;

		console.log(lastPage);
		return (
			<div className="pagination-container">
				<div className="buttons">
					<button className='prev' disabled={this.props.pagination.currentPage===1?'disabled':''} onClick={()=>this.handleClick('previous')}>Previous</button>
					<button className='next' disabled={this.props.pagination.currentPage===lastPage||lastPage===0?'disabled':''} onClick={()=>this.handleClick('next')}>Next</button>
				</div>
				Showing {shifts.length===0?'0':indexOfFirstShift+1} to {shifts.length===0?'0':this.props.pagination.currentPage===lastPage?shifts.length:indexOfLastShift} of {shifts.length} shifts.
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
		shifts: getVisible(state.shifts, state.showShiftsValue),
		roster: state.roster,
		pagination: state.pagination,
		filter: state.filter
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);