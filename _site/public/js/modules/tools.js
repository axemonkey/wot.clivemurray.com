const getThingsFromURL = () => {
	let urlThings;
	const params = new URLSearchParams(document.location.search);
	if (params.get('things')) {
		urlThings = decodeURIComponent(params.get('things')).split('^');
	}
	return urlThings;
};

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

export {
	getThingsFromURL,
	shuffle,
	checkWEI,
};
