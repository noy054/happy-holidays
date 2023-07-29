import React, { createContext, useContext, useState } from "react";

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
  const [totalBasketsNumber, setTotalBasketsNumber] = useState(0);
  const [totalPepole, setTotalPepole] = useState(0);
  const [tableData, setTableData] = useState([]);

  const contextValues = {
    isArrived,
    setIsArrived,
    totalBasketsNumberLeft,
    setTotalBasketsNumberLeft,
    totalBasketsNumber,
    setTotalBasketsNumber,
    totalPepole,
    setTotalPepole,
    tableData,
    setTableData,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
