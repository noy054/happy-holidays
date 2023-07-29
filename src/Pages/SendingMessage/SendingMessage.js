import React, { useCallback, useState } from "react";
import InputComponent from "../../Components/Input/Input";
import axios from "axios";
import "./SendingMessage.css";

const SendMessage = (props) => {
  const initialInputState = {
    holidaytext: "",
    date: "",
    startAt: "",
    finishAt: "",
    address: "",
  };

  const [inputValue, setInputValue] = useState({ ...initialInputState });

  const inputFields = [
    { key: "holidaytext", text: "הכנס את שם החג" },
    { key: "date", text: "הכנס את התאריך" },
    { key: "startAt", text: "הכנס  את שעת התחלה" },
    { key: "finishAt", text: "הכנס את שעת סיום" },
    { key: "address", text: "הכנס את הכתובת" },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const message = `שלום{{name}} הנך מזומן/ת לאיסוף סל מזון ל ${inputValue.holidaytext} בתאריך ${inputValue.date} משעה ${inputValue.startAt} עד השעה ${inputValue.finishAt}
  בכתובת ${inputValue.address}  לצורך האיסוף חובה לאשר הגעה, אחרת לא נוכל להבטיח את מקומך
 שימו לב: אישור הגעה חובה ותקף רק לסל אחד בלבד. החלוקה איננה בסופר אלא בכתובת המצוינת בהודעה זו`;

  const handleSumbit = async () => {
    setInputValue({ ...initialInputState });

    await axios
      .post(
        "http://127.0.0.1:3000/sendMessage",
        {
          holiday: inputValue.holidaytext,
          date: inputValue.date,
          startAt: inputValue.startAt,
          finishAt: inputValue.finishAt,
          address: inputValue.address,
          limit: props.totalBasketsNumber,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const displayInput = useCallback(() => {
    return inputFields.map((inputFiled) => (
      <div className="input-wrapper" key={inputFiled.key}>
        <InputComponent
          text={inputFiled.text}
          className={`input-${inputFiled.key}`}
          name={inputFiled.key}
          placeholder={inputFiled.text.slice(8)}
          value={inputValue[inputFiled.key]}
          onChange={handleInputChange}
        />
      </div>
    ));
  }, [inputValue]);

  return (
    <div className="form-container">
      <div className="main-message">
        <h1 className="title-for-finel-message">הודעה סופית</h1>
        <textarea
          type="text"
          value={message}
          text="הודעה סופית"
          readOnly={true}
          rows={5}
          className="finel-message"
        />
      </div>
      <div className="main-form ">
        <div className="display-input">{displayInput()}</div>
        <button className="send-details-button" onClick={handleSumbit}>
          שלח
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
