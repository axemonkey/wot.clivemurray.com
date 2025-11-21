const initPage = () => {
	document.addEventListener('click', (event) => {
		if (event.target.classList.contains('back-link')) {
			event.preventDefault();
			window.history.back();
		}
	});
};

window.addEventListener('load', () => {
	initPage();
});
