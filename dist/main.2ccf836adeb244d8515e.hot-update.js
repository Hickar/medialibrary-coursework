/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatemedialibrary_coursework"]("main",{

/***/ "./src/Components/Files.js":
/*!*********************************!*\
  !*** ./src/Components/Files.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Files\": () => /* binding */ Files\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _Files_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Files.module.css */ \"./src/Components/Files.module.css\");\n/* harmony import */ var _FileCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FileCard */ \"./src/Components/FileCard.js\");\n/* harmony import */ var _NotificationContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NotificationContext */ \"./src/Components/NotificationContext.js\");\n/* harmony import */ var _assets_uploadFile_Icon_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/uploadFile_Icon.svg */ \"./src/assets/uploadFile_Icon.svg\");\n/* harmony import */ var _api_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../api/utils */ \"./src/api/utils.js\");\n\n\n\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n\n\n\nfunction Files(_x) {\n  return _Files.apply(this, arguments);\n}\n\nfunction _Files() {\n  _Files = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3(props) {\n    var setNotification, fileInput, _useState, _useState2, isUserDataLoading, setIsUserDataLoading, handleClickOnUploadFiles, uploadFiles, _uploadFiles, fetchUserFiles, _fetchUserFiles;\n\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _fetchUserFiles = function _fetchUserFiles3() {\n              _fetchUserFiles = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {\n                var response, fileRows, _iterator2, _step2, file, file_ID, actionURL, _response, fileRaw;\n\n                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {\n                  while (1) {\n                    switch (_context2.prev = _context2.next) {\n                      case 0:\n                        _context2.next = 2;\n                        return fetch(\"http://medialibrary.local/modules/actions.php?getUserFiles\", {\n                          method: \"GET\"\n                        });\n\n                      case 2:\n                        response = _context2.sent;\n                        _context2.next = 5;\n                        return response.json();\n\n                      case 5:\n                        fileRows = _context2.sent;\n                        _iterator2 = _createForOfIteratorHelper(fileRows.message);\n                        _context2.prev = 7;\n\n                        _iterator2.s();\n\n                      case 9:\n                        if ((_step2 = _iterator2.n()).done) {\n                          _context2.next = 24;\n                          break;\n                        }\n\n                        file = _step2.value;\n                        file_ID = file.file_ID;\n                        actionURL = \"http://medialibrary.local/modules/actions.php?getUserFile&file_ID=\".concat(file_ID);\n                        _context2.next = 15;\n                        return fetch(actionURL, {\n                          method: \"GET\"\n                        });\n\n                      case 15:\n                        _response = _context2.sent;\n                        _context2.next = 18;\n                        return _response.blob();\n\n                      case 18:\n                        fileRaw = _context2.sent;\n                        _context2.next = 21;\n                        return (0,_api_utils__WEBPACK_IMPORTED_MODULE_8__.readFile)(fileRaw);\n\n                      case 21:\n                        file.src = _context2.sent;\n\n                      case 22:\n                        _context2.next = 9;\n                        break;\n\n                      case 24:\n                        _context2.next = 29;\n                        break;\n\n                      case 26:\n                        _context2.prev = 26;\n                        _context2.t0 = _context2[\"catch\"](7);\n\n                        _iterator2.e(_context2.t0);\n\n                      case 29:\n                        _context2.prev = 29;\n\n                        _iterator2.f();\n\n                        return _context2.finish(29);\n\n                      case 32:\n                        console.log(\"files: \" + fileRows.message);\n                        return _context2.abrupt(\"return\", fileRows.message);\n\n                      case 34:\n                      case \"end\":\n                        return _context2.stop();\n                    }\n                  }\n                }, _callee2, null, [[7, 26, 29, 32]]);\n              }));\n              return _fetchUserFiles.apply(this, arguments);\n            };\n\n            fetchUserFiles = function _fetchUserFiles2() {\n              return _fetchUserFiles.apply(this, arguments);\n            };\n\n            _uploadFiles = function _uploadFiles3() {\n              _uploadFiles = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(e) {\n                var _e$target$files;\n\n                var files, formData, _iterator, _step, file, response, data;\n\n                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {\n                  while (1) {\n                    switch (_context.prev = _context.next) {\n                      case 0:\n                        files = (_e$target$files = e.target.files) !== null && _e$target$files !== void 0 ? _e$target$files : e.dataTransfer.files;\n                        formData = new FormData();\n                        _iterator = _createForOfIteratorHelper(files);\n\n                        try {\n                          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n                            file = _step.value;\n                            formData.append(\"files[]\", file, file.name);\n                          }\n                        } catch (err) {\n                          _iterator.e(err);\n                        } finally {\n                          _iterator.f();\n                        }\n\n                        _context.next = 6;\n                        return fetch(\"http://medialibrary.local/modules/actions.php?uploadFiles\", {\n                          body: formData,\n                          method: \"POST\"\n                        });\n\n                      case 6:\n                        response = _context.sent;\n                        _context.next = 9;\n                        return response.json();\n\n                      case 9:\n                        data = _context.sent;\n\n                        if (!data.err) {\n                          setNotification({\n                            type: \"message\",\n                            text: data.message,\n                            active: true\n                          });\n                        } else {\n                          setNotification({\n                            type: \"error\",\n                            text: data.message,\n                            active: true\n                          });\n                        }\n\n                      case 11:\n                      case \"end\":\n                        return _context.stop();\n                    }\n                  }\n                }, _callee);\n              }));\n              return _uploadFiles.apply(this, arguments);\n            };\n\n            uploadFiles = function _uploadFiles2(_x2) {\n              return _uploadFiles.apply(this, arguments);\n            };\n\n            handleClickOnUploadFiles = function _handleClickOnUploadF(e) {\n              if (fileInput.current) {\n                fileInput.current.click();\n              }\n            };\n\n            setNotification = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_NotificationContext__WEBPACK_IMPORTED_MODULE_6__.NotificationContext);\n            fileInput = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)();\n            _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true), _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2), isUserDataLoading = _useState2[0], setIsUserDataLoading = _useState2[1]; // const userFiles = await fetchUserFiles();\n\n            (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {\n              if (fileInput.current) {\n                fileInput.current.addEventListener(\"change\", uploadFiles);\n              }\n            }, []);\n            return _context3.abrupt(\"return\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"input\", {\n              ref: fileInput,\n              className: _Files_module_css__WEBPACK_IMPORTED_MODULE_4__.default.hidden,\n              type: \"file\",\n              multiple: true\n            }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"div\", {\n              className: _Files_module_css__WEBPACK_IMPORTED_MODULE_4__.default.toolbar\n            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"button\", {\n              className: _Files_module_css__WEBPACK_IMPORTED_MODULE_4__.default.toolbar_item,\n              onClick: handleClickOnUploadFiles\n            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"img\", {\n              className: _Files_module_css__WEBPACK_IMPORTED_MODULE_4__.default.toolbar_item_icon,\n              src: _assets_uploadFile_Icon_svg__WEBPACK_IMPORTED_MODULE_7__.default,\n              alt: \"File upload button\"\n            }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"div\", {\n              className: _Files_module_css__WEBPACK_IMPORTED_MODULE_4__.default.files_wrapper\n            }, userFiles.map(function (file) {\n              return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_FileCard__WEBPACK_IMPORTED_MODULE_5__.FileCard, {\n                mediafile: file\n              });\n            }))));\n\n          case 10:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3);\n  }));\n  return _Files.apply(this, arguments);\n}\n\nvoid function register() {\n  /* react-hot-loader/webpack */\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal[\"default\"] : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n  /* eslint-disable camelcase, no-undef */\n\n\n  var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports;\n  /* eslint-enable camelcase, no-undef */\n\n  if (!webpackExports) {\n    return;\n  }\n\n  if (typeof webpackExports === 'function') {\n    reactHotLoader.register(webpackExports, 'module.exports', \"/Users/home/Documents/Projects/medialibrary-coursework/src/Components/Files.js\");\n    return;\n  }\n  /* eslint-disable no-restricted-syntax */\n\n\n  for (var key in webpackExports) {\n    /* eslint-enable no-restricted-syntax */\n    if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) {\n      continue;\n    }\n\n    var namedExport = void 0;\n\n    try {\n      namedExport = webpackExports[key];\n    } catch (err) {\n      continue;\n    }\n\n    reactHotLoader.register(namedExport, key, \"/Users/home/Documents/Projects/medialibrary-coursework/src/Components/Files.js\");\n  }\n}();\n\n//# sourceURL=webpack://medialibrary-coursework/./src/Components/Files.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "8fc60797d5235a367126"
/******/ 	})();
/******/ 	
/******/ }
);