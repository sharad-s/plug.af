import store from '../../state/store';
// Action Creators
import { openModal as open, closeModal as close } from './actions';
import {
	setModalSeen,
	getModalSeen,
	getEmailCollected,
	setEmailCollected,
} from '../../utils/localstorage';

const expirationDuration = 1000 * 60 * 60 * 12; // 12 hours
// const expirationDuration = 1000 * 20; // 12 hours

export const openModal = () => {
	const { dispatch } = store;

	// Get current Time and Last Modal Seen Time
	const modalExpiration = getModalSeen();
	const newExpiration = new Date().getTime() + expirationDuration;
	const currentTime = new Date().getTime();

	const emailCollected = getEmailCollected();
	if (emailCollected) return;

	// If Modal has been seen before on this device in the past 12 hours, don't show it again right now
	if (currentTime < modalExpiration) {
		// alert(
		// 	`DONT SHOW MODAL: ${currentTime}, ${modalExpiration}, ${currentTime <
		// 		modalExpiration}`,
		// );
		return;
	}

	// Else, show the modal
	dispatch(open());

	// Log modal seen in localstorage
	setModalSeen(newExpiration);
};

export const closeModal = () => {
	const { dispatch } = store;
	dispatch(close());
};
