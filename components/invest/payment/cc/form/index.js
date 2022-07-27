import { useState } from 'react';

const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
   const month = i + 1;
   return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

export default function CForm({
   cardMonth,
   cardYear,
   onUpdateState,
   cardNumberRef,
   cardHolderRef,
   cardDateRef,
   onCardInputFocus,
   onCardInputBlur,
   cardCvv,
   children,
}) {
   const [cardNumber, setCardNumber] = useState('');

   const handleFormChange = (event) => {
      const { name, value } = event.target;

      onUpdateState(name, value);
   };

   // TODO: We can improve the regex check with a better approach like in the card component.
   const onCardNumberChange = (event) => {
      let { value, name } = event.target;
      let cardNumber = value;
      value = value.replace(/\D/g, '');
      if (/^3[47]\d{0,13}$/.test(value)) {
         cardNumber = value
            .replace(/(\d{4})/, '$1 ')
            .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
      } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
         // diner's club, 14 digits
         cardNumber = value
            .replace(/(\d{4})/, '$1 ')
            .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
      } else if (/^\d{0,16}$/.test(value)) {
         // regular cc number, 16 digits
         cardNumber = value
            .replace(/(\d{4})/, '$1 ')
            .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
            .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
      }

      setCardNumber(cardNumber.trimRight());
      onUpdateState(name, cardNumber);
   };

   const onCvvFocus = (event) => {
      onUpdateState('isCardFlipped', true);
   };

   const onCvvBlur = (event) => {
      onUpdateState('isCardFlipped', false);
   };

   // NOTE: Currently the cursor on the card number field gets reset if we remove a number, the code bellow was used
   // in class components, need to transform this to work with functional components.
   // getSnapshotBeforeUpdate() {
   //     return this.props.cardNumberRef.current.selectionStart;
   // }

   // const componentDidUpdate = function (prevProps, prevState, cursorIdx) {
   //     const node = cardNumberRef.current;
   //     const { cardNumber: cardNum } = state;
   //     const { cardNumber: prevCardNum } = prevState;
   //     if (
   //         cardNum.length > prevCardNum.length &&
   //         cardNum[cursorIdx - 1] === ' '
   //     ) {
   //         cursorIdx += 1;
   //     } else if (prevCardNum[cursorIdx - 1] === ' ') {
   //         cursorIdx -= 1;
   //     }
   //     node.selectionStart = node.selectionEnd = cursorIdx;
   // };

   return (
      <div className="card-form">
         <div className="card-list">{children}</div>
         <div className="card-form__inner">
            <div className="card-input">
               <label
                  htmlFor="cardNumber"
                  className="card-input__label mt-4 block text-sm font-medium text-gray-700"
               >
                  Card Number
               </label>
               <input
                  type="tel"
                  name="cardNumber"
                  className="card-input__input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  autoComplete="off"
                  onChange={onCardNumberChange}
                  maxLength="19"
                  ref={cardNumberRef}
                  onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
                  onBlur={onCardInputBlur}
                  value={cardNumber}
               />
            </div>

            <div className=" card-input mt-2 block text-sm font-medium text-gray-700">
               <label htmlFor="cardName" className="card-input__label">
                  Card Holder
               </label>
               <input
                  type="text"
                  className="card-input__input  mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  autoComplete="off"
                  name="cardHolder"
                  onChange={handleFormChange}
                  ref={cardHolderRef}
                  onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
                  onBlur={onCardInputBlur}
               />
            </div>

            <div className="card-form__row mt-2 flex place-content-between">
               <div className="card-form__col">
                  <div className="card-form__group">
                     <label
                        htmlFor="cardMonth"
                        className="card-input__label block text-sm font-medium text-gray-700"
                     >
                        Expiration Date
                     </label>
                     <select
                        className="card-input__input -select rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={cardMonth}
                        name="cardMonth"
                        onChange={handleFormChange}
                        ref={cardDateRef}
                        onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                        onBlur={onCardInputBlur}
                     >
                        <option value="" disabled>
                           Month
                        </option>

                        {monthsArr.map((val, index) => (
                           <option key={index} value={val}>
                              {val}
                           </option>
                        ))}
                     </select>
                     <select
                        name="cardYear"
                        className="card-input__input -select rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={cardYear}
                        onChange={handleFormChange}
                        onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                        onBlur={onCardInputBlur}
                     >
                        <option value="" disabled>
                           Year
                        </option>

                        {yearsArr.map((val, index) => (
                           <option key={index} value={val}>
                              {val}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
               <div className="card-form__col -cvv">
                  <div className="card-input block text-sm font-medium text-gray-700">
                     <label htmlFor="cardCvv" className="card-input__label">
                        CVV
                     </label>
                     <input
                        type="tel"
                        className="card-input__input  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        maxLength="4"
                        autoComplete="off"
                        name="cardCvv"
                        onChange={handleFormChange}
                        onFocus={onCvvFocus}
                        onBlur={onCvvBlur}
                        ref={cardCvv}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
