import React, { useCallback, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TotalLabel from "./Pages/TotalLabel/TotalLabel";
import MainTable from "./Pages/MainTable/MainTable";
import Sidebar from "./Components/Sidebar/Sidebar";
import SendingMessage from "./Pages/SendingMessage/SendingMessage";
import { AppContext, useAppContext } from "./Hook/AppContext";
import axios from "axios";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/fontawesome-free-solid";

const sidebarItems = [
  {
    link: "/",
    icon: <FontAwesomeIcon icon="fa-solid fa-bars" />,
    text: "מידע",
  },
  {
    link: "/send",
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    text: "שלח הודעה",
  },
];

const App = () => {
  const {
    totalBasketsNumberLeft,
    setTotalBasketsNumberLeft,
    totalBasketsNumber,
    setTotalBasketsNumber,
    totalPepole,
    setTotalPepole,
    tableData,
    setTableData,
  } = useAppContext();

  const handleIsArrived = async (id) => {
    setTotalBasketsNumberLeft((basket) => basket - 1);
    setTotalPepole((men) => men + 1);
    await axios
      .delete(`http://127.0.0.1:3000/arrivals/${id}`)
      .then((response) => {
        setTableData(response.data.data.customer);
      });
  };

  const handleTotalBasketsNumber = useCallback(
    (event) => {
      setTotalBasketsNumber(event.target.value);
      setTotalBasketsNumberLeft(event.target.value);
    },
    [totalBasketsNumber]
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <div className="app-container">
      <Sidebar items={sidebarItems} />
      <div className="total-lables">
        <TotalLabel
          totalBasketsNumberLeft={totalBasketsNumberLeft}
          totalBasketsNumber={totalBasketsNumber}
          totalPepole={totalPepole}
          handleTotalBasketsNumber={handleTotalBasketsNumber}
          onKeyPress={handleKeyPress}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <MainTable
              handleIsArrived={handleIsArrived}
              tableData={tableData}
              setTableData={setTableData}
            />
          }
        />
        <Route
          path="/send"
          element={<SendingMessage totalBasketsNumber={totalBasketsNumber} />}
        />
      </Routes>
    </div>
  );
};
export default App;
