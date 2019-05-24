// Redux
import * as types from './types';
import store from '../../state/store';

/*
******************
Action Creators
******************
 */

export const swipeRightAction = () => ({
	type: types.SWIPE_RIGHT
});

export const swipeLeftAction = () => ({
	type: types.SWIPE_LEFT,
});

export const swipeRewindAction = () => ({
	type: types.SWIPE_REWIND
});
