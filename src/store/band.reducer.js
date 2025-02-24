export const SET_BAND = 'SET_BAND'

const initialState = {
	band: null,
}

// Band reducer
export function bandReducer(state = initialState, action) {
	switch (action.type) {
		case SET_BAND:
			return {
				...state,
				band: action.bandData,
			}
		default:
			return state
	}
}
