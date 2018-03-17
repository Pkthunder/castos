const rq = require('request-promise');
const request = rq.defaults({
	baseUrl: 'https://itunes.apple.com',
	resolveWithFullResponse: true
})

const spaceRegex = /%20/g;
const newlineRegex = /\n/g;

exports.searchForPodcasts = function (searchTerm, country, other) {
	let term = encodeURIComponent(searchTerm);
	term = term.replace(spaceRegex, '+');

	other = !!other ? other : {};

	let paramsMap = {
		term: term,
		country: (country || 'US').toLowerCase(),
		media: 'podcast'
	};

	paramsMap = Object.assign(paramsMap, other);

	let params = '';
	Object.keys(paramsMap).forEach( function (param) {
		params += `${param}=${paramsMap[param]}&`
	});
	params = params.slice(0, -1);		// removes trailing '&'

	return request('/search?' + params)
	.then( function (results) {
		//console.log(results.href);
		return JSON.parse(results.toJSON().body.replace(newlineRegex, ''));
	});
};