const pagination = (state = {
		currentPage: 1,
		dataPerPage: 5,
	}, action) => {
		switch(action.type) {
			case 'SET_CURRENT_PAGE':
				return { ...state, currentPage: action.value };
			default:
				return state;
	}
}

export default pagination;