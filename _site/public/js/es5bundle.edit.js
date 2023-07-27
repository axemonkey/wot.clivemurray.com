(function () {
  'use strict';

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var getThingsFromURL = function getThingsFromURL() {
    var urlThings;
    var params = new URLSearchParams(document.location.search);
    if (params.get('things')) {
      urlThings = decodeURIComponent(params.get('things')).split('^');
    }
    return urlThings;
  };
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

  var minThings = 2;
  var maxThings = 20;

  var initForm = function initForm() {
    var urlThings = getThingsFromURL();
    if (urlThings && urlThings.length >= 2) {
      // remove all things
      var allThings = document.querySelector('.all-things');
      var theThings = allThings.querySelectorAll('.thing-entry');
      var _iterator = _createForOfIteratorHelper(theThings),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var thisThing = _step.value;
          thisThing.parentNode.removeChild(thisThing);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(urlThings),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var urlThing = _step2.value;
          addThing(urlThing);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  };
  var submitThings = function submitThings() {
    var formValid = true;
    var thingEntries = document.querySelectorAll('.thing-entry input');
    var values = [];
    var _iterator3 = _createForOfIteratorHelper(thingEntries),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var thingEntry = _step3.value;
        if (thingEntry.value.length > 0) {
          thingEntry.classList.remove('invalid');
          values.push(encodeURIComponent(thingEntry.value));
        } else {
          thingEntry.classList.add('invalid');
          formValid = false;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (formValid) {
      document.location.href = "/?things=".concat(encodeURIComponent(values.join('^')));
    } else {
      console.log('some things are empty');
    }
  };
  var addThing = function addThing(thingValue) {
    var allThings = document.querySelector('.all-things');
    var theThings = allThings.querySelectorAll('.thing-entry');
    var currentNumberOfThings = theThings.length;
    if (currentNumberOfThings < maxThings) {
      // add thing
      var newThingDiv = document.createElement('div');
      var newThingLabel = document.createElement('label');
      var newThingInput = document.createElement('input');
      var newThingRemoveButton = document.createElement('button');
      var newThingValue = thingValue || "Thing ".concat(currentNumberOfThings + 1);
      newThingDiv.classList.add('thing-entry');
      newThingLabel.setAttribute('for', "thing".concat(currentNumberOfThings + 1));
      newThingLabel.innerHTML = "Thing ".concat(currentNumberOfThings + 1);
      newThingInput.classList.add('thing-value');
      newThingInput.setAttribute('type', 'text');
      newThingInput.setAttribute('maxlength', 30);
      newThingInput.setAttribute('name', "thing".concat(currentNumberOfThings + 1));
      newThingInput.id = "thing".concat(currentNumberOfThings + 1);
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
      console.log("couldn't add thing");
    }
  };
  var renumberThings = function renumberThings() {
    var allThings = document.querySelector('.all-things');
    var theThings = allThings.querySelectorAll('.thing-entry');
    var currentNumberOfThings = theThings.length;
    for (var index = 0; index < currentNumberOfThings; index++) {
      var theThing = theThings[index];
      var theThingLabel = theThing.querySelector('label');
      var theThingInput = theThing.querySelector('input');
      theThingLabel.setAttribute('for', "thing".concat(index + 1));
      theThingLabel.innerHTML = "Thing ".concat(index + 1);
      theThingInput.setAttribute('name', "thing".concat(index + 1));
      theThingInput.id = "thing".concat(index + 1);
    }
  };
  var removeThing = function removeThing(thingButton) {
    var allThings = document.querySelector('.all-things');
    var theThings = allThings.querySelectorAll('.thing-entry');
    var currentNumberOfThings = theThings.length;
    if (currentNumberOfThings > minThings) {
      var thingEntry = thingButton.parentNode;
      thingEntry.parentNode.removeChild(thingEntry);
      renumberThings();
    } else {
      // can't remove thing
      console.log("couldn't remove thing");
    }
  };
  var resetThings = function resetThings() {
    var allThings = document.querySelector('.all-things');
    var theThings = allThings.querySelectorAll('.thing-entry');
    var _iterator4 = _createForOfIteratorHelper(theThings),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var thisThing = _step4.value;
        thisThing.parentNode.removeChild(thisThing);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var x = 0;
    while (x < 3) {
      addThing();
      x++;
    }
  };
  var checkInput = function checkInput(event) {
    var inputEl = event.target;
    var inputValue = inputEl.value;
    var matcher = /\^/g;
    if (matcher.test(inputValue)) {
      inputEl.value = inputValue.replaceAll('^', '');
    }
  };

  // events
  if (document.querySelector('#enter-things')) {
    window.addEventListener('load', function () {
      if (checkWEI()) {
        return;
      }
      initForm();
    });
    document.querySelector('#go').addEventListener('click', function (event) {
      event.preventDefault();
      submitThings();
    });
    document.querySelector('#cancel').addEventListener('click', function (event) {
      event.preventDefault();
      window.history.go(-1);
    });
    document.querySelector('#addThing').addEventListener('click', function (event) {
      event.preventDefault();
      addThing();
    });
    document.querySelector('#resetThings').addEventListener('click', function (event) {
      event.preventDefault();
      resetThings();
    });
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('removeThing')) {
        event.preventDefault();
        removeThing(event.target);
      }
    });
    document.addEventListener('keypress', function (event) {
      if (event.target.classList.contains('thing-value')) {
        window.setTimeout(function () {
          checkInput(event);
        }, 100);
      }
    });
    document.addEventListener('paste', function (event) {
      if (event.target.classList.contains('thing-value')) {
        window.setTimeout(function () {
          checkInput(event);
        }, 100);
      }
    });
  }

})();
