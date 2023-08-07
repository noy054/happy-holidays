import React, { useState, useEffect } from "react";
import Table from "../../Components/Table/Table";
import Combobox from "react-widgets/Combobox";
import axios from "axios";
import "react-widgets/styles.css";
import "./MainTable.css";
import openSocket from "socket.io-client";
import { useAppContext } from "../../Hook/AppContext";

const MainTable = (props) => {
  const {
    arrivalsTableData,
    notComingTableData,
    setArrivalsTableData,
    setNotComingTableData,
    setChangeBasketNumber,
    changeBasketNumber,
    notComingLength,
    setNotComingLength,
    arrivelsLength,
    setArrivelsLength,
  } = useAppContext();

  const columnForArrivelsList = [
    { key: "id", label: "תז" },
    { key: "name", label: "שם" },
    { key: "phoneNumber", label: "מספר טלפון" },
    { key: "basketsNumber", label: "מספר סלים" },
    { key: "isArrived", label: "האם הגיעו?" },
  ];

  const columnForNotCommingList = [
    { key: "id", label: "תז" },
    { key: "name", label: "שם" },
    { key: "phoneNumber", label: "מספר טלפון" },
  ];

  useEffect(() => {
    const socket = openSocket(`${process.env.REACT_APP_BEACKEND_URL}`);

    socket.on("postNewArrivel", (data) => {
      console.log(data.data[2]);
      setArrivalsTableData(data.data);
      setArrivelsLength(data.data.length);
    });

    socket.on("postNotCommingCustomer", (data) => {
      setNotComingTableData(data.data);
      setNotComingLength(data.data.length);
    });
  }, []);

  const handleChangeBasketNumber = (event) => {
    setChangeBasketNumber(event.target.value);
  };

  const defineRowTable = (column, row) => {
    if (column.key === "isArrived") {
      return (
        <td key={column.key} className="table-row">
          <button
            className="table-button"
            onClick={() => {
              props.handleIsArrived(row.id);
            }}
          >
            הגיעו
          </button>
        </td>
      );
    } else if (column.key === "basketsNumber") {
      return (
        <td key={column.key} className="table-row">
          <input
            className="table-input"
            value={changeBasketNumber}
            onChange={handleChangeBasketNumber}
          />
        </td>
      );
    } else {
      return (
        <td className="table-row" key={column.key}>
          {row[column.key]}
        </td>
      );
    }
  };

  return (
    <div className="table-container">
      <div className="tables-wrapper">
        <div className="table-wrapper">
          <Table
            data={notComingTableData}
            columns={columnForNotCommingList}
            defineRowTable={defineRowTable}
            header={`(${notComingLength}) לקוחות שלא אישרו הגעה`}
          />
        </div>
        <div className="separator"></div>
        <div className="table-wrapper">
          <Table
            data={arrivalsTableData}
            columns={columnForArrivelsList}
            defineRowTable={defineRowTable}
            header={`(${arrivelsLength}) לקוחות שאישרו הגעה`}
          />
        </div>
      </div>
    </div>
  );
};

export default MainTable;
