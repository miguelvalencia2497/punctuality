import { combineReducers } from 'redux';
import roster from './roster_reducer';
import shifts from './shifts_reducer';
import showShiftsValue from './show_shifts_value_reducer';

const allReducers = combineReducers({
	roster,
	shifts,
	showShiftsValue
});

export default allReducers;