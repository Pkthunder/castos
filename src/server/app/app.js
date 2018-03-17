var itunes = require('./utils/itunes-api');

itunes.searchForPodcasts('Radio Wonderland')
.then( function (results) {
	console.log(results);
})