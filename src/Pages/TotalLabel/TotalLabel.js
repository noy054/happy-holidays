import React, { useCallback } from "react";
import Input from "../../Components/Input/Input";
import { useAppContext } from "../../Hook/AppContext";
import axios from "axios";

import "./TotalLabel.css";

const TotalLabel = (props) => {
  const {
    setTotalBasketsNumber,
    totalBasketsNumber,
    totalBasketsNumberLeft,
    totalPepole,
    extraBasket,
    setTotalBasketsNumberLeft,
    setExtraBasket,
    setTotalPepole,
    setNotComingTableData,
    setNotComingLength,
  } = useAppContext();

  const totalBox = [
    { id: 1, text: ":מכסת הסלים ", total: totalBasketsNumber },
    {
      id: 2,
      text: ":סלים ספייר ",
      total: extraBasket,
    },
    { id: 3, text: ":סהכ אנשים שהגיעו", total: totalPepole },
    {
      id: 4,
      text: ":סהכ סלים שחולקו",
      total: totalBasketsNumber + extraBasket - totalBasketsNumberLeft,
    },
    {
      id: 5,
      text: ":סהכ סלים נשארו לחלוקה",
      total: totalBasketsNumberLeft,
    },
  ];

  const handleTotalBasketsNumber = useCallback(
    (event) => {
      const newTotalBasketsNumber = Number(event.target.value);
      setTotalBasketsNumber(newTotalBasketsNumber);
      const newTotalBasketsNumberLeft = newTotalBasketsNumber + extraBasket;
      setTotalBasketsNumberLeft(newTotalBasketsNumberLeft);
    },
    [extraBasket]
  );

  const handelExtraBaskets = useCallback(
    (event) => {
      const newExtraBasket = Number(event.target.value);
      setExtraBasket(newExtraBasket);
      const newTotalBasketsNumberLeft = totalBasketsNumber + newExtraBasket;
      setTotalBasketsNumberLeft(newTotalBasketsNumberLeft);
    },
    [totalBasketsNumber]
  );

  const handleButtonClick = async () => {
    setTotalBasketsNumber(0);
    setExtraBasket(0);
    setTotalBasketsNumberLeft(0);
    setTotalPepole(0);

    await axios
      .delete(`${process.env.REACT_APP_BEACKEND_URL}/notComming`)
      .then((response) => {
        setNotComingTableData([]);
        setNotComingLength(0);
      });
  };

  const displayTotal = () => {
    return totalBox.map((totalProperties) => (
      <div className="total-box" key={totalProperties.id}>
        <div>
          <Input
            text={totalProperties.text}
            value={totalProperties.total}
            readOnly={totalProperties.id !== 1 && totalProperties.id !== 2}
            className={"total-input"}
            classNameForText={"total-text"}
            onChange={
              totalProperties.id === 1
                ? handleTotalBasketsNumber
                : handelExtraBaskets
            }
            onKeyPress={props.onKeyPress}
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="main-total-lable">
      <button className="new-division-button" onClick={handleButtonClick}>
        חלוקה חדשה
      </button>
      <div className="total-container">{displayTotal()}</div>
    </div>
  );
};

export default TotalLabel;
