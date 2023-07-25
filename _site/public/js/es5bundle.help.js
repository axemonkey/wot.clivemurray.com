(function () {
	'use strict';

	document.addEventListener('click', function (event) {
	  if (event.target.classList.contains('back-link')) {
	    event.preventDefault();
	    window.history.back();
	  }
	});

})();
