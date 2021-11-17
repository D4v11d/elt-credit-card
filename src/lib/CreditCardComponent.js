import React, { useState } from "react";
import "./creditCardStyles.css";

const CreditCardComponent = () => {

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const [cardNumberError, setCardNumberError] = useState("");
  const [nameError, setNameError] = useState("");
  const [expirationDateError, setExpirationDateError] = useState("");
  const [securityCodeError, setSecurityCodeError] = useState("");

  const isMasterCard = new RegExp("^(?:5[1-5][0-6]{0,}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{0,}|27[01][0-9]|2720)[0-9]{0,}$");
  const isVisa = new RegExp('^4[0-9]{0,16}$');
  const isAmericanExpress = new RegExp("^3[47][0-9]{0,15}$");
  const errorMessage = ""

  const handleChangeCardNumber = (event) => {
    //delete content backward
    const cardNumber = event.target.value;
    if(event.target.validity.valid || event.target.value === "")
      setCardNumber(cardNumber);

    if(cardNumber.length === 16)
      setCardNumberError("");
    else
      setCardNumberError("Card number is invalid");
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
    handleExpiratioDateInput(date);
    handleExpirationDateValidation(date);
  }

  const handleExpiratioDateInput = (date) => {
    if(date.length === 3) {
      setExpirationDate(date.substring(0, 2) + " / " + date.substring(2));
    } else if(date.length === 5) {
      setExpirationDate(date.substring(0, 2));
    } else {
      setExpirationDate(date);
    }
  }

  const handleExpirationDateValidation = (date) => {
    if(date.length === 7) {
      const currentMonth = parseInt((new Date().getMonth() + 1).toString().substr(-2));
      const currentYear = parseInt(new Date().getFullYear().toString().substr(-2));
      let month = parseInt(date.substring(0,2));
      let year = parseInt(date.substring(5));
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
    const code = event.target.value;
    if(event.target.validity.valid || event.target.value === "")
      setSecurityCode(event.target.value);

    if(isAmericanExpress.test(cardNumber) && code.length !== 4) {
        setSecurityCodeError("Security code must be 4 digits");
        return;
    } else if(!isAmericanExpress.test(cardNumber)) {
      if(code.length !== 3) {
        setSecurityCodeError("Security code must be 3 digits");
        return;
      }
    }
    setSecurityCodeError("");
  }

  return (
    <div className="text-Container">
      <div className="ccContainer">
        <div className="ccContainerTitle">
          <div className="ccTitle">Card Content Here</div>
          <div className="cardTypes">
            <div className={`img-mc ${isMasterCard.test(cardNumber)? "ccColor" : ""}`} alt="mc"/>
            <div className={`img-vs ${isVisa.test(cardNumber)? "ccColor" : ""}`} alt="vs"/>
            <div className={`img-ae ${isAmericanExpress.test(cardNumber)? "ccColor" : ""}`} alt="ae"/>
          </div>
        </div>

        <div className="ccFormContainer">
          <div className="ccFormInput">
            <input type="text" id="cardNumber" pattern="[0-9]{0,}" 
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
              onChange={handleChangeExpirationDate} maxLength={7}/>
              <label htmlFor="cardExp">
                Exp (MM / YY)
                <span className="ccInputWarning show"> {expirationDateError}</span>
              </label>
            </div>
          </div>

          <div className="w50pr">   
            <div className="ccFormInput">
              <input type="text" pattern="[0-9]{0,}"  id="cardSecCode"
              required value={securityCode} onChange={handleChangeSecurityCode}
              maxLength={isAmericanExpress.test(cardNumber) ? 4 : 3}/>
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
