import React, { useState } from "react";
import "./creditCardStyles.css";

const CreditCardComponent = () => {

  // Data
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  // Errors
  const [cardNumberError, setCardNumberError] = useState("");
  const [nameError, setNameError] = useState("");
  const [expirationDateError, setExpirationDateError] = useState("");
  const [securityCodeError, setSecurityCodeError] = useState("");

  // Regular expressions
  const isMasterCardRegExp = new RegExp("^(?:5[1-5][0-6]{0,}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{0,}|27[01][0-9]|2720)[0-9]{0,}$");
  const isVisaRegExp = new RegExp('^4[0-9]{0,16}$');
  const isAmericanExpressRegExp = new RegExp("^3[47][0-9]{0,15}$");

  // Card types
  const [isMasterCard, setIsMasterCard] = useState(false);
  const [isVisa, setIsVisa] = useState(false);
  const [isAmericanExpress, setIsAmericanExpress] = useState(false);

  const errorMessage = "";

  const handleChangeCardNumber = (event) => {
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
      setCardNumber(formattedCardNumber);
    }
      
    // validate card number length
    if(isAmericanExpress && formattedCardNumber.length === 17)
      setCardNumberError("");
    else if(!isAmericanExpress && formattedCardNumber.length === 19) {
      setCardNumberError("");
    } else {
      setCardNumberError("Card number is invalid");
    }
    
    handleSecurityCodeValidation(securityCode.length);
  }

  const handleChangeCardHolderName = (event) => {
    const name = event.target.value;
    setCardHolderName(name);
    if(name === "") {
      setNameError("Card holder name is required");
    } else {
      setNameError("");
    }
  }

  const handleChangeExpirationDate = (event) => {
    const date = event.target.value;
    let formattedDate = date.replace(/[^\d]/g, '').replace(/([0-9]{2})(\d{2})/g, '$1 / $2').substring(0,7).trim();
    setExpirationDate(formattedDate);
    handleExpirationDateValidation(formattedDate);
  }


  const handleExpirationDateValidation = (date) => {
    if(date.length === 7) {
      const currentMonth = parseInt((new Date().getMonth() + 1).toString().substr(-2));
      const currentYear = parseInt(new Date().getFullYear().toString().substr(-2));
      let month = parseInt(date.substring(0,2));
      let year = parseInt(date.substring(5));
      console.log('month: ', month)
      console.log('year: ', year)
      if(month > 0 && month <= 12) {
        if(year > currentYear) {
          setExpirationDateError(""); 
        } else if(year === currentYear) {
          if(month >= currentMonth) {
            setExpirationDateError("");
          } else {
            setExpirationDateError("Expiration date cannot be in the past"); 
          }       
        } else {
          setExpirationDateError("Expiration date cannot be in the past"); 
        }
      } else {
        setExpirationDateError("Month must be between 01 and 12");
      }
    } else {
      setExpirationDateError("Expiration date is invalid");
    }
  }

  const handleChangeSecurityCode = (event) => {
    let code = event.target.value;

    if(event.target.validity.valid || code === "") {
      code = isAmericanExpress ? code = code.substring(0,4) : code = code.substring(0,3);  
      setSecurityCode(code);
    }

    handleSecurityCodeValidation(code.length);
  }

  const handleSecurityCodeValidation = (codeLength) => {
    if(isAmericanExpress && codeLength !== 4) {
      setSecurityCodeError("Security code must be 4 digits");
      return;
    } else if(!isAmericanExpress) {
      if(codeLength !== 3) {
        setSecurityCodeError("Security code must be 3 digits");
        return;
      }
    }
    setSecurityCodeError("");
  }

  const getErrorMessage = () => {
    return errorMessage;
  }

  const getCardType = () => {
    if(isMasterCard.test(cardNumber)) {
      return "mc";
    } else if (isVisa.test(cardNumber)) {
      return "vs";
    } else {
      return "ae";
    }
  }

  return (
    <div className="text-Container">
      <div className="ccContainer">
        <div className="ccContainerTitle">
          <div className="ccTitle">Card Content Here</div>
          <div className="cardTypes">
            <div className={`img-mc ${isMasterCard? "ccColor" : ""}`} alt="mc"/>
            <div className={`img-vs ${isVisa? "ccColor" : ""}`} alt="vs"/>
            <div className={`img-ae ${isAmericanExpress? "ccColor" : ""}`} alt="ae"/>
          </div>
        </div>

        <div className="ccFormContainer">
          <div className="ccFormInput">
            <input type="text" id="cardNumber" 
            required value={cardNumber} onChange={handleChangeCardNumber}/>
            <label htmlFor="cardNumber">
              Card Number
              <span className="ccInputWarning show">{cardNumberError}</span>
            </label>
          </div>

          <div className="ccFormInput">
            <input type="text" id="cardName" required value={cardHolderName} onChange={handleChangeCardHolderName}/>
            <label htmlFor="cardName">
              Name on the Card
              <span className="ccInputWarning show">{nameError}</span>
            </label>
            <div className="ccFormInfoMark">?</div>
            <div className="ccFormInfo">Name of the Card Holder</div>
          </div>

          <div className="w50pl">
            <div className="ccFormInput">
              <input type="text" id="cardExp" required value={expirationDate} 
              onChange={handleChangeExpirationDate}/>
              <label htmlFor="cardExp">
                Exp (MM / YY)
                <span className="ccInputWarning show"> {expirationDateError}</span>
              </label>
            </div>
          </div>

          <div className="w50pr">   
            <div className="ccFormInput">
              <input type="text" pattern="[0-9]{0,}"  id="cardSecCode" required
              value={securityCode} onChange={handleChangeSecurityCode}/>
              <label htmlFor="cardSecCode">
                Security Code
                <span className="ccInputWarning show"> {securityCodeError}</span>
              </label>
              <div className="ccFormInfoMark">?</div>
              <div className="ccFormInfo">
                3 Digit number in the back of the card
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardComponent;
