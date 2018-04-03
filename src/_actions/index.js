export const getRosterData = (data) => {
	return {
		type: 'RECEIVED_ROSTER_DATA',
		data
	}
} 

export const getShiftsData = (data) => {
	return {
		type: 'RECEIVED_SHIFTS_DATA',
		data
	}
}

export const setStartDate = (start) => {
	return {
		type: 'SET_START_DATE',
		start
	}
}

export const setEndDate = (end) => {
	return {
		type: 'SET_END_DATE',
		end
	}
}

export const changeShowShiftsValue = (value) => {
	return {
		type: 'CHANGED_SHOW_SHIFTS_VALUE',
		value
	}
}

export const changeSelectorShown = (value) => {
	return {
		type: 'CHANGED_SELECTOR_SHOWN',
		value
	}
}

export const setPeriodType = (value) => {
	return {
		type: 'SET_PERIOD_TYPE',
		value
	}
}

export const setUserPerformance = (data) => {
	return {
		type: 'SET_USER_PERFORMANCE',
		data
	}
}

export const setFilter = (filter) => {
	return {
		type: 'SET_FILTER',
		filter
	}
}

export const setCurrentPage = (value) => {
	return {
		type: 'SET_CURRENT_PAGE',
		value
	}
}