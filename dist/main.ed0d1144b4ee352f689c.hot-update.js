/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatemedialibrary_coursework"]("main",{

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.css */ \"./src/app.css\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/esm/react-router.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _Components_LoginPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/LoginPage */ \"./src/Components/LoginPage.js\");\n/* harmony import */ var _Components_Dashboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Components/Dashboard */ \"./src/Components/Dashboard.js\");\n/* harmony import */ var _Components_AuthorizationContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Components/AuthorizationContext */ \"./src/Components/AuthorizationContext.js\");\n/* harmony import */ var _Components_NotificationContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components/NotificationContext */ \"./src/Components/NotificationContext.js\");\n/* harmony import */ var _Components_Notification__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Components/Notification */ \"./src/Components/Notification.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nfunction App() {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({\n    type: \"\",\n    text: \"\",\n    active: false\n  }),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),\n      notificationStatus = _useState2[0],\n      setNotificationStatus = _useState2[1];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),\n      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),\n      isAuthorized = _useState4[0],\n      setIsAuthorized = _useState4[1];\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Components_NotificationContext__WEBPACK_IMPORTED_MODULE_8__.NotificationContext.Provider, {\n    value: setNotificationStatus\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Components_Notification__WEBPACK_IMPORTED_MODULE_9__.Notification, {\n    status: notificationStatus\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Components_AuthorizationContext__WEBPACK_IMPORTED_MODULE_7__.AuthorizationContext.Provider, {\n    value: setIsAuthorized\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Route, {\n    path: \"/\"\n  }, isAuthorized ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Redirect, {\n    to: \"/dashboard\"\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Redirect, {\n    to: \"/login\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Route, {\n    path: \"/dashboard\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Components_Dashboard__WEBPACK_IMPORTED_MODULE_6__.Dashboard, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Route, {\n    path: \"/login\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Components_LoginPage__WEBPACK_IMPORTED_MODULE_5__.LoginPage, null))));\n}\n\nif ((typeof window === \"undefined\" ? \"undefined\" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(window)) !== undefined) {\n  react_dom__WEBPACK_IMPORTED_MODULE_4__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(App, null)), document.getElementById(\"app\"));\n}\n\nvoid function register() {\n  /* react-hot-loader/webpack */\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal[\"default\"] : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n  /* eslint-disable camelcase, no-undef */\n\n\n  var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports;\n  /* eslint-enable camelcase, no-undef */\n\n  if (!webpackExports) {\n    return;\n  }\n\n  if (typeof webpackExports === 'function') {\n    reactHotLoader.register(webpackExports, 'module.exports', \"/Users/home/Documents/Projects/medialibrary-coursework/src/app.js\");\n    return;\n  }\n  /* eslint-disable no-restricted-syntax */\n\n\n  for (var key in webpackExports) {\n    /* eslint-enable no-restricted-syntax */\n    if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) {\n      continue;\n    }\n\n    var namedExport = void 0;\n\n    try {\n      namedExport = webpackExports[key];\n    } catch (err) {\n      continue;\n    }\n\n    reactHotLoader.register(namedExport, key, \"/Users/home/Documents/Projects/medialibrary-coursework/src/app.js\");\n  }\n}();\n\n//# sourceURL=webpack://medialibrary-coursework/./src/app.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "5944aad944a082362504"
/******/ 	})();
/******/ 	
/******/ }
);