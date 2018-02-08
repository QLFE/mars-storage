(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["storage"] = factory();
	else
		root["storage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @Author: Wang Xiao
 * @Date: 2017-05-23 10:49:36
 * @Last Modified by: Wang Xiao
 * @Last Modified time: 2018-02-08 19:47:04
 */
var _storage = {}; // 本地变量后备

/**
 * 检测storage 是否可用
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function detect(type) {
  try {
    var _storage2 = window[type];
    var x = '__storage_test__';
    _storage2.setItem(x, x);
    _storage2.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * storage 类
 *
 * @class storage
 */

var storage = function () {
  function storage(_ref) {
    var _ref$type = _ref.type,
        type = _ref$type === undefined ? 'localStorage' : _ref$type,
        _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === undefined ? '__storage__' : _ref$prefix;

    _classCallCheck(this, storage);

    this.prefix = prefix;
    this.type = type;

    this.enabled = detect(type);
    this.storage = window[type];
  }

  _createClass(storage, [{
    key: '_fillPrefix',
    value: function _fillPrefix(key) {
      if (key.indexOf(this.prefix) === 0) {
        return key;
      }

      return '' + this.prefix + key;
    }

    /**
     * 获取对应 key 的 value 值
     *
     * @param {any} key key名
     * @returns
     *
     * @memberof storage
     */

  }, {
    key: 'get',
    value: function get(key) {
      var obj = void 0;
      key = this._fillPrefix(key);

      if (this.enabled) {
        var value = this.storage.getItem(key);
        try {
          obj = JSON.parse(value);
        } catch (e) {
          obj = value;
        }
      } else {
        obj = _storage[key];
      }

      if (obj && obj.data) {
        if (!obj.expire || obj.expire > new Date().getTime()) {
          return obj.data;
        }
        this.remove(key);
      }
      return undefined;
    }

    /**
     * 设置key值
     *
     * @param {any} key key名
     * @param {any} value key值
     * @param {any} expire 过期时间，单位毫秒
     * @returns
     *
     * @memberof storage
     */

  }, {
    key: 'set',
    value: function set(key, value, expire) {
      var obj = {
        data: value
      };

      key = this._fillPrefix(key);

      if (expire && expire > 0) {
        obj.expire = new Date().getTime() + expire;
      }

      if (this.enabled) {
        this.storage.setItem(key, JSON.stringify(obj));
      } else {
        _storage[key] = obj;
      }
      return value;
    }

    /**
     * 返回所有的 keys
     *
     * @returns
     *
     * @memberof storage
     */

  }, {
    key: 'getKeys',
    value: function getKeys() {
      var _this = this;

      var keys = [];
      var resultKeys = [];
      var prefixLength = this.prefix.length;

      if (this.enabled) {
        keys = Object.keys(this.storage);
      } else {
        keys = Object.keys(_storage);
      }

      keys.forEach(function (key) {
        var index = key.indexOf(_this.prefix);
        if (index === 0) {
          resultKeys.push(key.substring(prefixLength));
        }
      });

      return resultKeys;
    }

    /**
     * 删除对应的key
     *
     * @param {any} key
     *
     * @memberof storage
     */

  }, {
    key: 'remove',
    value: function remove(key) {
      key = this._fillPrefix(key);
      if (this.enabled) {
        this.storage.removeItem(key);
      } else {
        delete _storage[key];
      }
    }

    /**
     * 删除所有 key
     *
     *
     * @memberof storage
     */

  }, {
    key: 'removeAll',
    value: function removeAll() {
      var _this2 = this;

      var keys = this.getKeys();

      keys.forEach(function (key) {
        _this2.remove(key);
      });
    }

    /**
     * 删除过期的key
     *
     *
     * @memberof storage
     */

  }, {
    key: 'removeExpired',
    value: function removeExpired() {
      var _this3 = this;

      var keys = this.getKeys();

      keys.forEach(function (key) {
        _this3.get(key);
      });
    }
  }]);

  return storage;
}();

;

exports.default = storage;

/***/ })
/******/ ]);
});