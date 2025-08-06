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
	const getNumberFromString = string => {
	  let total = 0;
	  for (let index = 0; index < string.length; index++) {
	    total += string.charCodeAt(index);
	  }
	  return total;
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

	const allColours = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
	const getColours = things => {
	  things.length;
	  let selectedColours = [];
	  {
	    for (const thing of things) {
	      const stringValue = getNumberFromString(thing);
	      const stringValueRemainder = stringValue % allColours.length;
	      selectedColours.push(allColours[stringValueRemainder]);
	    }
	  }
	  return selectedColours;
	};

	const makeText = (index, text, container, radius, angle, padding, colour) => {
	  const newTextDiv = document.createElement('div');
	  newTextDiv.classList.add('optionText');
	  newTextDiv.innerHTML = `<p class="option" id="option${index}" data-colour="${colour}">${text}</p>`;
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
	      const wheelColours = getColours(things);
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
	      for (const index in things) {
	        if (Object.hasOwn(things, index)) {
	          // draw segments
	          const parseIndex = Number.parseInt(index, 10);
	          const angle = parseIndex * sectionAngle;
	          const angleRad = degToRad(angle);
	          const lineX = radius * cosDeg(angle);
	          const lineY = radius * sinDeg(angle);
	          const nextAngle = (parseIndex + 1) * sectionAngle;
	          const nextAngleRad = degToRad(nextAngle);
	          ctx.beginPath();
	          ctx.moveTo(centrePoint, centrePoint);
	          ctx.lineTo(centrePoint + lineX, centrePoint + lineY);
	          ctx.arc(centrePoint, centrePoint, radius, angleRad, nextAngleRad, false);
	          ctx.fillStyle = wheelColours[parseIndex];
	          ctx.fill();
	          ctx.closePath();

	          // render text DIVs
	          const textAngle = Number.parseInt(angle + sectionAngle / 2, 10);
	          makeText(parseIndex, things[parseIndex], container, radius, textAngle, padding, wheelColours[parseIndex]);
	        }
	      }
	      ctx.lineWidth = 1;
	      ctx.strokeStyle = 'rgb(0, 0, 0)';

	      // draw dividing lines
	      for (const index in things) {
	        if (Object.hasOwn(things, index)) {
	          const parseIndex = Number.parseInt(index, 10);
	          const angle = parseIndex * sectionAngle;
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

	/*

	TODO:

	* when coming from all games (over 20 items) to the form, don't lose items over 20
	* store lists of Things in data files (JSON)
		* the front-end JS for the wheel can read from JSON files
		* 11ty can read JSON data into the NJK templates
	* the text items are in a weird alignment when there are 17 Things, but not 15
	* some kind of clever font sizing for mobile/portrait layout

	TO DONE:

	* add a modifier key to 0 which loads ALL games things
	* maybe improve the colour selection process
	* work out why the footer is too high when the page is long

	*/

	let currentThings;
	const numberOfGamesThingsToPick = 12;
	const allGamesThings = ['7 Moons', 'Bag of Dungeon', 'Boss Monster', 'Cluedo', 'Doomlings', 'Dragonrealm', 'Dragonwood', 'Escape the Dark Castle', 'Escape the Dark Sector', 'Exploding Kittens', 'Forbidden Desert', 'Forbidden Island', 'Forbidden Jungle', 'Forbidden Sky', 'Grimwood', 'Gubs', 'Here to Slay', 'Labyrinth', 'Martian Fluxx', 'Munchkin', 'Munchkin: Critical Role', 'Munchkin: Marvel', 'Selfish: Space Edition', 'Selfish: Zombie Edition', 'Squirmish', 'Star Fluxx', 'Sushi Go', 'Unearth', 'Uno Flip', 'Unstable Unicorns'];
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
	  console.log(`winner: ${currentThings[targetThingIndex]}`);
	  const sectionAngle = 360 / currentThings.length;
	  const targetRotation = Math.round((targetThingIndex + 1) * -sectionAngle + sectionAngle / 2);
	  return targetRotation;
	};
	const getCurrentRotation = () => {
	  const el = document.querySelector('article');
	  const currStyle = window.getComputedStyle(el);
	  const currTrans = currStyle.getPropertyValue('transform');
	  const values = currTrans.split('(')[1].split(')')[0].split(',');
	  const currAngle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
	  let returnAngle = currAngle;
	  return returnAngle;
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
	    const extraSpins = 2 + Math.round(Math.random() * 3);
	    const spindownDurationSeconds = 2 + extraSpins / 2;

	    // console.log(`extraSpins: ${extraSpins}`);
	    // console.log(`currentRotation: ${currentRotation}`);
	    // console.log(`targetRotation: ${targetRotation}`);

	    const spinToStop = [{
	      transform: `perspective(none) rotate(${currentRotation}deg)`
	    }, {
	      transform: `perspective(none) rotate(${targetRotation + 360 * extraSpins}deg)`
	    }];
	    const spinToStopTiming = {
	      duration: spindownDurationSeconds * 1000,
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
	    }, spindownDurationSeconds * 1000);
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
	  // currentThings = things;
	  currentThings = shuffle(things);
	  window.addEventListener('load', () => {
	    initWot(currentThings);
	    console.log(`${currentThings.length} things on the wheel`);
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
