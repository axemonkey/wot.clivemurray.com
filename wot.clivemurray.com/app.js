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

const games = [
	'Munchkin',
	'Escape the Dark Castle',
	'Unearth',
	'Star Fluxx',
	'Doomlings',
	'Dragonwood',
	'Dragonrealm',
	'Forgotten Island',
	'Forgotten Desert',
	'Forgotten Sky',
	'Labyrinth',
	'Boss Monster',
	'Boss Monster: The Next Level',
	'Selfish: Zombie Edition',
	'Selfish: Space Edition',
];

wotApp.get('/games', (req, res) => {
	res.redirect(`/?things=${encodeURIComponent(games.join(','))}`);
});

wotApp.get('/things', (req, res) => {
	res.render('things');
});

wotApp.get('/', (req, res) => {
	res.render('index');
});

export {wotApp};
