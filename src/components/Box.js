import React, { useEffect, useState } from "react";

// Custom components
import PaymentStyle from "../styles/PaymentStyle";

export default function Box({ value, chosenValue, text }) {
  // Styles
  const payment_classes = PaymentStyle();

  // useState hooks
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (value === chosenValue) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  }, [, chosenValue]);

  return (
    <div>
      {isOpened === true && <div className={payment_classes.box}> {text} </div>}
    </div>
  );
}
