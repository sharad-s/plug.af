import * as types from './types';



// Soundcloud
export const getSoundcloudErrorsAction = error => ({
	type: types.GET_SOUNDCLOUD_ERRORS,
	payload: error,
});


// Search
export const getSearchErrorAction = error => ({
	type: types.GET_SEARCH_ERRORS,
	payload: error,
});


export const clearSearchErrorsAction = () => ({
	type: types.CLEAR_SEARCH_ERRORS,
});


// Register 
export const getRegisterErrorsAction = error => ({
	type: types.GET_REGISTER_ERRORS,
	payload: error,
});

export const clearRegisterErrorsAction = error => ({
	type: types.CLEAR_REGISTER_ERRORS,
});


// Login
export const getLoginErrorsAction = error => ({
	type: types.GET_LOGIN_ERRORS,
	payload: error,
});

export const clearLoginErrorsAction = error => ({
	type: types.CLEAR_LOGIN_ERRORS,
});


// API
export const getPlugErrorsAction = error => ({
	type: types.GET_PLUG_ERRORS,
	payload: error,
});

export const clearPlugErrorsAction = error => ({
	type: types.CLEAR_PLUG_ERRORS,
});


