"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Director = exports.lazy = exports.createResource = undefined;

var _director = require("./director");

var _director2 = _interopRequireDefault(_director);

var _newCache = require("./new-cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createResource = _newCache.createResource;
exports.lazy = _newCache.lazy;
exports.Director = _director2.default;