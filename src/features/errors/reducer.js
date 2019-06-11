import * as types from './types';

const initialState = {
	soundcloudErrors: {},
	searchError: {},
	authError: {},
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

		case types.GET_REGISTER_ERRORS:
			return {
				...state,
				authError: action.payload,
			};
		case types.CLEAR_REGISTER_ERRORS:
			return {
				...state,
				authError: {},
			};
		default:
			return state;
	}
}
