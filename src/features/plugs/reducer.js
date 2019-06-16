import * as types from './types';

const initialState = {
	currentPlug: {},
	plugs: {},
};

export default function(state = initialState, action) {
	switch (action.type) {
		case types.CREATE_NEW_PLUG:
			return {
				...state,
			};
		case types.GET_PLUG:
			return {
				...state,
				currentPlug: action.payload,
			};
		case types.GET_PLUGS:
			return {
				...state,
				plugs: {},
			};
		default:
			return state;
	}
}
