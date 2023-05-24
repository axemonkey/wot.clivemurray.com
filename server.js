import {wotApp} from './wot.clivemurray.com/app.js';

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	wotApp
		.listen(7777);
} else if (env === 'production') {
	wotApp
		.listen(process.env.PORT); // host specifies port number
}
