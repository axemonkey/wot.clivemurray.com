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
  var shuffle = function shuffle(arr) {
    // randomly rearanges the items in an array
    var result = [];
    for (var i = arr.length - 1; i >= 0; i--) {
      // picks an integer between 0 and i:
      var r = Math.floor(Math.random() * (i + 1)); // NOTE: use a better RNG if cryptographic security is needed
      // inserts the arr[i] element in the r-th free space in the shuffled array:
      for (var j = 0, k = 0; j <= arr.length - 1; j++) {
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
  var checkWEI = function checkWEI() {
    var DRMHorseshit = navigator.getEnvironmentIntegrity;
    // const DRMHorseshit = 'horse';
    console.log("navigator.getEnvironmentIntegrity: ".concat(DRMHorseshit));
    if (DRMHorseshit !== undefined) {
      document.querySelector('body').innerHTML = '<article class="drm-notice"><h1>Your browser contains Google DRM</h1><p>“Web Environment Integrity” is a Google euphemism for a DRM that is designed to prevent ad-blocking. In support of an open web, this website does not function with this DRM. Please install a browser such as <a href="https://mozilla.org/en-US/firefox/new/">Firefox</a> that respects your freedom and supports ad blockers.</p><p>If you would like to know more:</p><ul><li><a href="https://vivaldi.com/blog/googles-new-dangerous-web-environment-integrity-spec/">Vivaldi: Unpacking Google’s new “dangerous” Web-Environment-Integrity specification</a></li><li><a href="https://securityboulevard.com/2023/07/google-wei-drm-adtech-richixbw/">Security Boulevard: Google Wants to DRM your OS for ‘Web Environment Integrity’</a></li><li><a href="https://www.techradar.com/pro/googles-new-plan-for-the-future-of-the-web-has-a-lot-of-people-worried-heres-why">TechRadar: Google\'s new plan for the future of the web has a lot of people worried - here\'s why</a></li></ul></article>';
      return true;
    }
    return false;
  };

  var degToRad = function degToRad(deg) {
    return Number.parseInt(deg, 10) * Math.PI / 180;
  };
  var cosDeg = function cosDeg(angle) {
    return Math.cos(degToRad(Number.parseInt(angle, 10)));
  };
  var sinDeg = function sinDeg(angle) {
    return Math.sin(degToRad(Number.parseInt(angle, 10)));
  };

  var getRandColourValue = function getRandColourValue() {
    return (Math.floor(Math.random() * 6) + 4) * 20;
  };
  var getRandRGB = function getRandRGB() {
    var r = getRandColourValue();
    var g = getRandColourValue();
    var b = getRandColourValue();
    return "".concat(r, ", ").concat(g, ", ").concat(b);
  };

  var makeText = function makeText(index, text, container, radius, angle, padding) {
    var newTextDiv = document.createElement('div');
    newTextDiv.classList.add('optionText');
    newTextDiv.innerHTML = "<p class=\"option\" id=\"option".concat(index, "\">").concat(text, "</p>");
    container.append(newTextDiv);
    newTextDiv.style.left = "".concat(padding, "px");
    newTextDiv.style.top = "calc(50% - ".concat(newTextDiv.offsetHeight / 2, "px");
    newTextDiv.style.width = "".concat(radius * 2, "px");
    newTextDiv.style.transform = "perspective(none) rotate(".concat(angle, "deg)");
  };
  var setupMain = function setupMain() {
    var boundingEl = document.querySelector('main');
    boundingEl.innerHTML = '';
    var newArticle = document.createElement('article');
    var wheelCanvas = document.createElement('canvas');
    var pointerCanvas = document.createElement('canvas');
    wheelCanvas.classList.add('wheel');
    pointerCanvas.classList.add('pointer');
    newArticle.append(wheelCanvas);
    boundingEl.append(newArticle);
    boundingEl.append(pointerCanvas);
    var buttons = document.querySelectorAll('.buttons button');
    var _iterator = _createForOfIteratorHelper(buttons),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var button = _step.value;
        button.classList.add('yay');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var initWot = function initWot(things) {
    var portrait = false;
    if (document.querySelector('#wheel-holder')) {
      document.body.classList.add('js');
      if (document.body.offsetHeight > document.body.offsetWidth) {
        document.body.classList.add('portrait');
        portrait = true;
      }
      setupMain();
      var container = document.querySelector('article');
      var canvas = document.querySelector('.wheel');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var boundingEl = document.querySelector('main');
        var headerEl = document.querySelector('header');
        var buttonsEl = document.querySelector('.buttons');
        var maxDim = Math.min(boundingEl.offsetWidth, boundingEl.offsetHeight);
        var centrePoint = maxDim / 2;
        var verticalCentre = boundingEl.offsetHeight / 2;
        var padding = 10;
        var radius = centrePoint - padding;
        var sectionAngle = 360 / things.length;
        boundingEl.style.width = "".concat(maxDim, "px");
        boundingEl.style.height = "".concat(maxDim, "px");
        canvas.width = maxDim;
        canvas.height = maxDim;
        if (portrait) {
          boundingEl.style.flexGrow = 0;
          headerEl.style.flexGrow = 1;
          buttonsEl.style.flexGrow = 1;
          verticalCentre = boundingEl.offsetHeight / 2;
        }
        for (var index in things) {
          if (Object.hasOwn(things, index)) {
            // draw segments
            index = Number.parseInt(index, 10);
            var angle = index * sectionAngle;
            var angleRad = degToRad(angle);
            var lineX = radius * cosDeg(angle);
            var lineY = radius * sinDeg(angle);
            var nextAngle = (index + 1) * sectionAngle;
            var nextAngleRad = degToRad(nextAngle);
            ctx.beginPath();
            ctx.moveTo(centrePoint, centrePoint);
            ctx.lineTo(centrePoint + lineX, centrePoint + lineY);
            ctx.arc(centrePoint, centrePoint, radius, angleRad, nextAngleRad, false);
            ctx.fillStyle = "rgb(".concat(getRandRGB(), ")");
            ctx.fill();
            ctx.closePath();

            // render text DIVs
            var textAngle = Number.parseInt(-angle - sectionAngle / 2, 10);
            makeText(index, things[index], container, radius, textAngle, padding);
          }
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0, 0, 0)';

        // draw dividing lines
        for (var _index in things) {
          if (Object.hasOwn(things, _index)) {
            var _angle = _index * sectionAngle;
            var _lineX = radius * cosDeg(_angle);
            var _lineY = radius * sinDeg(_angle);
            ctx.beginPath();
            ctx.moveTo(centrePoint, centrePoint);
            ctx.lineTo(centrePoint + _lineX, centrePoint + _lineY);
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
        var pointerCanvas = document.querySelector('.pointer');
        if (pointerCanvas.getContext) {
          pointerCanvas.style.top = "".concat(verticalCentre - 20, "px");
          var pctx = pointerCanvas.getContext('2d');
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

  * store lists of Things in data files (JSON)
    * the front-end JS for the wheel can read from JSON files
    * 11ty can read JSON data into the NJK templates
  * alphabetise the entries on the form
  * work out why the footer is too high when the page is long
  * maybe use CSS grid on the form page? or even a table?
  * the text items are in a weird alignment when there are 17 Things, but not 15
  * some kind of clever font sizing for mobile/portrait layout
  * examples button (inline modal?) on wheel page

  */

  var currentThings;
  var gamesThings = ['Munchkin', 'Escape the Dark Castle', 'Unearth', 'Star Fluxx', 'Martian Fluxx', 'Doomlings', 'Dragonwood', 'Dragonrealm', 'Forbidden Island', 'Forbidden Desert', 'Forbidden Sky', 'Labyrinth', 'Boss Monster', 'Boss Monster: The Next Level', 'Selfish: Zombie Edition', 'Selfish: Space Edition', 'Bag of Dungeon'];
  var defaultThings = [['Pizza', 'Burger', 'Thai', 'Fryup', 'Indian', 'Chinese', 'Sushi', 'Pasta', 'Tex-Mex']
  // ['Horror', 'Comedy', 'Action', 'Drama', 'Sci-Fi', 'Documentary', 'Thriller'],
  // ['Iron Man', 'Captain America', 'The Hulk', 'Thor', 'Ant-Man', 'Doctor Strange', 'Spider-Man', 'Black Panther', 'Captain Marvel', 'Scarlet Witch', 'Black Widow', 'Hawkeye', 'Vision'],
  // ['Star Wars', 'Star Trek', 'Harry Potter', 'Lord of the Rings', 'The Avengers', 'Batman', 'James Bond'],
  ];

  var pickDefaultThings = function pickDefaultThings() {
    return defaultThings[Math.floor(Math.random() * defaultThings.length)];
  };
  var resetOptionClasses = function resetOptionClasses() {
    var options = document.querySelectorAll('.option');
    var _iterator = _createForOfIteratorHelper(options),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var optionItem = _step.value;
        optionItem.classList.remove('loser');
        optionItem.classList.remove('throbber');
        optionItem.classList.remove('winner');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var start = function start() {
    var el = document.querySelector('article');
    el.style.transform = "perspective(none) rotate(0deg)";
    el.classList.add('spinning');
    resetOptionClasses();
    document.querySelector('#start').classList.add('hide');
    document.querySelector('#stop').classList.remove('hide');
  };
  var changeThings = function changeThings() {
    var url = "/things?things=".concat(encodeURIComponent(currentThings.join('^')));
    document.location = url;
  };
  var highlightWinner = function highlightWinner() {
    var losers = document.querySelectorAll('.option');
    var winner = document.querySelector('.winner');
    var _iterator2 = _createForOfIteratorHelper(losers),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var loser = _step2.value;
        loser.classList.add('loser');
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    winner.classList.remove('loser');
    winner.classList.add('throbber');
  };
  var getTarget = function getTarget(forceTarget) {
    var targetThingIndex = forceTarget || Math.floor(Math.random() * currentThings.length);
    document.querySelector("#option".concat(targetThingIndex)).classList.add('winner');
    var sectionAngle = 360 / currentThings.length;
    var targetRotation = Math.round(targetThingIndex * sectionAngle + sectionAngle / 2);
    var extraSpins = 3;
    return targetRotation + extraSpins * 360;
  };
  var getCurrentRotation = function getCurrentRotation() {
    var el = document.querySelector('article');
    var currStyle = window.getComputedStyle(el);
    var currTrans = currStyle.getPropertyValue('transform');
    var values = currTrans.split('(')[1].split(')')[0].split('^');
    var currAngle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    return currAngle > 0 ? currAngle : currAngle + 360;
  };
  var stop = function stop(forceTarget) {
    var el = document.querySelector('article');
    if (!el.classList.contains('stopping')) {
      document.querySelector('#stop').classList.remove('yay');
      var currentRotation = getCurrentRotation();
      el.classList.remove('spinning');
      el.classList.add('stopping');
      el.style.transform = "perspective(none) rotate(".concat(currentRotation, "deg)");
      var targetRotation = getTarget(forceTarget);
      var spinToStop = [{
        transform: "perspective(none) rotate(".concat(currentRotation, "deg)")
      }, {
        transform: "perspective(none) rotate(".concat(targetRotation, "deg)")
      }];
      var spinToStopTiming = {
        duration: 3000,
        iterations: 1,
        easing: 'ease-out'
      };
      el.animate(spinToStop, spinToStopTiming);
      window.setTimeout(function () {
        el.style.transform = "perspective(none) rotate(".concat(targetRotation, "deg)");
        el.classList.remove('stopping');
        highlightWinner();
        document.querySelector('#start').classList.remove('hide');
        document.querySelector('#stop').classList.add('hide');
        document.querySelector('#stop').classList.add('yay');
      }, 3000);
    }
  };
  var toggle = function toggle() {
    var container = document.querySelector('article');
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
    var providedThings = getThingsFromURL();
    var things = providedThings ? providedThings : pickDefaultThings();
    currentThings = shuffle(things);
    window.addEventListener('load', function () {
      if (checkWEI()) {
        return;
      }
      initWot(currentThings);
    });
    window.addEventListener('resize', function () {
      initWot(currentThings);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === ' ') {
        toggle();
      }
      if (e.key === '0') {
        var url = "/?things=".concat(encodeURIComponent(gamesThings.join('^')));
        document.location = url;
      }
      if (e.key === 'Enter') {
        console.log(getCurrentRotation());
      }
    });
    document.querySelector('#start').addEventListener('click', function () {
      start();
    });
    document.querySelector('#stop').addEventListener('click', function () {
      stop();
    });
    document.querySelector('#change').addEventListener('click', function () {
      changeThings();
    });
  }

})();
