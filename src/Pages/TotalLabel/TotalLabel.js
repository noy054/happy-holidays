import React from "react";
import Input from "../../Components/Input/Input";
import { useAppContext } from "../../Hook/AppContext";
import "./TotalLabel.css";

const TotalLabel = (props) => {
  const { totalBasketsNumberLeft, totalBasketsNumber, totalPepole } =
    useAppContext();
  const totalBox = [
    { id: 1, text: ":סהכ סלים ", total: totalBasketsNumber },
    { id: 2, text: ":סהכ אנשים שהגיעו", total: totalPepole },
    {
      id: 3,
      text: ":סהכ סלים נשארו לחלוקה",
      total: totalBasketsNumberLeft,
    },
  ];

  const displayTotal = () => {
    return totalBox.map((totalProperties) => (
      <div className="total-box" key={totalProperties.id}>
        <div>
          <Input
            text={totalProperties.text}
            value={totalProperties.total}
            readOnly={totalProperties.id !== 1}
            className={"total-input"}
            classNameForText={"total-text"}
            onChange={props.handleTotalBasketsNumber}
            onKeyPress={props.onKeyPress}
          />
        </div>
      </div>
    ));
  };

  return <div className="total-container">{displayTotal()}</div>;
};

export default TotalLabel;
