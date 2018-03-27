const roster = (state = [], action) => {
	switch(action.type) {
		case 'RECEIVED_INITIAL_ROSTER_DATA':
			return action.data
		default:
			return state;
	}
}

export default roster;