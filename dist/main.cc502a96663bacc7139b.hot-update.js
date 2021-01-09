/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatemedialibrary_coursework"]("main",{

/***/ "./src/Components/LoginForm.js":
/*!*************************************!*\
  !*** ./src/Components/LoginForm.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LoginForm\": () => /* binding */ LoginForm\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoginForm.module.css */ \"./src/Components/LoginForm.module.css\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router */ \"./node_modules/react-router/esm/react-router.js\");\n/* harmony import */ var _NotificationContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NotificationContext */ \"./src/Components/NotificationContext.js\");\n/* harmony import */ var _AuthorizationContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AuthorizationContext */ \"./src/Components/AuthorizationContext.js\");\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\n\n\n\nfunction LoginForm() {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),\n      isRegistrationActive = _useState2[0],\n      setIsRegistrationActive = _useState2[1];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({\n    name: \"\",\n    password: \"\",\n    password_check: \"\"\n  }),\n      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState3, 2),\n      userData = _useState4[0],\n      setUserData = _useState4[1];\n\n  var history = (0,react_router__WEBPACK_IMPORTED_MODULE_8__.useHistory)();\n  var setNotification = (0,react__WEBPACK_IMPORTED_MODULE_4__.useContext)(_NotificationContext__WEBPACK_IMPORTED_MODULE_6__.NotificationContext);\n  var setIsAuthorized = (0,react__WEBPACK_IMPORTED_MODULE_4__.useContext)(_AuthorizationContext__WEBPACK_IMPORTED_MODULE_7__.AuthorizationContext);\n\n  function handleSubmit(_x) {\n    return _handleSubmit.apply(this, arguments);\n  }\n\n  function _handleSubmit() {\n    _handleSubmit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(e) {\n      var actionURL, response, data;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              e.preventDefault();\n              actionURL = isRegistrationActive ? \"http://medialibrary.local/modules/actions.php?register\" : \"http://medialibrary.local/modules/actions.php?login\";\n              _context.next = 4;\n              return fetch(actionURL, {\n                method: \"POST\",\n                body: JSON.stringify(userData),\n                headers: {\n                  \"Content-Type\": \"application/json\"\n                }\n              });\n\n            case 4:\n              response = _context.sent;\n              _context.next = 7;\n              return response.json();\n\n            case 7:\n              data = _context.sent;\n              debugger;\n\n              if (!data.err) {\n                _context.next = 12;\n                break;\n              }\n\n              setNotification({\n                type: \"error\",\n                text: data.message,\n                active: true\n              });\n              return _context.abrupt(\"return\");\n\n            case 12:\n              debugger;\n\n              if (isRegistrationActive) {\n                setNotification({\n                  type: \"message\",\n                  text: data.message,\n                  active: true\n                });\n                setIsRegistrationActive(false);\n              } else {\n                history.push(\"/\");\n                setIsAuthorized(true);\n              }\n\n            case 14:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n    return _handleSubmit.apply(this, arguments);\n  }\n\n  function handleInputChange(e) {\n    var target = e.target;\n    var userProperty = target.id;\n    var value = target.value;\n    setUserData(function (prevState) {\n      return _objectSpread(_objectSpread({}, prevState), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, userProperty, value));\n    });\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"form\", {\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form,\n    autoComplete: \"off\",\n    method: \"POST\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"div\", {\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_group\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"input\", {\n    id: \"name\",\n    type: \"text\",\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_input,\n    onChange: handleInputChange,\n    required: true\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"label\", {\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_label\n  }, \"\\u0412\\u0430\\u0448 \\u043B\\u043E\\u0433\\u0438\\u043D\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"div\", {\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_group\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"input\", {\n    id: \"password\",\n    type: \"password\",\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_input,\n    onChange: handleInputChange,\n    required: true\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"label\", {\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_label\n  }, \"\\u0412\\u0430\\u0448 \\u043F\\u0430\\u0440\\u043E\\u043B\\u044C\")), isRegistrationActive ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"div\", {\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_group\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"input\", {\n    id: \"password_check\",\n    type: \"password\",\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_input,\n    onChange: handleInputChange,\n    required: true\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"label\", {\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_label\n  }, \"\\u041F\\u043E\\u0432\\u0442\\u043E\\u0440\\u0438\\u0442\\u0435 \\u043F\\u0430\\u0440\\u043E\\u043B\\u044C\")) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"button\", {\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_submit_button,\n    type: \"button\",\n    onClick: handleSubmit\n  }, isRegistrationActive ? \"Зарегистрироваться\" : \"Войти\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(\"p\", {\n    className: _LoginForm_module_css__WEBPACK_IMPORTED_MODULE_5__.default.login_form_registration_link,\n    onClick: function onClick() {\n      return setIsRegistrationActive(!isRegistrationActive);\n    }\n  }, isRegistrationActive ? \"Войти в сущетсвующую уч. запись\" : \"Зарегистрироваться\"));\n}\nvoid function register() {\n  /* react-hot-loader/webpack */\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal[\"default\"] : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n  /* eslint-disable camelcase, no-undef */\n\n\n  var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports;\n  /* eslint-enable camelcase, no-undef */\n\n  if (!webpackExports) {\n    return;\n  }\n\n  if (typeof webpackExports === 'function') {\n    reactHotLoader.register(webpackExports, 'module.exports', \"/Users/home/Documents/Projects/medialibrary-coursework/src/Components/LoginForm.js\");\n    return;\n  }\n  /* eslint-disable no-restricted-syntax */\n\n\n  for (var key in webpackExports) {\n    /* eslint-enable no-restricted-syntax */\n    if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) {\n      continue;\n    }\n\n    var namedExport = void 0;\n\n    try {\n      namedExport = webpackExports[key];\n    } catch (err) {\n      continue;\n    }\n\n    reactHotLoader.register(namedExport, key, \"/Users/home/Documents/Projects/medialibrary-coursework/src/Components/LoginForm.js\");\n  }\n}();\n\n//# sourceURL=webpack://medialibrary-coursework/./src/Components/LoginForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "9ccb2e35a4c6758f3001"
/******/ 	})();
/******/ 	
/******/ }
);