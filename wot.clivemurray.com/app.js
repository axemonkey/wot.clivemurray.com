import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';

const appFolder = `${path.resolve()}/wot.clivemurray.com`;
const wotApp = express();

wotApp.engine('hbs', engine({
	extname: 'hbs',
}));
wotApp.set('views', `${appFolder}/views`);
wotApp.set('view engine', 'hbs');
wotApp.use(express.static(`${appFolder}/public`));

wotApp.get('/', (req, res) => {
	res.render('index');
});

export {wotApp};
