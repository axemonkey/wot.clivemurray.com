import {degToRad, cosDeg, sinDeg} from './maths.js';
import {getRandRGB} from './colours.js';

const makeText = (index, text, container, radius, angle, padding) => {
	const newTextDiv = document.createElement('div');
	newTextDiv.classList.add('optionText');
	newTextDiv.innerHTML = `<p class="option" id="option${index}">${text}</p>`;
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

const initWot = things => {
	let portrait = false;
	if (document.querySelector('#wheel-holder')) {
		document.body.classList.add('js');
		document.body.classList.add('wheelpage');
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
			const sectionAngle = 360 / things.length;

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

			for (let index in things) {
				if (Object.hasOwn(things, index)) {
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
					makeText(index, things[index], container, radius, textAngle, padding);
				}
			}

			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgb(0, 0, 0)';

			// draw dividing lines
			for (const index in things) {
				if (Object.hasOwn(things, index)) {
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

export {
	initWot,
};
