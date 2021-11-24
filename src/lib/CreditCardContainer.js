import React, { useState, useEffect, useRef } from "react";
import CreditCardComponent from "./CreditCardComponent";

const CreditCardContainer = () => {

  // Data
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  // Errors
  const [errorMessageArray, setErrorMessageArray] = useState([]);

  const childRef = useRef();

  useEffect(() => {
    console.log("errors: ", errorMessageArray);
  }, [errorMessageArray])

  const getCardType = (cardType) => {
    console.log("card type initials: ", cardType);
  };

  return (
    <>
    <CreditCardComponent
      ref={childRef}
      title="Card Content Here"
      numberLabel="Card Number"

      nameLabel="Name on the Card"
      dateLabel="Exp (MM / YY)"
      codeLabel="Security Code"
    
      cardNameInfo="Name of the Card Holder"
      AECodeInfo="4 digit number in the front of the card"
      nonAECodeInfo="3 digit number in the back of the card"
    
      invalidNumberError="Card number is invalid"
      invalidNameError="Card holder name is required"
      expiredCardError="Expiration date cannot be in the past"
      invalidMonthError="Month must be between 01 and 12"
      invalidDateError="Expiration date is invalid"
      AECodeError="Security code must be 4 digits"
      nonAECodeError="Security code must be 3 digits"

      cardNumber={cardNumber} setCardNumber={setCardNumber} cardHolderName={cardHolderName} 
      setCardHolderName={setCardHolderName} expirationDate={expirationDate} setExpirationDate={setExpirationDate}
      securityCode={securityCode} setSecurityCode={setSecurityCode} errorMessageArray={errorMessageArray}
      setErrorMessageArray={setErrorMessageArray} getCardType={getCardType}
    />
    <button onClick={() => childRef.current.triggerValidations()}>trigger validation!</button>
    </>
  );
};

export default CreditCardContainer;
