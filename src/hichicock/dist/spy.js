"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DONE = exports.PAUSED = exports.RUNNING = exports.WAITING = exports.cachePublisher = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cache = require("./cache");

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WAITING = 0;
var RUNNING = 1;
var PAUSED = 2;
var DONE = 3;

var Publisher = function () {
  function Publisher() {
    _classCallCheck(this, Publisher);

    this.handlers = [];
  }

  _createClass(Publisher, [{
    key: "subscribe",
    value: function subscribe(handler) {
      this.handlers = [].concat(_toConsumableArray(this.handlers), [handler]);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(handler) {
      this.handlers = this.handlers.filter(function (h) {
        return h != handler;
      });
    }
  }, {
    key: "notify",
    value: function notify(value) {
      this.handlers.forEach(function (h) {
        return h();
      });
    }
  }]);

  return Publisher;
}();

var RecordPublisher = function (_Publisher) {
  _inherits(RecordPublisher, _Publisher);

  function RecordPublisher(record) {
    _classCallCheck(this, RecordPublisher);

    var _this = _possibleConstructorReturn(this, (RecordPublisher.__proto__ || Object.getPrototypeOf(RecordPublisher)).call(this));

    _this.key = record.key;
    _this.status = WAITING;
    _this.timer = null;
    _this.interval = null;
    return _this;
  }

  _createClass(RecordPublisher, [{
    key: "fulfill",
    value: function fulfill(resolve, delay, startPaused) {
      // The original promis is fulfilled
      this.resolve = resolve;
      this.originalDelay = delay * 1000;
      this.remaining = delay * 1000;
      startPaused ? this.pause() : this.start();
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      this.started = new Date();
      this.interval = setInterval(function () {
        return _this2.notify();
      }, 100);
      this.timer = setTimeout(function () {
        if (_this2.interval) {
          clearInterval(_this2.interval);
        }
        _this2.resolve();
      }, this.remaining);
      this.status = RUNNING;
      this.notify();
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.interval) {
        clearInterval(this.interval);
      }
      if (this.started) {
        this.remaining -= new Date() - this.started;
      }
      this.status = PAUSED;
      this.notify();
    }
  }, {
    key: "done",
    value: function done() {
      this.status = DONE;
    }
  }, {
    key: "getCurrentValue",
    value: function getCurrentValue() {
      var status = this.status;
      switch (this.status) {
        case WAITING:
          return { status: status, completion: 0 };
        case RUNNING:
          return {
            status: status,
            completion: 100 - 100 * (this.remaining - (new Date() - this.started)) / this.originalDelay
          };
        case PAUSED:
          return {
            status: status,
            completion: 100 - 100 * this.remaining / this.originalDelay
          };
        case DONE:
          return {
            status: status,
            completion: 100
          };
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      _cache2.default.clear(this.key, spy);
    }
  }]);

  return RecordPublisher;
}(Publisher);

var CachePublisher = function (_Publisher2) {
  _inherits(CachePublisher, _Publisher2);

  function CachePublisher() {
    _classCallCheck(this, CachePublisher);

    var _this3 = _possibleConstructorReturn(this, (CachePublisher.__proto__ || Object.getPrototypeOf(CachePublisher)).call(this));

    _this3.pendingRecords = [];
    _this3.settledRecords = [];
    _this3.startPaused = false;
    _this3.delay = 1;
    return _this3;
  }

  _createClass(CachePublisher, [{
    key: "getCurrentValue",
    value: function getCurrentValue() {
      return {
        pendingRecords: this.pendingRecords,
        settledRecords: this.settledRecords,
        delay: this.delay,
        startPause: this.startPaused
      };
    }
  }, {
    key: "setDelay",
    value: function setDelay(d) {
      this.delay = d;
      this.notify();
    }
  }, {
    key: "toggleStartPaused",
    value: function toggleStartPaused() {
      this.startPaused = !this.startPaused;
      this.notify();
    }
  }, {
    key: "addPending",
    value: function addPending(rp) {
      this.pendingRecords = [rp].concat(_toConsumableArray(this.pendingRecords));
      this.notify();
    }
  }, {
    key: "fulfill",
    value: function fulfill(key, resolve) {
      var rs = this.pendingRecords.find(function (r) {
        return r.key === key;
      });
      rs.fulfill(resolve, this.delay, this.startPaused);
    }
  }, {
    key: "moveResolved",
    value: function moveResolved(key) {
      var rs = this.pendingRecords.find(function (r) {
        return r.key === key;
      });
      rs.done();
      this.pendingRecords = this.pendingRecords.filter(function (r) {
        return r !== rs;
      });
      this.settledRecords = [rs].concat(_toConsumableArray(this.settledRecords));
      // TODO wrap notify with setTimeout?
      this.notify();
    }
  }, {
    key: "removeAllResolved",
    value: function removeAllResolved() {
      this.settledRecords = [];
      this.notify();
    }
  }, {
    key: "removeResolved",
    value: function removeResolved(key) {
      this.settledRecords = this.settledRecords.filter(function (r) {
        return r.key !== key;
      });
      this.notify();
    }
  }, {
    key: "clear",
    value: function clear(key) {
      var rs = this.settledRecords.find(function (r) {
        return r.key === key;
      });
      rs.clear();
    }
  }, {
    key: "clearAll",
    value: function clearAll(key) {
      _cache2.default.clearAll(spy);
    }
  }, {
    key: "load",
    value: function load(x) {
      return _cache2.default.load(x, spy);
    }
  }, {
    key: "preload",
    value: function preload(x) {
      return _cache2.default.preload(x, spy);
    }
  }]);

  return CachePublisher;
}(Publisher);

var cachePublisher = new CachePublisher();

// TODO why not make the cachePublisher the spy?
var spy = {
  didStart: function didStart(record) {
    cachePublisher.addPending(new RecordPublisher(record));
  },
  willResolve: function willResolve(record) {
    return function (value) {
      return new Promise(function (resolve) {
        cachePublisher.fulfill(record.key, function () {
          return resolve(value);
        });
      });
    };
  },
  didResolve: function didResolve(record) {
    return function (value) {
      cachePublisher.moveResolved(record.key);
      return value;
    };
  },
  didClear: function didClear(record) {
    return cachePublisher.removeResolved(record.key);
  },
  didClearAll: function didClearAll(record) {
    return cachePublisher.removeAllResolved();
  }
};

exports.cachePublisher = cachePublisher;
exports.WAITING = WAITING;
exports.RUNNING = RUNNING;
exports.PAUSED = PAUSED;
exports.DONE = DONE;