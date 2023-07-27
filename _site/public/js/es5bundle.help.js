(function () {
	'use strict';

	var checkWEI = function checkWEI() {
	  var DRMHorseshit = navigator.getEnvironmentIntegrity;
	  // const DRMHorseshit = 'horse';
	  console.log("navigator.getEnvironmentIntegrity: ".concat(DRMHorseshit));
	  if (DRMHorseshit !== undefined) {
	    document.querySelector('body').innerHTML = '<article class="drm-notice"><h1>Your browser contains Google DRM</h1><p>“Web Environment Integrity” is a Google euphemism for a DRM that is designed to prevent ad-blocking. In support of an open web, this website does not function with this DRM. Please install a browser such as <a href="https://mozilla.org/en-US/firefox/new/">Firefox</a> that respects your freedom and supports ad blockers.</p><p>If you would like to know more:</p><ul><li><a href="https://vivaldi.com/blog/googles-new-dangerous-web-environment-integrity-spec/">Vivaldi: Unpacking Google’s new “dangerous” Web-Environment-Integrity specification</a></li></ul></article>';
	    return true;
	  }
	  return false;
	};

	var initPage = function initPage() {
	  document.addEventListener('click', function (event) {
	    if (event.target.classList.contains('back-link')) {
	      event.preventDefault();
	      window.history.back();
	    }
	  });
	};
	window.addEventListener('load', function () {
	  if (checkWEI()) {
	    return;
	  }
	  initPage();
	});

})();
