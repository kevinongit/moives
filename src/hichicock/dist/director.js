"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _buttons;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styled = require("@emotion/styled");

var _styled2 = _interopRequireDefault(_styled);

var _spy = require("./spy");

var _createSubscriptionProductionMin = require("create-subscription/cjs/create-subscription.production.min.js");

var _reactDraggable = require("react-draggable");

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Subscription = (0, _createSubscriptionProductionMin.createSubscription)({
  getCurrentValue: function getCurrentValue(source) {
    return source.getCurrentValue();
  },
  subscribe: function subscribe(source, callback) {
    var onChange = function onChange() {
      return callback(source.getCurrentValue());
    };
    source.subscribe(onChange);
    return function unsubscribe() {
      source.unsubscribe(onChange);
    };
  }
});

var clickable = {
  // cursor: "pointer",
  transition: "transform 70ms",
  ":hover": {
    transform: "scale(1.005)"
  },
  ":active": {
    transform: "scale(0.99)"
  }
};

var Row = _styled2.default.li(_extends({
  margin: "8px 8px"
}, clickable, {
  fontSize: "15px",
  fontFamily: "\"Courier New\", Monaco, sans-serif",
  "& *:first-of-type": {
    height: 18,
    paddingBottom: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
}));

var ProgressBar = _styled2.default.div(function (_ref) {
  var completion = _ref.completion;
  return {
    borderBottom: "solid 1px #222",
    width: completion + "%"
  };
});

var buttons = (_buttons = {}, _defineProperty(_buttons, _spy.WAITING, _react2.default.createElement("span", null)), _defineProperty(_buttons, _spy.RUNNING, _react2.default.createElement(
  "span",
  { style: { fontSize: "0.8em", letterSpacing: "-0.2em" } },
  "\u275A\u275A"
)), _defineProperty(_buttons, _spy.PAUSED, _react2.default.createElement(
  "span",
  null,
  "\u25BA"
)), _defineProperty(_buttons, _spy.DONE, _react2.default.createElement(
  "span",
  null,
  "\u2716"
)), _buttons);

var Record = function Record(_ref2) {
  var record = _ref2.record;
  return _react2.default.createElement(
    Subscription,
    { source: record },
    function (_ref3) {
      var status = _ref3.status,
          completion = _ref3.completion;
      return _react2.default.createElement(
        Row,
        {
          onClick: function onClick() {
            switch (status) {
              case _spy.WAITING:
                return null;
              case _spy.RUNNING:
                return record.pause();
              case _spy.PAUSED:
                return record.start();
              case _spy.DONE:
                return record.clear();
            }
          }
        },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "span",
            { title: record.key },
            record.key
          ),
          buttons[status]
        ),
        _react2.default.createElement(ProgressBar, { completion: completion })
      );
    }
  );
};

var List = _styled2.default.ul(function (_ref4) {
  var scrollable = _ref4.scrollable;
  return {
    padding: 0,
    margin: 0,
    listStyleType: "none"
    // overflowY: "auto",
    // height: `${scrollable ? 94 : "auto"}`
  };
});

var EmptyList = _styled2.default.div({
  fontSize: "15px",
  margin: "8px 8px",
  fontFamily: "\"Courier New\", Monaco, sans-serif"
});

var RecordList = function RecordList(_ref5) {
  var records = _ref5.records,
      scrollable = _ref5.scrollable;
  return !records.length ? _react2.default.createElement(
    EmptyList,
    null,
    "(empty)"
  ) : _react2.default.createElement(
    List,
    { scrollable: scrollable },
    records.map(function (record) {
      return _react2.default.createElement(Record, { key: record.key, record: record });
    })
  );
};

var DirectorPanel = _styled2.default.div({
  position: "fixed",
  top: 10,
  right: 10,
  width: 250,
  zIndex: 99999,
  userSelect: "none",
  background: "rgba(230, 230, 230, 0.6)",
  color: "#222",
  fontFamily: "Helvetica Neue, Helvetica, Arial, \"Lucida Grande\", sans-serif"
});

var Header = _styled2.default.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 20,
  lineHeight: "20px",
  verticalAlign: "bottom",
  margin: "20px 8px 8px 8px",
  "& *:first-of-type": {
    fontSize: "18px",
    fontWeight: "500"
  },
  "& *:last-child": _extends({
    textTransform: "uppercase",
    fontSize: "12px"
  }, clickable)
});

var Slider = _styled2.default.div({
  margin: "8px 8px 0px 8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

var Director = function Director(_ref6) {
  var cache = _ref6.cache;
  return _react2.default.createElement(
    Subscription,
    { source: cache },
    function (_ref7) {
      var pendingRecords = _ref7.pendingRecords,
          settledRecords = _ref7.settledRecords,
          delay = _ref7.delay,
          startPaused = _ref7.startPaused;
      return _react2.default.createElement(
        _reactDraggable2.default,
        null,
        _react2.default.createElement(
          DirectorPanel,
          null,
          _react2.default.createElement(
            Slider,
            { onChange: function onChange(e) {
                return cache.setDelay(e.target.value);
              } },
            "Latency:",
            [0, 1, 2, 4].map(function (d) {
              return _react2.default.createElement(
                "label",
                { key: d },
                _react2.default.createElement("input", {
                  type: "radio",
                  name: "delay",
                  value: d,
                  defaultChecked: delay === d
                }),
                d,
                "s"
              );
            })
          ),
          _react2.default.createElement(
            Header,
            null,
            _react2.default.createElement(
              "span",
              null,
              "Loading"
            ),
            _react2.default.createElement(
              "label",
              null,
              "Pause new requests",
              _react2.default.createElement("input", {
                type: "checkbox",
                style: {
                  verticalAlign: "middle",
                  position: "relative",
                  bottom: "1px"
                },
                checked: startPaused,
                onChange: function onChange() {
                  return cache.toggleStartPaused();
                }
              })
            )
          ),
          _react2.default.createElement(RecordList, { records: pendingRecords }),
          _react2.default.createElement(
            Header,
            null,
            _react2.default.createElement(
              "span",
              null,
              "Cached"
            ),
            _react2.default.createElement(
              "span",
              { onClick: function onClick() {
                  return cache.clearAll();
                } },
              "\uD83D\uDDD1\uFE0F"
            )
          ),
          _react2.default.createElement(RecordList, { records: settledRecords, scrollable: true })
        )
      );
    }
  );
};

function showDirector() {
  var directorId = "hitchcock-director";
  if (!document.getElementById(directorId)) {
    var $director = document.createElement("div");
    $director.id = directorId;
    document.body.appendChild($director);
    _reactDom2.default.render(_react2.default.createElement(Director, { cache: _spy.cachePublisher }), $director);
  }
}

var _class = function (_React$PureComponent) {
  _inherits(_class, _React$PureComponent);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

    showDirector();
    return _this;
  }

  _createClass(_class, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return _class;
}(_react2.default.PureComponent);

exports.default = _class;