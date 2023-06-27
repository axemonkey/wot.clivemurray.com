const minThings = 2;
const maxThings = 20;

const gamesThings = [
	'Munchkin',
	'Escape the Dark Castle',
	'Unearth',
	'Star Fluxx',
	'Martian Fluxx',
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

const defaultThings = [
	['Pizza', 'Burger', 'Thai', 'Fryup', 'Indian', 'Chinese', 'Sushi', 'Pasta', 'Tex-Mex'],
	// ['Horror', 'Comedy', 'Action', 'Drama', 'Sci-Fi', 'Documentary', 'Thriller'],
	// ['Iron Man', 'Captain America', 'The Hulk', 'Thor', 'Ant-Man', 'Doctor Strange', 'Spider-Man', 'Black Panther', 'Captain Marvel', 'Scarlet Witch', 'Black Widow', 'Hawkeye', 'Vision'],
	// ['Star Wars', 'Star Trek', 'Harry Potter', 'Lord of the Rings', 'The Avengers', 'Batman', 'James Bond'],
];

const pickDefaultThings = () => {
	return defaultThings[Math.floor(Math.random() * defaultThings.length)];
};

const getThingsFromURL = () => {
	let urlThings;
	const params = new URLSearchParams(document.location.search);
	if (params.get('things')) {
		urlThings = decodeURIComponent(params.get('things')).split('^');
	}
	return urlThings;
};

const providedThings = getThingsFromURL();
const things = providedThings ? providedThings : pickDefaultThings();

const shuffle = arr => { // randomly rearanges the items in an array
	const result = [];
	for (let i = arr.length - 1; i >= 0; i--) {
		// picks an integer between 0 and i:
		const r = Math.floor(Math.random() * (i + 1)); // NOTE: use a better RNG if cryptographic security is needed
		// inserts the arr[i] element in the r-th free space in the shuffled array:
		for (let j = 0, k = 0; j <= arr.length - 1; j++) {
			if (result[j] === undefined) {
				if (k === r) {
					result[j] = arr[i].trim(); // NOTE: if array contains objects, this doesn't clone them! Use a better clone function instead, if that is needed.
					break;
				}
				k++;
			}
		}
	}
	return result;
};

const randomThings = shuffle(things);

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

const degToRad = deg => {
	return (Number.parseInt(deg, 10) * Math.PI) / 180;
};

const cosDeg = angle => {
	return Math.cos(degToRad(Number.parseInt(angle, 10)));
};

const sinDeg = angle => {
	return Math.sin(degToRad(Number.parseInt(angle, 10)));
};

const getRandColourValue = () => {
	return (Math.floor(Math.random() * 6) + 4) * 20;
};

const getRandRGB = () => {
	const r = getRandColourValue();
	const g = getRandColourValue();
	const b = getRandColourValue();

	return `${r}, ${g}, ${b}`;
};

const makeText = (index, container, radius, angle, padding) => {
	const newTextDiv = document.createElement('div');
	newTextDiv.classList.add('optionText');
	newTextDiv.innerHTML = `<p class="option" id="option${index}">${randomThings[index]}</p>`;
	container.append(newTextDiv);
	newTextDiv.style.left = `${padding}px`;
	newTextDiv.style.top = `calc(50% - ${newTextDiv.offsetHeight / 2}px`;
	newTextDiv.style.width = `${radius * 2}px`;
	newTextDiv.style.transform = `perspective(none) rotate(${angle}deg)`;
};

const setupMain = () => {
	const boundingEl = document.querySelector('main');
	boundingEl.innerHTML = '';
	const newArticle = document.createElement('article');
	const wheelCanvas = document.createElement('canvas');
	const pointerCanvas = document.createElement('canvas');
	wheelCanvas.classList.add('wheel');
	pointerCanvas.classList.add('pointer');
	newArticle.append(wheelCanvas);
	boundingEl.append(newArticle);
	boundingEl.append(pointerCanvas);

	const buttons = document.querySelectorAll('.buttons button');
	for (const button of buttons) {
		button.classList.add('yay');
	}
};

const changeThings = () => {
	const url = `/things?things=${encodeURIComponent(randomThings.join('^'))}`;
	document.location = url;
};

const initWot = () => {
	let portrait = false;
	if (document.querySelector('#wheel-holder')) {
		document.body.classList.add('js');
		if (document.body.offsetHeight > document.body.offsetWidth) {
			document.body.classList.add('portrait');
			portrait = true;
		}
		setupMain();

		const container = document.querySelector('article');
		const canvas = document.querySelector('.wheel');
		if (canvas.getContext) {
			const ctx = canvas.getContext('2d');
			const boundingEl = document.querySelector('main');
			const headerEl = document.querySelector('header');
			const buttonsEl = document.querySelector('.buttons');
			const maxDim = Math.min(boundingEl.offsetWidth, boundingEl.offsetHeight);
			const centrePoint = maxDim / 2;
			let verticalCentre = boundingEl.offsetHeight / 2;
			const padding = 10;
			const radius = centrePoint - padding;
			const sectionAngle = 360 / randomThings.length;

			boundingEl.style.width = `${maxDim}px`;
			boundingEl.style.height = `${maxDim}px`;
			canvas.width = maxDim;
			canvas.height = maxDim;

			if (portrait) {
				boundingEl.style.flexGrow = 0;
				headerEl.style.flexGrow = 1;
				buttonsEl.style.flexGrow = 1;
				verticalCentre = boundingEl.offsetHeight / 2;
			}

			for (let index in randomThings) {
				if (Object.hasOwn(randomThings, index)) {
					// draw segments
					index = Number.parseInt(index, 10);
					const angle = index * sectionAngle;
					const angleRad = degToRad(angle);
					const lineX = (radius * cosDeg(angle));
					const lineY = (radius * sinDeg(angle));
					const nextAngle = (index + 1) * sectionAngle;
					const nextAngleRad = degToRad(nextAngle);

					ctx.beginPath();
					ctx.moveTo(centrePoint, centrePoint);
					ctx.lineTo(centrePoint + lineX, centrePoint + lineY);
					ctx.arc(centrePoint, centrePoint, radius, angleRad, nextAngleRad, false);
					ctx.fillStyle = `rgb(${getRandRGB()})`;
					ctx.fill();
					ctx.closePath();

					// render text DIVs
					const textAngle = Number.parseInt(-angle - (sectionAngle / 2), 10);
					makeText(index, container, radius, textAngle, padding);
				}
			}

			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgb(0, 0, 0)';

			// draw dividing lines
			for (const index in randomThings) {
				if (Object.hasOwn(randomThings, index)) {
					const angle = index * sectionAngle;
					const lineX = (radius * cosDeg(angle));
					const lineY = (radius * sinDeg(angle));
					ctx.beginPath();
					ctx.moveTo(centrePoint, centrePoint);
					ctx.lineTo(centrePoint + lineX, centrePoint + lineY);
					ctx.stroke();
					ctx.closePath();
				}
			}

			// draw circle
			ctx.beginPath();
			ctx.moveTo(centrePoint, centrePoint);
			ctx.arc(centrePoint, centrePoint, radius, 0, Math.PI * 2, true);
			ctx.stroke();
			ctx.closePath();

			// draw pointer
			const pointerCanvas = document.querySelector('.pointer');
			if (pointerCanvas.getContext) {
				pointerCanvas.style.top = `${verticalCentre - 20}px`;
				const pctx = pointerCanvas.getContext('2d');
				pointerCanvas.width = 100;
				pointerCanvas.height = 40;
				pctx.beginPath();
				pctx.moveTo(100, 40);
				pctx.lineTo(100, 0);
				pctx.lineTo(60, 20);
				pctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
				pctx.fill();
			}
		}
	}
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
	const targetThingIndex = forceTarget || Math.floor(Math.random() * randomThings.length);
	document.querySelector(`#option${targetThingIndex}`).classList.add('winner');
	const sectionAngle = 360 / randomThings.length;
	const targetRotation = Math.round((targetThingIndex * sectionAngle) + (sectionAngle / 2));
	// console.log(`target item: ${randomThings[targetThingIndex]}`);
	// console.log(`targetRotation: ${targetRotation}`);
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
		// console.log(`targetRotation: ${targetRotation}`);

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

const initForm = () => {
	const urlThings = getThingsFromURL();

	if (urlThings && urlThings.length >= 2) {
		// remove all things
		const allThings = document.querySelector('.all-things');
		const theThings = allThings.querySelectorAll('.thing-entry');

		for (const thisThing of theThings) {
			thisThing.parentNode.removeChild(thisThing);
		}

		for (const urlThing of urlThings) {
			addThing(urlThing);
		}
	}
};

const submitThings = () => {
	let formValid = true;
	const thingEntries = document.querySelectorAll('.thing-entry input');
	const values = [];
	for (const thingEntry of thingEntries) {
		if (thingEntry.value.length > 0) {
			thingEntry.classList.remove('invalid');
			values.push(encodeURIComponent(thingEntry.value));
		} else {
			thingEntry.classList.add('invalid');
			formValid = false;
		}
	}

	if (formValid) {
		document.location.href = `/?things=${encodeURIComponent(values.join('^'))}`;
	} else {
		console.log('some things are empty');
	}
};

const addThing = thingValue => {
	const allThings = document.querySelector('.all-things');
	const theThings = allThings.querySelectorAll('.thing-entry');
	const currentNumberOfThings = theThings.length;

	if (currentNumberOfThings < maxThings) {
		// add thing
		const newThingDiv = document.createElement('div');
		const newThingLabel = document.createElement('label');
		const newThingInput = document.createElement('input');
		const newThingRemoveButton = document.createElement('button');
		const newThingValue = thingValue || `Thing ${currentNumberOfThings + 1}`;

		newThingDiv.classList.add('thing-entry');
		newThingLabel.setAttribute('for', `thing${currentNumberOfThings + 1}`);
		newThingLabel.innerHTML = `Thing ${currentNumberOfThings + 1}`;
		newThingInput.classList.add('thing-value');
		newThingInput.setAttribute('type', 'text');
		newThingInput.setAttribute('maxlength', 30);
		newThingInput.setAttribute('name', `thing${currentNumberOfThings + 1}`);
		newThingInput.id = `thing${currentNumberOfThings + 1}`;
		newThingInput.value = newThingValue;
		newThingRemoveButton.setAttribute('tabindex', '-1');
		newThingRemoveButton.classList.add('removeThing');
		newThingRemoveButton.classList.add('form-button');
		newThingRemoveButton.innerHTML = 'Remove this thing';

		newThingDiv.append(newThingLabel);
		newThingDiv.append(newThingInput);
		newThingDiv.append(newThingRemoveButton);

		allThings.append(newThingDiv);
	} else {
		// can't add thing
		console.log(`couldn't add thing`);
	}
};

const renumberThings = () => {
	const allThings = document.querySelector('.all-things');
	const theThings = allThings.querySelectorAll('.thing-entry');
	const currentNumberOfThings = theThings.length;

	for (let index = 0; index < currentNumberOfThings; index++) {
		const theThing = theThings[index];
		const theThingLabel = theThing.querySelector('label');
		const theThingInput = theThing.querySelector('input');

		theThingLabel.setAttribute('for', `thing${index + 1}`);
		theThingLabel.innerHTML = `Thing ${index + 1}`;
		theThingInput.setAttribute('name', `thing${index + 1}`);
		theThingInput.id = `thing${index + 1}`;
	}
};

const removeThing = thingButton => {
	const allThings = document.querySelector('.all-things');
	const theThings = allThings.querySelectorAll('.thing-entry');
	const currentNumberOfThings = theThings.length;

	if (currentNumberOfThings > minThings) {
		const thingEntry = thingButton.parentNode;
		thingEntry.parentNode.removeChild(thingEntry);
		renumberThings();
	} else {
		// can't remove thing
		console.log(`couldn't remove thing`);
	}
};

const resetThings = () => {
	const allThings = document.querySelector('.all-things');
	const theThings = allThings.querySelectorAll('.thing-entry');

	for (const thisThing of theThings) {
		thisThing.parentNode.removeChild(thisThing);
	}

	let x = 0;
	while (x < 3) {
		addThing();
		x++;
	}
};

const checkInput = event => {
	const inputEl = event.target;
	const inputValue = inputEl.value;
	const matcher = /\^/g;

	if (matcher.test(inputValue)) {
		inputEl.value = inputValue.replaceAll('^', '');
	}
};

// events
if (document.querySelector('#wheel-holder')) {
	window.addEventListener('load', initWot);
	window.addEventListener('resize', initWot);
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

if (document.querySelector('#enter-things')) {
	window.addEventListener('load', initForm);

	document.querySelector('#go').addEventListener('click', event => {
		event.preventDefault();
		submitThings();
	});
	document.querySelector('#cancel').addEventListener('click', event => {
		event.preventDefault();
		window.history.go(-1);
	});
	document.querySelector('#addThing').addEventListener('click', event => {
		event.preventDefault();
		addThing();
	});
	document.querySelector('#resetThings').addEventListener('click', event => {
		event.preventDefault();
		resetThings();
	});

	document.addEventListener('click', event => {
		if (event.target.classList.contains('removeThing')) {
			event.preventDefault();
			removeThing(event.target);
		}
	});

	document.addEventListener('keypress', event => {
		if (event.target.classList.contains('thing-value')) {
			window.setTimeout(() => {
				checkInput(event);
			}, 100);
		}
	});
	document.addEventListener('paste', event => {
		if (event.target.classList.contains('thing-value')) {
			window.setTimeout(() => {
				checkInput(event);
			}, 100);
		}
	});
}

document.addEventListener('click', event => {
	if (event.target.classList.contains('back-link')) {
		event.preventDefault();
		window.history.back();
	}
});
