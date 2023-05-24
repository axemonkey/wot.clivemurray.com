const things = [
	'Munchkin',
	'Escape the Dark Castle',
	'Unearth',
	'Star Fluxx',
	'Doomlings',
	'Dragonwood',
	'Dragonrealm',
	'Forgotten Island',
	'Forgotten Desert ',
	'Forgotten Sky',
	'Labyrinth',
	'Boss Monster',
	'Boss Monster: The Next Level',
	'Selfish: Zombie Edition',
	'Selfish: Space Edition',
];

const shuffle = arr => { // randomly rearanges the items in an array
	const result = [];
	for (let i = arr.length - 1; i >= 0; i--) {
		// picks an integer between 0 and i:
		const r = Math.floor(Math.random() * (i + 1)); // NOTE: use a better RNG if cryptographic security is needed
		// inserts the arr[i] element in the r-th free space in the shuffled array:
		for (let j = 0, k = 0; j <= arr.length - 1; j++) {
			if (result[j] === undefined) {
				if (k === r) {
					result[j] = arr[i]; // NOTE: if array contains objects, this doesn't clone them! Use a better clone function instead, if that is needed.
					break;
				}
				k++;
			}
		}
	}
	return result;
};

const randomThings = shuffle(things);

const spinIt = () => {
	const el = document.querySelector('article');
	// el.style.transform = `rotate(0deg)`;
	el.classList.add('spinning');
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
	newTextDiv.style.transform = `rotate(${angle}deg)`;
};

const initWot = () => {
	console.log(`WOT`);

	const container = document.querySelector('article');
	const canvas = document.querySelector('.wheel');
	if (canvas.getContext) {
		const ctx = canvas.getContext('2d');
		// const vis = window.visualViewport;
		// const maxDim = Math.min(vis.width, vis.height);
		const maxDim = 800;
		const centrePoint = maxDim / 2;
		const padding = 10;
		const radius = centrePoint - padding;
		const sectionAngle = 360 / randomThings.length;
		console.log(`sectionAngle: ${sectionAngle}`);

		canvas.width = maxDim;
		canvas.height = maxDim;

		for (let index in randomThings) {
			if (Object.hasOwn(randomThings, index)) {
				// console.log(`thing: ${thing}`);

				// draw segments
				index = Number.parseInt(index, 10);
				const angle = index * sectionAngle;
				const angleRad = degToRad(angle);
				const lineX = (radius * cosDeg(angle));
				const lineY = (radius * sinDeg(angle));
				const nextAngle = (index + 1) * sectionAngle;
				const nextAngleRad = degToRad(nextAngle);
				// const nextLineX = (radius * cosDeg(nextAngle));
				// const nextLineY = (radius * sinDeg(nextAngle));

				console.log(`index: ${index}, lineX: ${lineX}, lineY: ${lineY}, angle: ${angle}, nextAngle: ${nextAngle}, angleRad: ${angleRad}, nextAngleRad: ${nextAngleRad}`);

				ctx.beginPath();
				ctx.moveTo(centrePoint, centrePoint);
				ctx.lineTo(centrePoint + lineX, centrePoint + lineY);
				// ctx.lineTo(centrePoint + nextLineX, centrePoint + nextLineY);
				// ctx.lineTo(centrePoint + lineX, centrePoint + lineY);
				ctx.arc(centrePoint, centrePoint, radius, degToRad(angle), degToRad(nextAngle), false);

				ctx.fillStyle = `rgb(${getRandRGB()})`;
				ctx.fill();

				// ctx.strokeStyle = `rgb(${getRandRGB()})`;
				// ctx.stroke();

				ctx.closePath();

				// draw text
				console.log(randomThings[index]);
				const textAngle = Number.parseInt(-angle - (sectionAngle / 2), 10);
				makeText(index, container, radius, textAngle, padding);
			}
		}

		// draw pointer
		const pointerCanvas = document.querySelector('.pointer');
		if (pointerCanvas.getContext) {
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
		// ctx.beginPath();
		// ctx.arc(centrePoint, centrePoint, radius, 0, Math.PI * 2, true);
		// ctx.fillStyle = 'rgb(200, 200, 0)';
		// ctx.fill();

		spinIt();
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
	console.log(`target item: ${randomThings[targetThingIndex]}`);
	// console.log(`currentRotation: ${currentRotation}`);
	console.log(`targetRotation: ${targetRotation}`);
	const extraSpins = 3;
	return targetRotation + (extraSpins * 360);
};

const getCurrentRotation = () => {
	const el = document.querySelector('article');
	const currStyle = window.getComputedStyle(el);
	const currTrans = currStyle.getPropertyValue('transform');
	const values = currTrans.split('(')[1].split(')')[0].split(',');
	const currAngle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
	return (currAngle > 0 ? currAngle : currAngle + 360);
};

const stop = forceTarget => {
	console.log('stop');
	const el = document.querySelector('article');
	const currentRotation = getCurrentRotation();
	console.log(currentRotation);
	el.classList.remove('spinning');
	el.style.transform = `rotate(${currentRotation}deg)`;
	const targetRotation = getTarget(forceTarget);
	console.log(`targetRotation: ${targetRotation}`);

	const spinToStop = [
		{
			transform: `rotate(${currentRotation}deg)`,
		},
		{
			transform: `rotate(${targetRotation}deg)`,
		},
	];

	const spinToStopTiming = {
		duration: 3000,
		iterations: 1,
		easing: 'ease-out',
	};

	el.animate(spinToStop, spinToStopTiming);
	window.setTimeout(() => {
		el.style.transform = `rotate(${targetRotation}deg)`;
		highlightWinner();
	}, 3000);
};

window.addEventListener('load', initWot);
window.addEventListener('keydown', e => {
	if (e.key === ' ') {
		stop();
	}
	if (e.key === 'Enter') {
		console.log(getCurrentRotation());
	}
	if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5') {
		stop(e.key);
	}
});
