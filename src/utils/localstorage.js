export const setModalSeen = (timestamp) => {
	return localStorage.setItem('modalSeen', timestamp)
}

export const getModalSeen = () => {
	return localStorage.getItem('modalSeen')
}

export const setEmailCollected = () => {
	return localStorage.setItem('emailCollected', true)
}


export const getEmailCollected = () => {
	return localStorage.getItem('emailCollected')
}