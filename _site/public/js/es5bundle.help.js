(function () {
	'use strict';

	const checkWEI = () => {
	  const DRMHorseshit = navigator.getEnvironmentIntegrity;
	  // const DRMHorseshit = 'horse';
	  console.log(`navigator.getEnvironmentIntegrity: ${DRMHorseshit}`);
	  if (DRMHorseshit !== undefined) {
	    document.querySelector('body').innerHTML = '<article class="drm-notice"><h1>Your browser contains Google DRM</h1><p>“Web Environment Integrity” is a Google euphemism for a DRM that is designed to prevent ad-blocking. In support of an open web, this website does not function with this DRM. Please install a browser such as <a href="https://mozilla.org/en-US/firefox/new/">Firefox</a> that respects your freedom and supports ad blockers.</p><p>If you would like to know more:</p><ul><li><a href="https://vivaldi.com/blog/googles-new-dangerous-web-environment-integrity-spec/">Vivaldi: Unpacking Google’s new “dangerous” Web-Environment-Integrity specification</a></li><li><a href="https://securityboulevard.com/2023/07/google-wei-drm-adtech-richixbw/">Security Boulevard: Google Wants to DRM your OS for ‘Web Environment Integrity’</a></li><li><a href="https://www.techradar.com/pro/googles-new-plan-for-the-future-of-the-web-has-a-lot-of-people-worried-heres-why">TechRadar: Google\'s new plan for the future of the web has a lot of people worried - here\'s why</a></li></ul></article>';
	    return true;
	  }
	  return false;
	};

	const initPage = () => {
	  document.addEventListener('click', event => {
	    if (event.target.classList.contains('back-link')) {
	      event.preventDefault();
	      window.history.back();
	    }
	  });
	};
	window.addEventListener('load', () => {
	  if (checkWEI()) {
	    return;
	  }
	  initPage();
	});

})();
