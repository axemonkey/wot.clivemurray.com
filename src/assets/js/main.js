import {
	getThingsFromURL,
	shuffle,
} from './modules/tools.js';
import {initWot} from './modules/wheel.js';
import {lapBanner} from './modules/lap-banner.js';

/*

TODO:

* when coming from all games (over 20 items) to the form, don't lose items over 20
* store lists of Things in data files (JSON)
	* the front-end JS for the wheel can read from JSON files
	* 11ty can read JSON data into the NJK templates
* the text items are in a weird alignment when there are 17 Things, but not 15
* some kind of clever font sizing for mobile/portrait layout

TO DONE:

* add a modifier key to 0 which loads ALL games things
* maybe improve the colour selection process
* work out why the footer is too high when the page is long

*/

let currentThings;

const numberOfGamesThingsToPick = 12;

const allGamesThings = [
	'Bag of Dungeon',
	'Boss Monster',
	'Cluedo',
	'Doomlings',
	'Dragonrealm',
	'Dragonwood',
	'Escape the Dark Castle',
	'Escape the Dark Sector',
	'Exploding Kittens',
	'Forbidden Desert',
	'Forbidden Island',
	'Forbidden Jungle',
	'Forbidden Sky',
	'Grimwood',
	'Gubs',
	'Here to Slay',
	'Labyrinth',
	'Martian Fluxx',
	'Munchkin',
	'Munchkin: Critical Role',
	'Munchkin: Marvel',
	'Selfish: Space Edition',
	'Selfish: Zombie Edition',
	'Star Fluxx',
	'Sushi Go',
	'Unearth',
	'Uno Flip',
	'Unstable Unicorns',
];

const defaultThings = [
	['Pizza', 'Burger', 'Thai', 'Fryup', 'Indian', 'Chinese', 'Sushi', 'Pasta', 'Tex-Mex'],
	// ['Horror', 'Comedy', 'Action', 'Drama', 'Sci-Fi', 'Documentary', 'Thriller'],
	// ['Iron Man', 'Captain America', 'The Hulk', 'Thor', 'Ant-Man', 'Doctor Strange', 'Spider-Man', 'Black Panther', 'Captain Marvel', 'Scarlet Witch', 'Black Widow', 'Hawkeye', 'Vision'],
	// ['Star Wars', 'Star Trek', 'Harry Potter', 'Lord of the Rings', 'The Avengers', 'Batman', 'James Bond'],
];

const pickDefaultThings = () => {
	return defaultThings[Math.floor(Math.random() * defaultThings.length)];
};

const resetOptionClasses = () => {
	const options = document.querySelectorAll('.option');
	for (const optionItem of options) {
		optionItem.classList.remove('loser');
		optionItem.classList.remove('throbber');
		optionItem.classList.remove('winner');
	}
};

const start = () => {
	const el = document.querySelector('article');
	el.style.transform = `perspective(none) rotate(0deg)`;
	el.classList.add('spinning');
	resetOptionClasses();
	document.querySelector('#start').classList.add('hide');
	document.querySelector('#stop').classList.remove('hide');
};

const changeThings = () => {
	const url = `/things?things=${encodeURIComponent(currentThings.join('^'))}`;
	document.location = url;
};

const highlightWinner = () => {
	const losers = document.querySelectorAll('.option');
	const winner = document.querySelector('.winner');
	for (const loser of losers) {
		loser.classList.add('loser');
	}

	winner.classList.remove('loser');
	winner.classList.add('throbber');
};

const getTarget = forceTarget => {
	const targetThingIndex = forceTarget || Math.floor(Math.random() * currentThings.length);
	document.querySelector(`#option${targetThingIndex}`).classList.add('winner');
	console.log(`winner: ${currentThings[targetThingIndex]}`);
	const sectionAngle = 360 / currentThings.length;
	const targetRotation = Math.round(((targetThingIndex + 1) * -sectionAngle) + (sectionAngle / 2));
	return targetRotation;
};

const getCurrentRotation = () => {
	const el = document.querySelector('article');
	const currStyle = window.getComputedStyle(el);
	const currTrans = currStyle.getPropertyValue('transform');
	const values = currTrans.split('(')[1].split(')')[0].split(',');
	const currAngle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
	let returnAngle = currAngle;
	return returnAngle;
};

const stop = forceTarget => {
	const el = document.querySelector('article');
	if (!el.classList.contains('stopping')) {
		document.querySelector('#stop').classList.remove('yay');
		const currentRotation = getCurrentRotation();
		el.classList.remove('spinning');
		el.classList.add('stopping');
		el.style.transform = `perspective(none) rotate(${currentRotation}deg)`;
		const targetRotation = getTarget(forceTarget);
		const extraSpins = 2 + Math.round(Math.random() * 3);
		const spindownDurationSeconds = 2 + (extraSpins / 2);

		// console.log(`extraSpins: ${extraSpins}`);
		// console.log(`currentRotation: ${currentRotation}`);
		// console.log(`targetRotation: ${targetRotation}`);

		const spinToStop = [
			{
				transform: `perspective(none) rotate(${currentRotation}deg)`,
			},
			{
				transform: `perspective(none) rotate(${targetRotation + (360 * extraSpins)}deg)`,
			},
		];

		const spinToStopTiming = {
			duration: spindownDurationSeconds * 1000,
			iterations: 1,
			easing: 'ease-out',
		};

		el.animate(spinToStop, spinToStopTiming);
		window.setTimeout(() => {
			el.style.transform = `perspective(none) rotate(${targetRotation}deg)`;
			el.classList.remove('stopping');
			highlightWinner();
			document.querySelector('#start').classList.remove('hide');
			document.querySelector('#stop').classList.add('hide');
			document.querySelector('#stop').classList.add('yay');
		}, spindownDurationSeconds * 1000);
	}
};

const toggle = () => {
	const container = document.querySelector('article');
	if (!container.classList.contains('stopping')) {
		if (container.classList.contains('spinning')) {
			stop();
		} else {
			start();
		}
	}
};

// events
if (document.querySelector('#wheel-holder')) {
	const providedThings = getThingsFromURL();
	const things = providedThings ? providedThings : pickDefaultThings();
	// currentThings = things;
	currentThings = shuffle(things);

	window.addEventListener('load', () => {
		initWot(currentThings);
		console.log(`${currentThings.length} things on the wheel`);
		lapBanner.init();
	});

	window.addEventListener('resize', () => {
		initWot(currentThings);
	});

	window.addEventListener('keydown', e => {
		if (e.key === ' ') {
			toggle();
		}

		if (e.key === '0') {
			const howMany = (e.ctrlKey ? allGamesThings.length : numberOfGamesThingsToPick);
			const shuffledGamesThings = allGamesThings.sort(() => 0.5 - Math.random());
			const gamesThings = shuffledGamesThings.slice(0, howMany);
			const url = `/?things=${encodeURIComponent(gamesThings.join('^'))}`;
			document.location = url;
		}

		if (e.key === 'Enter') {
			console.log(getCurrentRotation());
		}
	});

	document.querySelector('#start').addEventListener('click', () => {
		start();
	});

	document.querySelector('#stop').addEventListener('click', () => {
		stop();
	});

	document.querySelector('#change').addEventListener('click', () => {
		changeThings();
	});
}
