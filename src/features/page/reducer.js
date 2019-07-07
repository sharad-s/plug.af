import * as types from './types';

const initialState = {
	modalOpen: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case types.OPEN_MODAL:
			return {
				...state,
				modalOpen: true
			};
		case types.CLOSE_MODAL:
			return {
				...state,
				modalOpen: false
			};
		default:
			return state;
	}
}
