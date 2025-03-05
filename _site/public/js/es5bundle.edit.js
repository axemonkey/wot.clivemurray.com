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

	const OPTIONS = {
	  MIN_THINGS: 2,
	  MAX_THINGS: 30,
	  COLOUR_SELECTION_METHOD: 2
	};

	const initForm = () => {
	  const urlThings = getThingsFromURL();
	  if (urlThings && urlThings.length >= 2) {
	    // remove all things
	    const allThings = document.querySelector('.all-things');
	    const theThings = allThings.querySelectorAll('.thing-entry');
	    for (const thisThing of theThings) {
	      thisThing.parentNode.removeChild(thisThing);
	    }
	    urlThings.sort();
	    for (const urlThing of urlThings) {
	      addThing(urlThing);
	    }
	  }
	};
	const submitThings = () => {
	  let formValid = true;
	  const thingEntries = document.querySelectorAll('.thing-entry input');
	  const values = [];
	  for (const thingEntry of thingEntries) {
	    if (thingEntry.value.length > 0) {
	      thingEntry.classList.remove('invalid');
	      values.push(encodeURIComponent(thingEntry.value));
	    } else {
	      thingEntry.classList.add('invalid');
	      formValid = false;
	    }
	  }
	  if (formValid) {
	    document.location.href = `/?things=${encodeURIComponent(values.join('^'))}`;
	  } else {
	    console.log('some things are empty');
	  }
	};
	const addThing = thingValue => {
	  const allThings = document.querySelector('.all-things');
	  const theThings = allThings.querySelectorAll('.thing-entry');
	  const currentNumberOfThings = theThings.length;
	  if (currentNumberOfThings < OPTIONS.MAX_THINGS) {
	    // add thing
	    const newThingDiv = document.createElement('div');
	    const newThingLabel = document.createElement('label');
	    const newThingInput = document.createElement('input');
	    const newThingRemoveButton = document.createElement('button');
	    const newThingValue = thingValue || `Thing ${currentNumberOfThings + 1}`;
	    newThingDiv.classList.add('thing-entry');
	    newThingLabel.setAttribute('for', `thing${currentNumberOfThings + 1}`);
	    newThingLabel.innerHTML = `Thing ${currentNumberOfThings + 1}`;
	    newThingInput.classList.add('thing-value');
	    newThingInput.setAttribute('type', 'text');
	    newThingInput.setAttribute('maxlength', 30);
	    newThingInput.setAttribute('name', `thing${currentNumberOfThings + 1}`);
	    newThingInput.id = `thing${currentNumberOfThings + 1}`;
	    newThingInput.value = newThingValue;
	    newThingRemoveButton.setAttribute('tabindex', '-1');
	    newThingRemoveButton.classList.add('removeThing');
	    newThingRemoveButton.classList.add('form-button');
	    newThingRemoveButton.innerHTML = 'Remove this thing';
	    newThingDiv.append(newThingLabel);
	    newThingDiv.append(newThingInput);
	    newThingDiv.append(newThingRemoveButton);
	    allThings.append(newThingDiv);
	  } else {
	    // can't add thing
	    console.log(`couldn't add thing`);
	  }
	};
	const renumberThings = () => {
	  const allThings = document.querySelector('.all-things');
	  const theThings = allThings.querySelectorAll('.thing-entry');
	  const currentNumberOfThings = theThings.length;
	  for (let index = 0; index < currentNumberOfThings; index++) {
	    const theThing = theThings[index];
	    const theThingLabel = theThing.querySelector('label');
	    const theThingInput = theThing.querySelector('input');
	    theThingLabel.setAttribute('for', `thing${index + 1}`);
	    theThingLabel.innerHTML = `Thing ${index + 1}`;
	    theThingInput.setAttribute('name', `thing${index + 1}`);
	    theThingInput.id = `thing${index + 1}`;
	  }
	};
	const removeThing = thingButton => {
	  const allThings = document.querySelector('.all-things');
	  const theThings = allThings.querySelectorAll('.thing-entry');
	  const currentNumberOfThings = theThings.length;
	  if (currentNumberOfThings > OPTIONS.MIN_THINGS) {
	    const thingEntry = thingButton.parentNode;
	    thingEntry.parentNode.removeChild(thingEntry);
	    renumberThings();
	  } else {
	    // can't remove thing
	    console.log(`couldn't remove thing`);
	  }
	};
	const resetThings = () => {
	  const allThings = document.querySelector('.all-things');
	  const theThings = allThings.querySelectorAll('.thing-entry');
	  for (const thisThing of theThings) {
	    thisThing.parentNode.removeChild(thisThing);
	  }
	  let x = 0;
	  while (x < 3) {
	    addThing();
	    x++;
	  }
	};
	const checkInput = event => {
	  const inputEl = event.target;
	  const inputValue = inputEl.value;
	  const matcher = /\^/g;
	  if (matcher.test(inputValue)) {
	    inputEl.value = inputValue.replaceAll('^', '');
	  }
	};

	// events
	if (document.querySelector('#enter-things')) {
	  window.addEventListener('load', () => {
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

})();
