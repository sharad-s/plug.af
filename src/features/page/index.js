import store from '../../state/store';
// Action Creators
import { openModal as open, closeModal as close } from './actions';

export const openModal = () => {
	const { dispatch } = store;
	dispatch(open());
};

export const closeModal = () => {
	const { dispatch } = store;
	dispatch(close());
};
