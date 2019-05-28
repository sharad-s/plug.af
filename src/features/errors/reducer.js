import * as types from './types';

const initialState = {
	soundcloudErrors: {},
	searchError: {},
};

export default function(state = initialState, action) {
	switch (action.type) {
		case types.GET_SOUNDCLOUD_ERRORS:
			return {
				...state,
				soundcloudErrors: action.payload,
			};

		case types.GET_SEARCH_ERRORS:
			return {
				...state,
				searchError: action.payload,
			};
		case types.CLEAR_SEARCH_ERRORS:
			return {
				...state,
				searchError: {},
			};
		default:
			return state;
	}
}
