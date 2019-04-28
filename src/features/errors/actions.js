import * as types from './types';


export const getSoundcloudErrorsAction = error => ({
	type: types.GET_SOUNDCLOUD_ERRORS,
	payload: error,
});

export const getSearchErrorAction = error => ({
	type: types.GET_SEARCH_ERRORS,
	payload: error,
});
