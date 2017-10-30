/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/bin/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getGPA = 'Get GPA';
var GPA = 'GPA';

document.addEventListener('DOMContentLoaded', function () {
    queryGPA();
    document.getElementById("AddRow").addEventListener('click', pushRow);
    document.getElementById("PopRow").addEventListener('click', popRow);
});

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name !== 'contentScript') {
        return;
    }
    port.onMessage.addListener(function (msg) {
        if (msg.hasOwnProperty(GPA)) {
            document.getElementById(GPA).innerHTML = msg[GPA].toFixed(2);
            setGPATextColour(msg[GPA]);
        }
    });
});

function queryGPA() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var port = chrome.tabs.connect(tabs[0].id, { name: 'app' });
        port.postMessage(getGPA);
    });
}

function setGPATextColour(gpa) {
    if (gpa < 4) {
        document.getElementById(GPA).style.color = "red";
    } else if (gpa >= 4 && gpa < 8) {
        document.getElementById(GPA).style.color = "orange";
    } else {
        document.getElementById(GPA).style.color = "green";
    }
}

function pushRow() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var port = chrome.tabs.connect(tabs[0].id, { name: 'app' });
        port.postMessage({ add: [document.getElementById("Session").value, document.getElementById("Course").value, document.getElementById("Title").value, document.getElementById("Grade").value] });
    });
}

function popRow() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var port = chrome.tabs.connect(tabs[0].id, { name: 'app' });
        port.postMessage("Pop Row");
    });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map