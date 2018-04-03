const filter = (state = 'none', action) => {
		switch(action.type) {
			case 'SET_FILTER':
				return action.filter;
			default:
				return state;
	}
}

export default filter;