// __webpack_require__.r(__webpack_exports__);
// /* harmony export */ __webpack_require__.d(__webpack_exports__, {
// /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
// /* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var observeAllDocument = function observeAllDocument() {
  var allSections = document.querySelectorAll('.section');
  var revealSection = function revealSection(entries, observer) {
    var _entries = _slicedToArray(entries, 1),
      entry = _entries[0];
    if (!entry.isIntersecting) return;else {
      entry.target.classList.remove('section-hidden');
      console.log('crossed section', entry.target);
    }
    observer.unobserve(entry.target);
  };
  var sectionOvserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.25
  });
  var nav = document.querySelectorAll('.nav__item');
  allSections.forEach(function (section) {
    sectionOvserver.observe(section);
    section.classList.add('section-hidden');
  });
  nav.forEach(function (item) {
    item.addEventListener('click', function () {
      removeHidden();
    });
    item.addEventListener('ontouchstart', function () {
      removeHidden();
    });
  });
  function removeHidden() {
    allSections.forEach(function (sec) {
      sec.classList.remove('section-hidden');
    });
  }
  ;
  var toggleTitle = document.querySelector('.header__title-item--background');
  setTimeout(function () {
    toggleTitle.classList.add('active');
  }, 5000);
};
// /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (observeAllDocument);

// //# sourceURL=webpack://start_gulp/./src/js/observer.js?
