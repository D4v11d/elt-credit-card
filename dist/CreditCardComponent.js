"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./creditCardStyles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CreditCardComponent = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "text-Container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccContainer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccContainerTitle"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccTitle"
  }, "Card Content Here"), /*#__PURE__*/_react.default.createElement("div", {
    className: "cardTypes"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "img-mc ccColor",
    alt: "mc"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "img-vs ccColor",
    alt: "vs"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "img-ae ccColor",
    alt: "ae"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormContainer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInput"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "cardNumber",
    required: true
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "cardNumber"
  }, "Card Number", /*#__PURE__*/_react.default.createElement("span", {
    className: "ccInputWarning show"
  }, "* This is a Warning"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInput"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "cardName",
    required: true
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "cardName"
  }, "Name on the Card", /*#__PURE__*/_react.default.createElement("span", {
    className: "ccInputWarning show"
  }, "* This is a Warning")), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInfoMark"
  }, "?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInfo"
  }, "Name of the Card Holder")), /*#__PURE__*/_react.default.createElement("div", {
    className: "w50pl"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInput"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "cardExp",
    required: true
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "cardExp"
  }, "Exp (MM / YY)", /*#__PURE__*/_react.default.createElement("span", {
    className: "ccInputWarning show"
  }, "* This is a Warning")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w50pr"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInput"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "cardSecCode",
    required: true
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "cardSecCode"
  }, "Security Code", /*#__PURE__*/_react.default.createElement("span", {
    className: "ccInputWarning show"
  }, "* This is a Warning")), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInfoMark"
  }, "?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInfo"
  }, "3 Digit number in the back of the card"))))));
};

var _default = CreditCardComponent;
exports.default = _default;