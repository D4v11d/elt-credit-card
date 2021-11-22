import React, { useState, useEffect } from "react";
import CreditCardComponent from "./CreditCardComponent";

const CreditCardContainer = () => {

  // Data
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  // Errors
  const [errorMessageArray, setErrorMessageArray] = useState([]);

  useEffect(() => {
    console.log("errors: ", errorMessageArray);
  }, [errorMessageArray])

  const getCardType = (cardType) => {
    console.log("card type initials: ", cardType);
  };

  return (
    <>
    <CreditCardComponent
      cardNumber={cardNumber} setCardNumber={setCardNumber} cardHolderName={cardHolderName} 
      setCardHolderName={setCardHolderName} expirationDate={expirationDate} setExpirationDate={setExpirationDate}
      securityCode={securityCode} setSecurityCode={setSecurityCode} errorMessageArray={errorMessageArray}
      setErrorMessageArray={setErrorMessageArray} getCardType={getCardType}
    />
    </>
  );
};

export default CreditCardContainer;
