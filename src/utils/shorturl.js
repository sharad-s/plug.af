const endpoint =
	'https://www.jsonstore.io/4ba866347a406c524cf61bb755845a42e2f1a3e0864d4f5bc238292a2ecffb46';

function getrandom() {
	var text = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

function geturl(url) {
	// var url = document.getElementById("urlinput").value;
	var protocol_ok =
		url.startsWith('http://') ||
		url.startsWith('https://') ||
		url.startsWith('ftp://');
	if (!protocol_ok) {
		newurl = 'https://' + url;
		return newurl;
	} else {
		return url;
	}
}

function genhash() {
	if (window.location.hash == '') {
		window.location.hash = getrandom();
	}
}

function shorturl() {
	var longurl = geturl();
	genhash();
	send_request(longurl);
}

function send_request(url) {
	fetch(endpoint + '/' + window.location.hash.substr(1), {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(url), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(response => console.log('Success:', JSON.stringify(response)))
		.catch(error => console.error('Error:', error));
}
