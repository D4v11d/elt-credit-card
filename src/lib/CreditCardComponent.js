import React, { useState } from "react";
import "./creditCardStyles.css";
import PropTypes from 'prop-types';

const CreditCardComponent = (props) => {

  // Card types
  const [isMasterCard, setIsMasterCard] = useState(false);
  const [isVisa, setIsVisa] = useState(false);
  const [isAmericanExpress, setIsAmericanExpress] = useState(false);

  // Regular expressions
  const isMasterCardRegExp = new RegExp("^(?:5[1-5][0-6]{0,}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{0,}|27[01][0-9]|2720)[0-9]{0,}$");
  const isVisaRegExp = new RegExp('^4[0-9]{0,16}$');
  const isAmericanExpressRegExp = new RegExp("^3[47][0-9]{0,15}$");

  const [localErrorMessageArray, setLocalErrorMessageArray] = useState(["", "", "", ""]);

  const handleChangeCardNumber = (event) => {
    handleCardNumberInput(event);
  }

  const handleCardNumberInput = (event) => {
    const cardNumber = event.target.value;
    let formattedCardNumber = "";
    let cardNumberWithoutSpaces = cardNumber.replace(/\s/g, "");

    setIsAmericanExpress (isAmericanExpressRegExp.test(cardNumberWithoutSpaces));
    setIsVisa(isVisaRegExp.test(cardNumberWithoutSpaces));
    setIsMasterCard(isMasterCardRegExp.test(cardNumberWithoutSpaces));

    if(event.target.validity.valid || cardNumber === "") {
      if(isAmericanExpress) {
        // american express format: 1234 123456 12345
        formattedCardNumber = cardNumber.replace(/[^\d]/g, '').replace(/(\d{0,4})(\d{0,6})(\d{0,5})/g, '$1 $2 $3').substring(0,17).trim();
      } else {
        // visa and mastercard format: 1234 1234 1234 1234
        formattedCardNumber = cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').substring(0,19).trim();
      }  
      props.setCardNumber(formattedCardNumber);
    }
  }

  const handleCardNumberValidation = () => {
    // validate card number length
    const cardNumberLength = props.cardNumber.length;
    if((isAmericanExpress && cardNumberLength === 17) || (!isAmericanExpress && cardNumberLength === 19)) {
      localErrorMessageArray[0] = "";
      handleGetCardType();
    } else {
      localErrorMessageArray[0] = props.invalidNumberError;
    }
    
    handleSecurityCodeValidation();
  }

  const handleChangeCardHolderName = (event) => {
    const name = event.target.value;
    props.setCardHolderName(name);
  }

  const handleCardHolderNameValidation = () => {
    if(props.cardHolderName === "") {
      localErrorMessageArray[1] = props.invalidNameError;
    } else {
      localErrorMessageArray[1] = "";
    }
    handleSetErrorMessages();
  }

  const handleChangeExpirationDate = (event) => {
    const date = event.target.value;
    let formattedDate = date.replace(/[^\d]/g, '').replace(/([0-9]{2})(\d{2})/g, '$1 / $2').substring(0,7).trim();
    props.setExpirationDate(formattedDate);
  }


  const handleExpirationDateValidation = () => {
    if(props.expirationDate.length === 7) {
      const currentMonth = parseInt((new Date().getMonth() + 1).toString().substr(-2));
      const currentYear = parseInt(new Date().getFullYear().toString().substr(-2));

      let month = parseInt(props.expirationDate.substring(0,2));
      let year = parseInt(props.expirationDate.substring(5));

      if(month > 0 && month <= 12) {
        if(year > currentYear) {
          localErrorMessageArray[2] = "";
        } else if(year === currentYear) {
          if(month >= currentMonth) {
            localErrorMessageArray[2] = "";
          } else {
            localErrorMessageArray[2] = props.expiredCardErrorx;
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
  }

  const handleChangeSecurityCode = (event) => {
    let code = event.target.value;

    if(event.target.validity.valid || code === "") {
      code = isAmericanExpress ? code = code.substring(0,4) : code = code.substring(0,3);  
      props.setSecurityCode(code);
    }
  }

  const handleSecurityCodeValidation = () => {
    const codeLength = props.securityCode.length;
    if(isAmericanExpress && codeLength !== 4) {
      localErrorMessageArray[3] = props.AECodeError;
      handleSetErrorMessages();
      return;
    } else if(!isAmericanExpress) {
      if(codeLength !== 3) {
        localErrorMessageArray[3] = props.nonAECodeError;
        handleSetErrorMessages();
        return;
      }
    }
    localErrorMessageArray[3] = "" 
    handleSetErrorMessages();
  }

  const handleSetErrorMessages = () => {
    setLocalErrorMessageArray(localErrorMessageArray);
    const filteredErrors = localErrorMessageArray.filter(error => error !== "");
    props.setErrorMessageArray(filteredErrors);
  }

  const handleGetCardType = () => {
    if(isMasterCard) {
      props.getCardType("mc");
    } else if (isVisa) {
      props.getCardType("vs");
    } else {
      props.getCardType("ae");
    }
  }

  return (
    <div className="text-Container">
      <div className="ccContainer">
        <div className="ccContainerTitle">
          <div className="ccTitle">{props.title}</div>
          <div className="cardTypes">
            <div className={`img-mc ${isMasterCard? "ccColor" : ""}`} alt="mc"/>
            <div className={`img-vs ${isVisa? "ccColor" : ""}`} alt="vs"/>
            <div className={`img-ae ${isAmericanExpress? "ccColor" : ""}`} alt="ae"/>
          </div>
        </div>

        <div className="ccFormContainer">
          <div className="ccFormInput">
            <input type="text" id="cardNumber" 
            required value={props.cardNumber} onChange={handleChangeCardNumber} onBlur={handleCardNumberValidation}/>
            <label htmlFor="cardNumber">
              {props.numberLabel}
              <span className="ccInputWarning">{localErrorMessageArray[0]}</span>
            </label>
          </div>

          <div className="ccFormInput">
            <input type="text" id="cardName" required value={props.cardHolderName} onChange={handleChangeCardHolderName}
            onBlur={handleCardHolderNameValidation}/>
            <label htmlFor="cardName">
              {props.nameLabel}
              <span className="ccInputWarning">{localErrorMessageArray[1]}</span>
            </label>
            <div className="ccFormInfoMark">?</div>
            <div className="ccFormInfo">{props.cardNameInfo}</div>
          </div>

          <div className="w50pl">
            <div className="ccFormInput">
              <input type="text" id="cardExp" required value={props.expirationDate} 
              onChange={handleChangeExpirationDate} onBlur={handleExpirationDateValidation}/>
              <label htmlFor="cardExp">
                {props.dateLabel}
                <span className="ccInputWarning"> {localErrorMessageArray[2]}</span>
              </label>
            </div>
          </div>

          <div className="w50pr">   
            <div className="ccFormInput">
              <input type="text" pattern="[0-9]{0,}" id="cardSecCode" required
              value={props.securityCode} onChange={handleChangeSecurityCode} onBlur={handleSecurityCodeValidation}/>
              <label htmlFor="cardSecCode">
                {props.codeLabel}
                <span className="ccInputWarning"> {localErrorMessageArray[3]}</span>
              </label>
              <div className="ccFormInfoMark">?</div>
              <div className="ccFormInfo">
                {isAmericanExpress ? 
                  <span>{props.AECodeError}</span> :
                  <span>{props.nonAECodeError}</span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CreditCardComponent.propTypes = {
  cardNumber: PropTypes.string,
  setCardNumber: PropTypes.func,
  cardHolderName: PropTypes.string,
  setCardHolderName: PropTypes.func,
  expirationDate: PropTypes.string,
  setExpirationDate: PropTypes.func,
  securityCode: PropTypes.string,
  setSecurityCode: PropTypes.func,
  errorMessageArray: PropTypes.array,
  setErrorMessageArray: PropTypes.func,
  getCardType: PropTypes.func,
  getErrorMessages: PropTypes.func,

  title: PropTypes.string,
  numberLabel: PropTypes.string,
  nameLabel: PropTypes.string,
  dateLabel: PropTypes.string,
  codeLabel: PropTypes.string,

  AECodeInfo: PropTypes.string,
  nonAECodeInfo: PropTypes.string,
  cardNameInfo: PropTypes.string,

  invalidNumberError: PropTypes.string,
  invalidNameError: PropTypes.string,

  expiredCardError: PropTypes.string,
  invalidMonthError: PropTypes.string,
  invalidDateError: PropTypes.string,

  AECodeError: PropTypes.string,
  nonAECodeError: PropTypes.string,
};

export default CreditCardComponent;
