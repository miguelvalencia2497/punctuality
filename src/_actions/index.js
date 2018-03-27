export const initialRosterData = (data) => {
	return {
		type: 'RECEIVED_INITIAL_ROSTER_DATA',
		data
	}
} 

export const initialShiftsData = (data) => {
	return {
		type: 'RECEIVED_INITIAL_SHIFTS_DATA',
		data
	}
}

export const changeShowShiftsValue = (value) => {
	return {
		type: 'CHANGED_SHOW_SHIFTS_VALUE',
		value
	}
}