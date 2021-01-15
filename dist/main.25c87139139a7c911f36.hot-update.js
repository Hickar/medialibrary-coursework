/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatemedialibrary_coursework"]("main",{

/***/ "./src/api/utils.js":
/*!**************************!*\
  !*** ./src/api/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCookie\": () => /* binding */ getCookie,\n/* harmony export */   \"readFile\": () => /* binding */ readFile\n/* harmony export */ });\nfunction getCookie(cookie_name) {\n  var name = cookie_name + \"=\";\n  var ca = document.cookie.split(\";\");\n\n  for (var i = 0; i < ca.length; i++) {\n    var c = ca[i];\n\n    while (c.charAt(0) === \" \") {\n      c = c.substring(1);\n    }\n\n    if (c.indexOf(name) === 0) {\n      return c.substring(name.length, c.length);\n    }\n  }\n\n  return \"\";\n}\n\nfunction readFile(file) {\n  return new Promise(function (resolve, reject) {\n    var reader = new FileReader();\n\n    reader.onload = function (e) {\n      return resolve(e.target.result);\n    };\n\n    reader.onerror = function (e) {\n      return reject(e);\n    };\n\n    reader.readAsDataURL(file);\n  });\n}\n\n\nvoid function register() {\n  /* react-hot-loader/webpack */\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal[\"default\"] : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n  /* eslint-disable camelcase, no-undef */\n\n\n  var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports;\n  /* eslint-enable camelcase, no-undef */\n\n  if (!webpackExports) {\n    return;\n  }\n\n  if (typeof webpackExports === 'function') {\n    reactHotLoader.register(webpackExports, 'module.exports', \"/Users/home/Documents/Projects/medialibrary-coursework/src/api/utils.js\");\n    return;\n  }\n  /* eslint-disable no-restricted-syntax */\n\n\n  for (var key in webpackExports) {\n    /* eslint-enable no-restricted-syntax */\n    if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) {\n      continue;\n    }\n\n    var namedExport = void 0;\n\n    try {\n      namedExport = webpackExports[key];\n    } catch (err) {\n      continue;\n    }\n\n    reactHotLoader.register(namedExport, key, \"/Users/home/Documents/Projects/medialibrary-coursework/src/api/utils.js\");\n  }\n}();\n\n//# sourceURL=webpack://medialibrary-coursework/./src/api/utils.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "408a82d744dbf65f9319"
/******/ 	})();
/******/ 	
/******/ }
);