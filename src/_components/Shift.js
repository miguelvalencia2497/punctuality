import React from 'react';
import moment from 'moment';
import '../_styles/css/shift.css';

const Shift = ({
	date,
	start,
	finish,
	roster
}) => (
	<tr>
		<td>{moment(date).format('MMMM Do YYYY')}</td>
		<td>{roster.start!==null?moment(roster.start).format('h:mm a'):'no start time clocked'}</td>
		<td>
			<div className="time-comment">
				<div className="actual-time">
					{moment(start).format('h:mm a')}
				</div>
				{start!==null?(moment(start).isBefore(moment(roster.start))?'on time':(moment(start).isAfter(moment(roster.start))?'late':'on time')):'no start time clocked'}
				{roster.start!==null&&(moment(start).isAfter(roster.start))?<span className="minutes">{moment(start).subtract(1,'minutes').from(moment(roster.start), true)}</span>:''}
			</div>
		</td>
		<td>{roster.finish!==null?moment(roster.finish).format('h:mm a'):'no finish time clocked'}</td>
		<td>
			<div className="time-comment">
				<div className="actual-time">
					{moment(finish).format('h:mm a')}
				</div>
				{finish!==null?(moment(finish).isBefore(moment(roster.finish))?'left early':'on time'):'no finish time clocked'}
				{roster.finish!==null&&(moment(finish).isBefore(roster.finish))?<span className="minutes">{moment(roster.finish).from(moment(finish), true)}</span>:''}
			</div>
		</td>
	</tr>
)

export default Shift;