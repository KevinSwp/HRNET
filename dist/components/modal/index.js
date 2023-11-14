"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("./modal.scss");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Modal component for displaying a modal dialog.
 * @param {boolean} isOpen - Determines if the modal is open or closed.
 * @param {Function} onClose - Function to call when closing the modal.
 * @param {string} modalText - Text to display in the modal.
 */
const Modal = _ref => {
  let {
    isOpen,
    onClose,
    modalText
  } = _ref;
  if (!isOpen) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-overlay"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "close-icon",
    onClick: onClose
  }, "\xD7"), /*#__PURE__*/_react.default.createElement("h2", null, modalText || 'Modifiez ce texte')));
};
var _default = exports.default = Modal;