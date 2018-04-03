const selectorShown = (state = false, action) => {
	switch(action.type) {
		case 'CHANGED_SELECTOR_SHOWN':
			return action.value;
		default:
			return state;
	}
}

export default selectorShown;