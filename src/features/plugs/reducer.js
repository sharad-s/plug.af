import * as types from './types';

const initialState = {
	currentPlug: {},
	plugs: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case types.CREATE_NEW_PLUG:
			return {
				...state,
				currentPlug: action.payload
			};
		case types.GET_PLUG:
			return {
				...state,
				loading: false
			};
		case types.GET_PLUGS:
			return {
				...state,
				plugs: action.payload,
			};
		case types.PLUG_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
