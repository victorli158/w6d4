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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(htmlElements) {
    this.elements = htmlElements;
  }

  empty () {
    this.elements.forEach((el) => {
      while(el.firstChild)
        el.removeChild(el.firstChild);
    });
  }

  remove() {
    this.elements.forEach((el) => {
      el.parentElement.removeChild(el);
    });
  }

  attr(atr, val) {
    this.elements.forEach((el) => {
      el.setAttribute(atr, val);
    });
  }

  addClass(cls) {
    this.elements.forEach((el) => {
      el.classList.add(cls);
    });
  }

  removeClass(cls) {
    this.elements.forEach((el) => {
      el.classList.remove(cls);
    });
  }

  html(text) {
    if(typeof(text) === 'string') {
      this.elements.forEach((el) => {
        el.innerHTML = text;
      });
    }
    else {
      return this.elements[0].innerHTML;
    }
  }

  append(children) {
    if (this.elements.length === 0)
      return;

    if (typeof children === 'object' &&
        !(children instanceof DomNodeCollection)) {
      children = new DomNodeCollection(children);
    }

    if (typeof children === "string") {
      this.each(el => {el.innerHTML += children;});
    } else if (children instanceof DomNodeCollection) {
      this.each(el => {
        children.each(childNode => {
          el.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  find(selector) {
    let foundNodes = [];
    this.each(el => {
      const elList = el.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(elList));
    });
    return new DomNodeCollection(foundNodes);
  }

  children() {
    let childNodes = [];
    this.each(node => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DomNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = [];

    this.each( (el) => {
      if(el.visited)
        parentNodes.push(el);
      else
        el.visited = true;
    });

    parentNodes.forEach((node) => {node.visited = false; });
    return new DomNodeCollection(parentNodes);
  }

  each(callback) {
    this.elements.forEach(callback);
  }

  on(eventName, callback) {
    this.each(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `jqliteEvts-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.each(node => {
      const eventKey = `jqliteEvts-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }


}

module.exports = DomNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(0);
const _documentIsReady = false;
const _documentReadyFunctions = new Array();

function $l(argument) {
  if(typeof(argument) === 'string') {
    const elementList = document.querySelectorAll(argument);
    const nodes = Array.from(elementList);
    return new DomNodeCollection(nodes);
  } else if(typeof(argument) === 'function') {
    if(!_documentIsReady){
      _documentReadyFunctions.push(argument);
    } else {
      argument();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  _documentIsReady = true;
  _documentReadyFunctions.forEach( func => func() );
});

window.$l = $l;


/***/ })
/******/ ]);