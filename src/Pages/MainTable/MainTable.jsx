import React, { useState, useEffect } from "react";
import Table from "../../Components/Table/Table";
import Button from "../../Components/Button/Button";
import InputComponent from "../../Components/Input/Input";
import Combobox from "react-widgets/Combobox";

import axios from "axios";
import "react-widgets/styles.css";
import "./MainTable.css";

const MainTable = (props) => {
  const [selectedTable, setSelectedTable] = useState("main");

  const [columns, setColumns] = useState([]);

  const comboboxData = ["main", "arrivals", "waiting"];

  const handleChangeTable = (value) => {
    setSelectedTable(value);
  };

  const fetchData = async () => {
    const response = await axios
      .get(`http://127.0.0.1:3000/${selectedTable}`)
      .then((response) => {
        props.setTableData(response.data.data.customer);

        const extractedColumns = Object.keys(
          response.data.data.customer[0]
        ).map((key) => ({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
        }));

        setColumns(extractedColumns);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
          <InputComponent placeholder={row[column.key]} />
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

  useEffect(() => {
    fetchData();
  }, [selectedTable]);

  return (
    <div className="table-container">
      <div className="combo-box-container">
        <Combobox
          dropUp
          data={comboboxData}
          textField="Table Type"
          onChange={(value) => handleChangeTable(value)}
          defaultValue="main"
        />
      </div>
      <div className="table-wrapper">
        <Table
          data={props.tableData}
          columns={columns}
          defineRowTable={defineRowTable}
        />
      </div>
    </div>
  );
};

export default MainTable;
