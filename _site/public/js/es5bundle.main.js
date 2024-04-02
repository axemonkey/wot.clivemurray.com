(function () {
	'use strict';

	const getThingsFromURL = () => {
	  let urlThings;
	  const params = new URLSearchParams(document.location.search);
	  if (params.get('things')) {
	    urlThings = decodeURIComponent(params.get('things')).split('^');
	  }
	  return urlThings;
	};
	const shuffle = arr => {
	  // randomly rearanges the items in an array
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
	  // console.log(`navigator.getEnvironmentIntegrity: ${DRMHorseshit}`);

	  if (DRMHorseshit !== undefined) {
	    document.querySelector('body').innerHTML = '<article class="drm-notice"><h1>Your browser contains Google DRM</h1><p>“Web Environment Integrity” is a Google euphemism for a DRM that is designed to prevent ad-blocking. In support of an open web, this website does not function with this DRM. Please install a browser such as <a href="https://mozilla.org/en-US/firefox/new/">Firefox</a> that respects your freedom and supports ad blockers.</p><p>If you would like to know more:</p><ul><li><a href="https://vivaldi.com/blog/googles-new-dangerous-web-environment-integrity-spec/">Vivaldi: Unpacking Google’s new “dangerous” Web-Environment-Integrity specification</a></li><li><a href="https://securityboulevard.com/2023/07/google-wei-drm-adtech-richixbw/">Security Boulevard: Google Wants to DRM your OS for ‘Web Environment Integrity’</a></li><li><a href="https://www.techradar.com/pro/googles-new-plan-for-the-future-of-the-web-has-a-lot-of-people-worried-heres-why">TechRadar: Google\'s new plan for the future of the web has a lot of people worried - here\'s why</a></li></ul></article>';
	    return true;
	  }
	  return false;
	};

	const degToRad = deg => {
	  return Number.parseInt(deg, 10) * Math.PI / 180;
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
	          const lineX = radius * cosDeg(angle);
	          const lineY = radius * sinDeg(angle);
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
	          const textAngle = Number.parseInt(-angle - sectionAngle / 2, 10);
	          makeText(index, things[index], container, radius, textAngle, padding);
	        }
	      }
	      ctx.lineWidth = 2;
	      ctx.strokeStyle = 'rgb(0, 0, 0)';

	      // draw dividing lines
	      for (const index in things) {
	        if (Object.hasOwn(things, index)) {
	          const angle = index * sectionAngle;
	          const lineX = radius * cosDeg(angle);
	          const lineY = radius * sinDeg(angle);
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

	const lapBanner = {
	  storageKey: 'loveAndPainkillers-banner-config',
	  numberOfDaysToHideBanner: 7,
	  init: () => {
	    // if not cookie
	    if (lapBanner.cookieCheck()) {
	      lapBanner.createStyles();
	      lapBanner.showBanner();
	    }
	  },
	  cookieCheck: () => {
	    const ls = localStorage.getItem(lapBanner.storageKey);
	    const lsObj = JSON.parse(ls);
	    if (lsObj && lsObj.cookieDismissed && lapBanner.isCookieStillGood(lsObj.cookieDismissed)) {
	      console.log(`LAP Banner cookie found. Banner was dismissed within the previous ${lapBanner.numberOfDaysToHideBanner} days. Do not show banner.`);
	      return false;
	    }
	    return true;
	  },
	  isCookieStillGood: cookieDismissed => {
	    const now = Date.now(); // ms since epoch to now
	    const since = now - cookieDismissed;
	    const daysToHideBannerInMs = 1000 * 60 * 60 * 24 * lapBanner.numberOfDaysToHideBanner;
	    if (since < daysToHideBannerInMs) {
	      return true;
	    }
	    return false;
	  },
	  createStyles: () => {
	    const lapStyle = document.createElement('style');
	    const styleStr = lapBanner.assembleStyles();
	    lapStyle.innerHTML = styleStr;
	    document.head.append(lapStyle);
	  },
	  showBanner: () => {
	    const lapBannerElement = document.createElement('div');
	    const inner = lapBanner.assembleBannerHTML();
	    const bannerCloser = lapBanner.getBannerCloser();
	    lapBannerElement.classList.add('c-lap-banner');
	    lapBannerElement.append(inner);
	    lapBannerElement.append(bannerCloser);
	    document.body.append(lapBannerElement);
	    lapBanner.setupCloseEvent(bannerCloser);
	  },
	  assembleStyles: () => {
	    let str = '';
	    str += '.c-lap-banner {z-index: 9999; overflow: hidden; width: 100%;position: fixed;left: 0;bottom: 0;background: rgba(0, 0, 0, 90%); padding-top: 40px; @media (min-width: 600px) {padding-top: 0;} }';
	    str += '.c-lap-banner * { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important; font-size: 22px !important; }';
	    str += '.c-lap-banner strong {font-weight: bold;}';
	    str += '.c-lap-banner p {color: #fff; margin-bottom: 1em;line-height: normal !important;}';
	    str += '.c-lap-banner-inner {max-width: 800px; margin: auto; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: center; gap: 20px;}';
	    str += '.c-lap-banner__copy {padding: 10px 0; /*background: rgba(255, 0, 0, 50%);*/}';
	    str += '.c-lap-banner-inner img {display: block; aspect-ratio: 1 / 1; width: 150px; height: 150px; flex-shrink: 0; overflow: hidden;}';
	    str += '.c-lap-banner__headline {padding: 0 10px; letter-spacing: 1px; text-shadow: 0 0 4px rgba(92, 219, 255, 80%); @media (min-width: 600px) {padding: 0;} }';
	    str += '.c-lap-banner__link {text-align: center;}';
	    str += '.c-lap-banner__link a {text-decoration: none; color: #000; font-style: normal; background-color: #5cdbff; border-radius: 100px; display: inline-block; padding: 7px 15px 5px; font-weight: bold; box-shadow: 0 0 4px rgba(255, 255, 255, 80%);}';
	    str += '.c-lap-banner__link a:hover {background: #fff;}';
	    str += '.c-lap-banner button {opacity: 1 !important; letter-spacing: normal !important;}';
	    str += '.c-lap-banner-closer {position: absolute;right: 5px;top: 5px; border: 0px solid transparent; border-radius: 100px;padding: 0 8px 2px; background: #5cdbff; color: #000; cursor: pointer;}';
	    str += '.c-lap-banner-closer:hover {background: #fff;}';
	    str += '.c-lap-banner-fadeout { animation: lpb-fade 1s forwards; }';
	    str += '@keyframes lpb-fade { 0% {opacity: 1; height: 150px; } 100% {opacity: 0; height: 0;} }';
	    return str;
	  },
	  assembleBannerHTML: () => {
	    const bannerInner = document.createElement('div');
	    bannerInner.classList.add('c-lap-banner-inner');
	    let str = '';
	    str += '<img src="https://loveandpainkillers.com/public/images/cover/cover-150.jpg" alt="Cover image for the album &ldquo;Love and Painkillers&rdquo; by Clive Murray">';
	    str += '<div class="c-lap-banner__copy">';
	    str += '<p class="c-lap-banner__headline"><strong>LOVE AND PAINKILLERS</strong> – by Clive Murray</p>';
	    str += '<p class="c-lap-banner__link"><a href="https://loveandpainkillers.com">GET IT NOW</a></p>';
	    str += '</div>';
	    bannerInner.innerHTML = str;
	    return bannerInner;
	  },
	  getBannerCloser: () => {
	    const bannerCloser = document.createElement('button');
	    bannerCloser.classList.add('c-lap-banner-closer');
	    bannerCloser.innerHTML = '&times;';
	    return bannerCloser;
	  },
	  setupCloseEvent: closeButton => {
	    closeButton.addEventListener('click', event => {
	      event.preventDefault();
	      document.querySelector('.c-lap-banner').classList.add('c-lap-banner-fadeout');

	      // set cookie
	      const storeObj = {
	        cookieDismissed: Date.now()
	      };
	      localStorage.setItem(lapBanner.storageKey, JSON.stringify(storeObj));
	    });
	  }
	};

	/*

	TODO:

	* use CSS grid on the form page
	* add a modifier key to 0 which loads ALL games things
	* store lists of Things in data files (JSON)
	  * the front-end JS for the wheel can read from JSON files
	  * 11ty can read JSON data into the NJK templates
	* work out why the footer is too high when the page is long
	* the text items are in a weird alignment when there are 17 Things, but not 15
	* some kind of clever font sizing for mobile/portrait layout

	*/

	let currentThings;
	const numberOfGamesThingsToPick = 12;
	const allGamesThings = ['Bag of Dungeon', 'Boss Monster', 'Boss Monster: The Next Level', 'Cluedo', 'Doomlings', 'Dragonrealm', 'Dragonwood', 'Escape the Dark Castle', 'Escape the Dark Sector', 'Exploding Kittens', 'Forbidden Desert', 'Forbidden Island', 'Forbidden Jungle', 'Forbidden Sky', 'Grimwood', 'Gubs', 'Here to Slay', 'Labyrinth', 'Martian Fluxx', 'Munchkin', 'Munchkin: Critical Role', 'Selfish: Space Edition', 'Selfish: Zombie Edition', 'Star Fluxx', 'Unearth', 'Unstable Unicorns'];
	const defaultThings = [['Pizza', 'Burger', 'Thai', 'Fryup', 'Indian', 'Chinese', 'Sushi', 'Pasta', 'Tex-Mex']
	// ['Horror', 'Comedy', 'Action', 'Drama', 'Sci-Fi', 'Documentary', 'Thriller'],
	// ['Iron Man', 'Captain America', 'The Hulk', 'Thor', 'Ant-Man', 'Doctor Strange', 'Spider-Man', 'Black Panther', 'Captain Marvel', 'Scarlet Witch', 'Black Widow', 'Hawkeye', 'Vision'],
	// ['Star Wars', 'Star Trek', 'Harry Potter', 'Lord of the Rings', 'The Avengers', 'Batman', 'James Bond'],
	];

	const pickDefaultThings = () => {
	  return defaultThings[Math.floor(Math.random() * defaultThings.length)];
	};
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
	const changeThings = () => {
	  const url = `/things?things=${encodeURIComponent(currentThings.join('^'))}`;
	  document.location = url;
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
	  const targetThingIndex = forceTarget || Math.floor(Math.random() * currentThings.length);
	  document.querySelector(`#option${targetThingIndex}`).classList.add('winner');
	  const sectionAngle = 360 / currentThings.length;
	  const targetRotation = Math.round(targetThingIndex * sectionAngle + sectionAngle / 2);
	  const extraSpins = 3;
	  return targetRotation + extraSpins * 360;
	};
	const getCurrentRotation = () => {
	  const el = document.querySelector('article');
	  const currStyle = window.getComputedStyle(el);
	  const currTrans = currStyle.getPropertyValue('transform');
	  const values = currTrans.split('(')[1].split(')')[0].split(',');
	  const currAngle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
	  return currAngle > 0 ? currAngle : currAngle + 360;
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
	    const spindownDuration = 3000;
	    const spinToStop = [{
	      transform: `perspective(none) rotate(${currentRotation}deg)`
	    }, {
	      transform: `perspective(none) rotate(${targetRotation}deg)`
	    }];
	    const spinToStopTiming = {
	      duration: spindownDuration,
	      iterations: 1,
	      easing: 'ease-out'
	    };
	    el.animate(spinToStop, spinToStopTiming);
	    window.setTimeout(() => {
	      el.style.transform = `perspective(none) rotate(${targetRotation}deg)`;
	      el.classList.remove('stopping');
	      highlightWinner();
	      document.querySelector('#start').classList.remove('hide');
	      document.querySelector('#stop').classList.add('hide');
	      document.querySelector('#stop').classList.add('yay');
	    }, spindownDuration);
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

	// events
	if (document.querySelector('#wheel-holder')) {
	  const providedThings = getThingsFromURL();
	  const things = providedThings ? providedThings : pickDefaultThings();
	  currentThings = shuffle(things);
	  window.addEventListener('load', () => {
	    if (checkWEI()) {
	      return;
	    }
	    initWot(currentThings);
	    console.log(`${currentThings.length} things on the wheel`);
	    lapBanner.init();
	  });
	  window.addEventListener('resize', () => {
	    initWot(currentThings);
	  });
	  window.addEventListener('keydown', e => {
	    if (e.key === ' ') {
	      toggle();
	    }
	    if (e.key === '0') {
	      const howMany = e.ctrlKey ? allGamesThings.length : numberOfGamesThingsToPick;
	      const shuffledGamesThings = allGamesThings.sort(() => 0.5 - Math.random());
	      const gamesThings = shuffledGamesThings.slice(0, howMany);
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

})();
