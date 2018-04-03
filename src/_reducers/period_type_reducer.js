const periodType = (state = 'this_pay_period', action) => {
		switch(action.type) {
			case 'SET_PERIOD_TYPE':
				return action.value;
			default:
				return state;
	}
}

export default periodType;