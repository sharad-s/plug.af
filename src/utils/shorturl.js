const fetch = require('node-fetch');
const { sha3_512 } = require('js-sha3');

const endpoint =
	'https://www.jsonstore.io/4ba866347a406c524cf61bb755845a42e2f1a3e0864d4f5bc238292a2ecffb46';

const playlistURL =
	'https://soundcloud.com/99q/sets/6v6';

function send_request(longUrl, shortUrl) {
	const url = `${endpoint}/${shortUrl}`;

	return fetch(url, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(longUrl), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		// .then(response => console.log('Success:', JSON.stringify(response)))
		.then(() => console.log(`Saved ${longUrl} to ${shortUrl}`))
		.catch(error => console.error('Error:', error));
}

// async function main() {
// 	const shortURL = await setShortURL();
// 	await getLongURL(shortURL);
// }

async function setShortURL(longURL = playlistURL) {
	const shortURL = sha3_512(longURL).slice(0, 6);
	await send_request(longURL, shortURL);
	return shortURL;
}

function getShortID(longURL) {
	return sha3_512(longURL).slice(0, 6);
}

function getLongURL(shortURL) {
	const url = `${endpoint}/${shortURL}`;
	return fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(response => {
			const longURL = response.result;
			// console.log('Success:', JSON.stringify(response));
			console.log(`Got ${longURL} from ${shortURL}`);
			return longURL;
		})
		.catch(error => console.error('Error:', error));
}

export { setShortURL, getLongURL, getShortID }