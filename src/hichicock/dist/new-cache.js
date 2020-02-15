"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lazy = exports.createResource = undefined;

var _spy = require("./spy");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createResource = exports.createResource = function createResource(fetch, hashFunc) {
  return {
    preload: function preload(input) {
      return _spy.cachePublisher.preload({
        key: hashFunc ? hashFunc(input) : input,
        getValue: function getValue() {
          return fetch(input);
        }
      });
    },
    read: function read(input) {
      return _spy.cachePublisher.load({
        key: hashFunc ? hashFunc(input) : input,
        getValue: function getValue() {
          return fetch(input);
        }
      });
    }
  };
};

var extractImportName = function extractImportName(func, name) {
  if (name) {
    return name;
  }
  var webpackRegex = /([A-z\.\-]*)(\.jsx?|\.tsx?)/;
  var webpackResult = func.toString().match(webpackRegex);
  if (webpackResult) {
    return webpackResult[1].trim();
  }

  var requireRegex = /require\((.*?)\)/;
  var requireResult = func.toString().match(requireRegex);
  if (requireResult) {
    return requireResult[1].trim();
  }
  return func.toString();
};

var lazy = exports.lazy = function lazy(fetch, name) {
  var resource = createResource(fetch, function () {
    return "lazy(" + extractImportName(fetch, name) + ")";
  });
  // const Component = React.lazy(fetch);
  // console.log(Component);
  return function (props) {
    var Component = resource.read().default;
    return _react2.default.createElement(Component, props);
  };
};