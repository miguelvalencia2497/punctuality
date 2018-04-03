import moment from 'moment';

const dates = (state = {
		start: moment().startOf('isoWeek'),
		end: moment().endOf('isoWeek')
	}, action) => {
		switch(action.type) {
			case 'SET_START_DATE':
				return { ...state, start: action.start };
			case 'SET_END_DATE':
				return { ...state, end: action.end };
			default:
				return state;
	}
}

export default dates;