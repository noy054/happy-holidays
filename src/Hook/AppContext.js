import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const AppProvider = ({ children }) => {
  const [isArrived, setIsArrived] = useState(false);
  const [totalBasketsNumberLeft, setTotalBasketsNumberLeft] = useState(0);
  const [extraBasket, setExtraBasket] = useState(0);
  const [totalBasketsNumber, setTotalBasketsNumber] = useState(0);
  const [totalPepole, setTotalPepole] = useState(0);
  const [changeBasketNumber, setChangeBasketNumber] = useState(1);
  const [notComingLength, setNotComingLength] = useState(0);
  const [arrivelsLength, setArrivelsLength] = useState(0);
  const [arrivalsTableData, setArrivalsTableData] = useState([]);
  const [notComingTableData, setNotComingTableData] = useState([]);

  useEffect(() => {
    const storedState = localStorage.getItem("appState") || [];
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setIsArrived(parsedState.isArrived);
      setTotalBasketsNumberLeft(parsedState.totalBasketsNumberLeft);
      setTotalBasketsNumber(parsedState.totalBasketsNumber);
      setTotalPepole(parsedState.totalPepole);
      setArrivalsTableData(parsedState.arrivalsTableData);
      setExtraBasket(parsedState.extraBasket);
      setNotComingTableData(parsedState.notComingTableData);
      setChangeBasketNumber(parsedState.changeBasketNumber);
      setNotComingLength(parsedState.notComingLength);
      setArrivelsLength(parsedState.arrivelsLength);
    }
  }, []);

  // Update localStorage whenever state changes
  useEffect(() => {
    const stateToStore = {
      isArrived,
      totalBasketsNumberLeft,
      totalBasketsNumber,
      totalPepole,
      extraBasket,
      notComingTableData,
      arrivalsTableData,
      changeBasketNumber,
      notComingLength,
      arrivelsLength,
    };
    localStorage.setItem("appState", JSON.stringify(stateToStore));
  }, [
    isArrived,
    totalBasketsNumberLeft,
    totalBasketsNumber,
    totalPepole,
    extraBasket,
    notComingTableData,
    arrivalsTableData,
    changeBasketNumber,
    notComingLength,
    arrivelsLength,
  ]);

  const contextValues = {
    isArrived,
    setIsArrived,
    totalBasketsNumberLeft,
    setTotalBasketsNumberLeft,
    totalBasketsNumber,
    setTotalBasketsNumber,
    totalPepole,
    setTotalPepole,
    arrivalsTableData,
    setArrivalsTableData,
    extraBasket,
    setExtraBasket,
    setNotComingTableData,
    notComingTableData,
    setChangeBasketNumber,
    changeBasketNumber,
    notComingLength,
    setNotComingLength,
    arrivelsLength,
    setArrivelsLength,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
