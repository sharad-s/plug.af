import * as types from './types';


export const getSoundcloudErrorsAction = error => ({
	type: types.GET_SOUNDCLOUD_ERRORS,
	payload: error,
});

export const getSearchErrorAction = error => ({
	type: types.GET_SEARCH_ERRORS,
	payload: error,
});



export const clearSearchErrorsAction = () => ({
	type: types.CLEAR_SEARCH_ERRORS,
});


export const getRegisterErrorsAction = error => ({
	type: types.GET_REGISTER_ERRORS,
	payload: error,
});

export const clearRegisterErrorsAction = error => ({
	type: types.CLEAR_REGISTER_ERRORS,
});


export const getLoginErrorsAction = error => ({
	type: types.GET_REGISTER_ERRORS,
	payload: error,
});

export const clearLoginErrorsAction = error => ({
	type: types.CLEAR_LOGIN_ERRORS,
});

