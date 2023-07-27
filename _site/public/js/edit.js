import {
	initForm,
	submitThings,
	addThing,
	resetThings,
	removeThing,
	checkInput,
} from './modules/form.js';
import {checkWEI} from './modules/tools.js';

// events
if (document.querySelector('#enter-things')) {
	window.addEventListener('load', () => {
		if (checkWEI()) {
			return;
		}
		initForm();
	});

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
