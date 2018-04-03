import { combineReducers } from 'redux';
import dates from './date_reducer';
import roster from './roster_reducer';
import shifts from './shifts_reducer';
import showShiftsValue from './show_shifts_value_reducer';
import selectorShown from './selector_shown_reducer';
import periodType from './period_type_reducer';
import userInfo from './user_info_reducer';
import filter from './filter_reducer';
import pagination from './pagination_reducer';

const allReducers = combineReducers({
	dates,
	roster,
	shifts,
	showShiftsValue,
	selectorShown,
	periodType,
	userInfo,
	filter,
	pagination
});

export default allReducers;