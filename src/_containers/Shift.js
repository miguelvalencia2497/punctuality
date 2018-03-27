import React from 'react';
import moment from 'moment';

const Shift = ({
	date,
	start,
	finish,
	roster
}) => (
	<tr>
		<td>{moment(date).format('MMMM Do YYYY')}</td>
		<td>{roster.start!==null?moment(roster.start).format('h:mm a'):'no start time clocked'}</td>
		<td>{start!==null?(moment(start).isBefore(moment(roster.start))?'on time':(moment(start).isAfter(moment(roster.start))?'late':'on time')):'no start time clocked'}</td>
		<td>{roster.finish!==null?moment(roster.finish).format('h:mm a'):'no finish time clocked'}</td>
		<td>
			{finish!==null?(moment(finish).isBefore(moment(roster.finish))?'left early':'on time'):'no finish time clocked'}
			{roster.finish!==null&&(moment(finish).isBefore(roster.finish))?moment(roster.finish).from(moment(finish), true):''}
		</td>
	</tr>
)

export default Shift;