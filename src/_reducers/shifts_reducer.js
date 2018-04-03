const shifts = (state = [], action) => {
	switch(action.type) {
		case 'RECEIVED_SHIFTS_DATA':
			return action.data
		default:
			return state;
	}
}

export default shifts;