import React, { useCallback, useState, useContext } from "react";
import InputComponent from "../../Components/Input/Input";
import { AppContext } from "../../Hook/AppContext";
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

  const message = ` שלום {שם הלקוח}
  עמותת "משמחים ילדים רעבים" מזמינה אותך לאיסוף סל מזון ל${inputValue.holidaytext} בתאריך ${inputValue.date} משעה ${inputValue.startAt} עד השעה ${inputValue.finishAt} בסופר החינמי, בכתובת: ${inputValue.address}
  
  לצורך האיסוף חובה לאשר הגעה, אחרת לא נוכל להבטיח מקומך.
  
  :שימו לב
  .אישור ההגעה חובה ותקף לסל אחד בלבד-
  .ההודעה אישית ולא ניתנת להעברה-
  .הסל כבד, נא להגיע עם מישהו שיכול לעזור להרים את הסל לרכב-
  .חשוב להגיע בזמן, אחרת הסל יועבר למשפחה אחרת-
  .אין משלוחים-`;

  const handleSumbit = async () => {
    setInputValue({ ...initialInputState });

    await axios
      .post(
        `${process.env.REACT_APP_BEACKEND_URL}/sendMessage`,
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
