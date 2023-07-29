import React, { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import InputComponent from "../Input/Input";
import "./Table.css";

const Table = ({ data, columns, defineRowTable }) => {
  const [filters, setFilters] = useState({
    phone: "",
    id: "",
    name: "",
  });
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    applyFilters();
  }, [filters, data]);

  const handleFilterChange = (event, columnKey) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnKey]: value,
    }));
  };

  const applyFilters = () => {
    const filteredData = data.filter((row) =>
      Object.entries(filters).every(([columnKey, filterValue]) => {
        const cellValue = String(row[columnKey]).toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      })
    );
    setFilteredData(filteredData);
  };

  const createLabel = () => {
    return columns.map((column) => (
      <th className="table-lable" key={column.key}>
        {column.label}
      </th>
    ));
  };

  const createTable = () => {
    return filteredData.map((row, index) => (
      <tr className="table-column" key={index}>
        {columns.map((column) => defineRowTable(column, row))}
      </tr>
    ));
  };

  const createFilterInput = () => {
    const filteredColumns = columns.filter(
      (column) => column.key !== "basketsNumber" && column.key !== "isArrived"
    );

    return (
      <tr className="table-filter-row">
        {filteredColumns.map((column) => (
          <td key={column.key}>
            <input
              type="text"
              value={filters[column.key] || ""}
              onChange={(event) => handleFilterChange(event, column.key)}
              placeholder={`Filter by ${column.label}`}
              className="table-filter-input"
            />
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table>
          <thead className="table-title">
            <tr>{createLabel()}</tr>
            {createFilterInput()}
          </thead>
          <tbody className="table">{createTable()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
