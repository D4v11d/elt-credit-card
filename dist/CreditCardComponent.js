"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.parse-int.js");

var _react = _interopRequireWildcard(require("react"));

require("./creditCardStyles.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CreditCardComponent = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  // Card types
  const [isMasterCard, setIsMasterCard] = (0, _react.useState)(false);
  const [isVisa, setIsVisa] = (0, _react.useState)(false);
  const [isAmericanExpress, setIsAmericanExpress] = (0, _react.useState)(false); // Regular expressions

  const isMasterCardRegExp = new RegExp("^(?:5[1-5][0-6]{0,}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{0,}|27[01][0-9]|2720)[0-9]{0,}$");
  const isVisaRegExp = new RegExp('^4[0-9]{0,16}$');
  const isAmericanExpressRegExp = new RegExp("^3[47][0-9]{0,15}$");
  const [localErrorMessageArray, setLocalErrorMessageArray] = (0, _react.useState)(["", "", "", ""]);

  const handleChangeCardNumber = event => {
    handleCardNumberInput(event);
  };

  const handleCardNumberInput = event => {
    const cardNumber = event.target.value;
    let formattedCardNumber = "";
    let cardNumberWithoutSpaces = cardNumber.replace(/\s/g, "");
    setIsAmericanExpress(isAmericanExpressRegExp.test(cardNumberWithoutSpaces));
    setIsVisa(isVisaRegExp.test(cardNumberWithoutSpaces));
    setIsMasterCard(isMasterCardRegExp.test(cardNumberWithoutSpaces));

    if (event.target.validity.valid || cardNumber === "") {
      if (isAmericanExpress) {
        // american express format: 1234 123456 12345
        formattedCardNumber = cardNumber.replace(/[^\d]/g, '').replace(/(\d{0,4})(\d{0,6})(\d{0,5})/g, '$1 $2 $3').substring(0, 17).trim();
      } else {
        // visa and mastercard format: 1234 1234 1234 1234
        formattedCardNumber = cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').substring(0, 19).trim();
      }

      props.setCardNumber(formattedCardNumber);
    }
  };

  const handleCardNumberValidation = () => {
    // validate card number length
    const cardNumberLength = props.cardNumber.length;

    if (isAmericanExpress && cardNumberLength === 17 || !isAmericanExpress && cardNumberLength === 19) {
      localErrorMessageArray[0] = "";
      handleSetCardType();
    } else {
      localErrorMessageArray[0] = props.invalidNumberError;
    }

    handleSecurityCodeValidation();
  };

  const handleChangeCardHolderName = event => {
    const name = event.target.value;
    props.setCardHolderName(name);
  };

  const handleCardHolderNameValidation = () => {
    if (props.cardHolderName === "") {
      localErrorMessageArray[1] = props.invalidNameError;
    } else {
      localErrorMessageArray[1] = "";
    }

    handleSetErrorMessages();
  };

  const handleChangeExpirationDate = event => {
    const date = event.target.value;
    let formattedDate = date.replace(/[^\d]/g, '').replace(/([0-9]{2})(\d{2})/g, '$1 / $2').substring(0, 7).trim();
    props.setExpirationDate(formattedDate);
  };

  const handleExpirationDateValidation = () => {
    if (props.expirationDate.length === 7) {
      const currentMonth = parseInt((new Date().getMonth() + 1).toString().substr(-2));
      const currentYear = parseInt(new Date().getFullYear().toString().substr(-2));
      let month = parseInt(props.expirationDate.substring(0, 2));
      let year = parseInt(props.expirationDate.substring(5));

      if (month > 0 && month <= 12) {
        if (year > currentYear) {
          localErrorMessageArray[2] = "";
        } else if (year === currentYear) {
          if (month >= currentMonth) {
            localErrorMessageArray[2] = "";
          } else {
            localErrorMessageArray[2] = props.expiredCardError;
          }
        } else {
          localErrorMessageArray[2] = props.expiredCardError;
        }
      } else {
        localErrorMessageArray[2] = props.invalidMonthError;
      }
    } else {
      localErrorMessageArray[2] = props.invalidDateError;
    }

    handleSetErrorMessages();
  };

  const handleChangeSecurityCode = event => {
    let code = event.target.value;

    if (event.target.validity.valid || code === "") {
      code = isAmericanExpress ? code = code.substring(0, 4) : code = code.substring(0, 3);
      props.setSecurityCode(code);
    }
  };

  const handleSecurityCodeValidation = () => {
    const codeLength = props.securityCode.length;

    if (isAmericanExpress && codeLength !== 4) {
      localErrorMessageArray[3] = props.AECodeError;
      handleSetErrorMessages();
      return;
    } else if (!isAmericanExpress) {
      if (codeLength !== 3) {
        localErrorMessageArray[3] = props.nonAECodeError;
        handleSetErrorMessages();
        return;
      }
    }

    localErrorMessageArray[3] = "";
    handleSetErrorMessages();
  };

  const handleSetErrorMessages = () => {
    setLocalErrorMessageArray(localErrorMessageArray);
    const filteredErrors = localErrorMessageArray.filter(error => error !== "");
    props.setErrorMessageArray(filteredErrors);
  };

  const handleSetCardType = () => {
    if (isMasterCard) {
      props.setCardType("mastercard");
    } else if (isVisa) {
      props.setCardType("visa");
    } else {
      props.setCardType("amex");
    }
  };

  (0, _react.useImperativeHandle)(ref, () => ({
    triggerValidations() {
      handleCardNumberValidation();
      handleExpirationDateValidation();
      handleCardHolderNameValidation();
    }

  }));
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "text-Container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccContainer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccContainerTitle"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccTitle"
  }, props.title), /*#__PURE__*/_react.default.createElement("div", {
    className: "cardTypes"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "img-mc ".concat(isMasterCard ? "ccColor" : ""),
    alt: "mc"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "img-vs ".concat(isVisa ? "ccColor" : ""),
    alt: "vs"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "img-ae ".concat(isAmericanExpress ? "ccColor" : ""),
    alt: "ae"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormContainer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInput"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "cardNumber",
    required: true,
    value: props.cardNumber,
    onChange: handleChangeCardNumber,
    onBlur: handleCardNumberValidation
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "cardNumber"
  }, props.numberLabel, /*#__PURE__*/_react.default.createElement("span", {
    className: "ccInputWarning"
  }, localErrorMessageArray[0]))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInput"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "cardName",
    required: true,
    value: props.cardHolderName,
    onChange: handleChangeCardHolderName,
    onBlur: handleCardHolderNameValidation
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "cardName"
  }, props.nameLabel, /*#__PURE__*/_react.default.createElement("span", {
    className: "ccInputWarning"
  }, localErrorMessageArray[1])), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInfoMark"
  }, "?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInfo"
  }, props.cardNameInfo)), /*#__PURE__*/_react.default.createElement("div", {
    className: "w50pl"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInput"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "cardExp",
    required: true,
    value: props.expirationDate,
    onChange: handleChangeExpirationDate,
    onBlur: handleExpirationDateValidation
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "cardExp"
  }, props.dateLabel, /*#__PURE__*/_react.default.createElement("span", {
    className: "ccInputWarning"
  }, " ", localErrorMessageArray[2])))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w50pr"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInput"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    pattern: "[0-9]{0,}",
    id: "cardSecCode",
    required: true,
    value: props.securityCode,
    onChange: handleChangeSecurityCode,
    onBlur: handleSecurityCodeValidation
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "cardSecCode"
  }, props.codeLabel, /*#__PURE__*/_react.default.createElement("span", {
    className: "ccInputWarning"
  }, " ", localErrorMessageArray[3])), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInfoMark"
  }, "?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "ccFormInfo"
  }, isAmericanExpress ? /*#__PURE__*/_react.default.createElement("span", null, props.AECodeInfo) : /*#__PURE__*/_react.default.createElement("span", null, props.nonAECodeInfo)))))));
});
CreditCardComponent.propTypes = {
  cardNumber: _propTypes.default.string,
  setCardNumber: _propTypes.default.func,
  cardHolderName: _propTypes.default.string,
  setCardHolderName: _propTypes.default.func,
  expirationDate: _propTypes.default.string,
  setExpirationDate: _propTypes.default.func,
  securityCode: _propTypes.default.string,
  setSecurityCode: _propTypes.default.func,
  errorMessageArray: _propTypes.default.array,
  setErrorMessageArray: _propTypes.default.func,
  getErrorMessages: _propTypes.default.func,
  setCardType: _propTypes.default.func,
  title: _propTypes.default.string,
  numberLabel: _propTypes.default.string,
  nameLabel: _propTypes.default.string,
  dateLabel: _propTypes.default.string,
  codeLabel: _propTypes.default.string,
  AECodeInfo: _propTypes.default.string,
  nonAECodeInfo: _propTypes.default.string,
  cardNameInfo: _propTypes.default.string,
  invalidNumberError: _propTypes.default.string,
  invalidNameError: _propTypes.default.string,
  expiredCardError: _propTypes.default.string,
  invalidMonthError: _propTypes.default.string,
  invalidDateError: _propTypes.default.string,
  AECodeError: _propTypes.default.string,
  nonAECodeError: _propTypes.default.string
};
var _default = CreditCardComponent;
exports.default = _default;