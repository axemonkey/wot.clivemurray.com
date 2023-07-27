import {getThingsFromURL, shuffle, checkWEI} from './modules/tools.js';
import {initWot} from './modules/wheel.js';

/*

TODO:
* some kind of clever font sizing for mobile/portrait layout
* examples button (inline modal?) on wheel page

*/

let currentThings;

const gamesThings = [
	'Munchkin',
	'Escape the Dark Castle',
	'Unearth',
	'Star Fluxx',
	'Martian Fluxx',
	'Doomlings',
	'Dragonwood',
	'Dragonrealm',
	'Forbidden Island',
	'Forbidden Desert',
	'Forbidden Sky',
	'Labyrinth',
	'Boss Monster',
	'Boss Monster: The Next Level',
	'Selfish: Zombie Edition',
	'Selfish: Space Edition',
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
	const sectionAngle = 360 / currentThings.length;
	const targetRotation = Math.round((targetThingIndex * sectionAngle) + (sectionAngle / 2));
	const extraSpins = 3;
	return targetRotation + (extraSpins * 360);
};

const getCurrentRotation = () => {
	const el = document.querySelector('article');
	const currStyle = window.getComputedStyle(el);
	const currTrans = currStyle.getPropertyValue('transform');
	const values = currTrans.split('(')[1].split(')')[0].split('^');
	const currAngle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
	return (currAngle > 0 ? currAngle : currAngle + 360);
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

		const spinToStop = [
			{
				transform: `perspective(none) rotate(${currentRotation}deg)`,
			},
			{
				transform: `perspective(none) rotate(${targetRotation}deg)`,
			},
		];

		const spinToStopTiming = {
			duration: 3000,
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
		}, 3000);
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
	currentThings = shuffle(things);

	window.addEventListener('load', () => {
		if (checkWEI()) {
			return;
		}
		initWot(currentThings);
	});

	window.addEventListener('resize', () => {
		initWot(currentThings);
	});

	window.addEventListener('keydown', e => {
		if (e.key === ' ') {
			toggle();
		}

		if (e.key === '0') {
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
