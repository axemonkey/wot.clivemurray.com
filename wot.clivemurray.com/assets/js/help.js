document.addEventListener('click', event => {
	if (event.target.classList.contains('back-link')) {
		event.preventDefault();
		window.history.back();
	}
});
