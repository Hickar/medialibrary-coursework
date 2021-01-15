/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatemedialibrary_coursework"]("main",{

/***/ "./src/Components/FileCard.js":
/*!************************************!*\
  !*** ./src/Components/FileCard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FileCard\": () => /* binding */ FileCard\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileCard.module.css */ \"./src/Components/FileCard.module.css\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _assets_audioPlayIcon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/audioPlayIcon.svg */ \"./src/assets/audioPlayIcon.svg\");\n/* harmony import */ var _assets_audioPauseIcon_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/audioPauseIcon.svg */ \"./src/assets/audioPauseIcon.svg\");\n/* harmony import */ var _assets_documentIcon_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/documentIcon.svg */ \"./src/assets/documentIcon.svg\");\n\n\n\n\n\n\nfunction FileCard(props) {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),\n      isAudioPlaying = _useState2[0],\n      setIsAudioPlaying = _useState2[1];\n\n  var mediaData = props.mediafile;\n  var mediaElement = getTypeSpecificMediaElement(mediaData.file_type);\n\n  function handleClick(e) {\n    if (props.onClick) {\n      props.onClick(e);\n    }\n\n    if (mediaData.type === \"audio\") {\n      setIsAudioPlaying(!isAudioPlaying);\n    }\n  }\n\n  function getTypeSpecificMediaElement(type) {\n    switch (type) {\n      case \"image\":\n      case \"video\":\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"img\", {\n          className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.thumbnail,\n          src: mediaData.src,\n          alt: \"Media file thumbnail\"\n        });\n\n      case \"audio\":\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"img\", {\n          className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.thumbnail_default,\n          src: isAudioPlaying ? _assets_audioPauseIcon_svg__WEBPACK_IMPORTED_MODULE_4__.default : _assets_audioPlayIcon_svg__WEBPACK_IMPORTED_MODULE_3__.default,\n          alt: \"Audio play/pause button\"\n        });\n      // return <svg data-is-active={isMediaPlaying} className={styles.audio_button} width=\"128\" height=\"128\"\n      // \t\t\t\t\t\tviewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      // \t<circle cx=\"64\" cy=\"64\" r=\"62\" stroke=\"#4E4E4E\" stroke-width=\"4\"/>\n      // \t<g className={styles.audio_button_pause}>\n      // \t\t<rect x=\"46\" y=\"32\" width=\"10\" height=\"64\" fill=\"#4E4E4E\"/>\n      // \t\t<rect x=\"72\" y=\"32\" width=\"10\" height=\"64\" fill=\"#4E4E4E\"/>\n      // \t</g>\n      // \t<path className={styles.audio_button_play} d=\"M89 64L51.5 91.7128L51.5 36.2872L89 64Z\" fill=\"#4E4E4E\"/>\n      // </svg>;\n\n      case \"document\":\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"a\", {\n          className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.link_download,\n          href: mediaData.src,\n          download: true\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"img\", {\n          className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.thumbnail_default,\n          src: _assets_documentIcon_svg__WEBPACK_IMPORTED_MODULE_5__.default,\n          alt: \"Document Icon\"\n        }));\n\n      default:\n        throw Error();\n    }\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"div\", {\n    className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.wrapper\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"div\", {\n    className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.card\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"div\", {\n    className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.media_wrapper\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"div\", {\n    className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.link,\n    \"data-src\": mediaData.src,\n    \"data-type\": mediaData.type,\n    onClick: handleClick\n  }), mediaElement, isAudioPlaying === true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"input\", {\n    type: \"range\",\n    className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.progress_bar,\n    min: \"0\",\n    max: \"100\",\n    value: \"0\"\n  }) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"div\", {\n    className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.info\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(\"div\", {\n    className: _FileCard_module_css__WEBPACK_IMPORTED_MODULE_1__.default.title\n  }, mediaData.file_name))));\n}\nvoid function register() {\n  /* react-hot-loader/webpack */\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal[\"default\"] : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n  /* eslint-disable camelcase, no-undef */\n\n\n  var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports;\n  /* eslint-enable camelcase, no-undef */\n\n  if (!webpackExports) {\n    return;\n  }\n\n  if (typeof webpackExports === 'function') {\n    reactHotLoader.register(webpackExports, 'module.exports', \"/Users/home/Documents/Projects/medialibrary-coursework/src/Components/FileCard.js\");\n    return;\n  }\n  /* eslint-disable no-restricted-syntax */\n\n\n  for (var key in webpackExports) {\n    /* eslint-enable no-restricted-syntax */\n    if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) {\n      continue;\n    }\n\n    var namedExport = void 0;\n\n    try {\n      namedExport = webpackExports[key];\n    } catch (err) {\n      continue;\n    }\n\n    reactHotLoader.register(namedExport, key, \"/Users/home/Documents/Projects/medialibrary-coursework/src/Components/FileCard.js\");\n  }\n}();\n\n//# sourceURL=webpack://medialibrary-coursework/./src/Components/FileCard.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "f21ebe9008c999074083"
/******/ 	})();
/******/ 	
/******/ }
);