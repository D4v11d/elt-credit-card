import React from "react";
import "./creditCardStyles.css";

const CreditCardComponent = () => {
  return (
    <div className="text-Container">
      <div className="ccContainer">
        <div className="ccContainerTitle">
          <div className="ccTitle">Card Content Here</div>
          <div className="cardTypes">
            <div className="img-mc ccColor" alt="mc"/>
            <div className="img-vs ccColor" alt="vs"/>
            <div className="img-ae ccColor" alt="ae"/>
          </div>
        </div>

        <div className="ccFormContainer">
          <div className="ccFormInput">
            <input type="text" id="cardNumber" required />
            <label htmlFor="cardNumber">
              Card Number
              <span className="ccInputWarning show">* This is a Warning</span>
            </label>
          </div>

          <div className="ccFormInput">
            <input type="text" id="cardName" required />
            <label htmlFor="cardName">
              Name on the Card
              <span className="ccInputWarning show">* This is a Warning</span>
            </label>
            <div className="ccFormInfoMark">?</div>
            <div className="ccFormInfo">Name of the Card Holder</div>
          </div>

          <div className="w50pl">
            <div className="ccFormInput">
              <input type="text" id="cardExp" required />
              <label htmlFor="cardExp">
                Exp (MM / YY)
                <span className="ccInputWarning show">* This is a Warning</span>
              </label>
            </div>
          </div>

          <div className="w50pr">
            <div className="ccFormInput">
              <input type="text" id="cardSecCode" required />
              <label htmlFor="cardSecCode">
                Security Code
                <span className="ccInputWarning show">* This is a Warning</span>
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
