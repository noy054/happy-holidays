import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TotalLabel from "./Pages/TotalLabel/TotalLabel";
import MainTable from "./Pages/MainTable/MainTable";
import Sidebar from "./Components/Sidebar/Sidebar";
import SendingMessage from "./Pages/SendingMessage/SendingMessage";
import { useAppContext } from "./Hook/AppContext";
import Login from "./Pages/Login/Login";
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
    totalPepole,
    setTotalPepole,
    setArrivalsTableData,
    changeBasketNumber,
    setArrivelsLength,
  } = useAppContext();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleIsArrived = async (id) => {
    setTotalBasketsNumberLeft((basket) => basket - changeBasketNumber);
    setTotalPepole((men) => men + 1);
    await axios
      .delete(`${process.env.REACT_APP_BEACKEND_URL}/arrivals/${id}`)
      .then((response) => {
        setArrivalsTableData(response.data.data.customer);

        if (response.data.data.length === undefined) {
          setArrivelsLength(0);
        } else {
          setArrivelsLength(response.data.data.length);
        }
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <>
          <Sidebar items={sidebarItems} />
          <div className="total-lables">
            <TotalLabel
              totalBasketsNumberLeft={totalBasketsNumberLeft}
              totalBasketsNumber={totalBasketsNumber}
              totalPepole={totalPepole}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Routes>
            <Route
              path="/"
              element={<MainTable handleIsArrived={handleIsArrived} />}
            />
            <Route
              path="/send"
              element={
                <SendingMessage totalBasketsNumber={totalBasketsNumber} />
              }
            />
          </Routes>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};
export default App;
