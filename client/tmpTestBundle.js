/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const context = __webpack_require__(1);
	context.keys().forEach(context);
	module.exports = context;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./reducers/projectReducers.spec.js": 2
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/* eslint-env mocha */
	/* eslint-disable import/no-extraneous-dependencies */

	import assert from 'assert';
	import deepFreeze from 'deep-freeze';

	import * as actions from 'actions/indexActions';
	import { projectList} from './projectReducers';

	describe('project redcuer', () => {
	    // Fetch Basic Info about User
	    it('It should set basic info about user', () => {
	        const initialState = [];

	        const expectedState = [1, 2, 3]

	        const resultState = projectList(deepFreeze(initialState), {
	            type: actionTypes.FETCH_PROJECTS_SUCCESS,
	            response: [1, 2, 3],

	        });

	        assert.deepEqual(resultState, expectedState);
	    });
	});


/***/ }
/******/ ]);