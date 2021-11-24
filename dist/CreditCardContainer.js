"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _CreditCardComponent = _interopRequireDefault(require("./CreditCardComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CreditCardContainer = () => {
  // Data
  const [cardNumber, setCardNumber] = (0, _react.useState)("");
  const [cardHolderName, setCardHolderName] = (0, _react.useState)("");
  const [expirationDate, setExpirationDate] = (0, _react.useState)("");
  const [securityCode, setSecurityCode] = (0, _react.useState)(""); // Errors

  const [errorMessageArray, setErrorMessageArray] = (0, _react.useState)([]);
  const childRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    console.log("errors: ", errorMessageArray);
  }, [errorMessageArray]);

  const getCardType = cardType => {
    console.log("card type initials: ", cardType);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CreditCardComponent.default, {
    ref: childRef,
    title: "Card Content Here",
    numberLabel: "Card Number",
    nameLabel: "Name on the Card",
    dateLabel: "Exp (MM / YY)",
    codeLabel: "Security Code",
    cardNameInfo: "Name of the Card Holder",
    AECodeInfo: "4 digit number in the front of the card",
    nonAECodeInfo: "3 digit number in the back of the card",
    invalidNumberError: "Card number is invalid",
    invalidNameError: "Card holder name is required",
    expiredCardError: "Expiration date cannot be in the past",
    invalidMonthError: "Month must be between 01 and 12",
    invalidDateError: "Expiration date is invalid",
    AECodeError: "Security code must be 4 digits",
    nonAECodeError: "Security code must be 3 digits",
    cardNumber: cardNumber,
    setCardNumber: setCardNumber,
    cardHolderName: cardHolderName,
    setCardHolderName: setCardHolderName,
    expirationDate: expirationDate,
    setExpirationDate: setExpirationDate,
    securityCode: securityCode,
    setSecurityCode: setSecurityCode,
    errorMessageArray: errorMessageArray,
    setErrorMessageArray: setErrorMessageArray,
    getCardType: getCardType
  }), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => childRef.current.triggerValidations()
  }, "trigger validation!"));
};

var _default = CreditCardContainer;
exports.default = _default;