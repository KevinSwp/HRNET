"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("./modal.scss");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Modal = _ref => {
  let {
    isOpen,
    onClose
  } = _ref;
  if (!isOpen) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-overlay"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "close-icon",
    onClick: onClose
  }, "\xD7"), /*#__PURE__*/_react.default.createElement("h2", null, "Employee Created!")));
};
var _default = exports.default = Modal;