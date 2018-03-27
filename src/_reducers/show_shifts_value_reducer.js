const showShiftsValue = (state = '25', action) => {
	switch(action.type) {
		case 'CHANGED_SHOW_SHIFTS_VALUE':
			return action.value;
		default:
			return state;
	}
}

export default showShiftsValue;