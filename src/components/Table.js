import React from "react";
import { render } from "react-dom";
import "./table.css"

class Table extends React.Component {
  state = {
    table: [],
    checked: []
  };

  componentDidMount() {
    this.fetchData();
  };

  fetchData() {
    let that = this;
    fetch(
      "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json"
    )
      .then((response) => response.json())
      .then(function (data) {
        let table = that.state.table;
        table = data;
        that.setState({ table });
      })
      .catch((error) => console.log(error));
  };

  totalRows = () => {
    const table = this.state.table;
    return table.length;
  };

  totalCheckedRows = () => {
    const checked = this.state.checked;
    return checked.length;
  };

  totalSum = () => {
    const table = this.state.table;
    return table.reduce(function (a, b) {
      return a + Number(b.balance);
    }, 0);
  };

  totalCheckedSum = () => {
    const table = this.state.table;
    const checked = this.state.checked;
    const checkedItems = checked.map((item) => table[item]);
    return checkedItems.reduce(function (a, b) {
      return a + Number(b.balance);
    }, 0);
  };

  addRow = (row) => {
    const table = this.state.table;
    table.push(row);
    this.setState({ table });
  };

  removeLastRow = () => {
    const table = this.state.table;
    table.pop();
    this.setState({ table });
  };

  handleCheckboxChange = (event) => {
    let checked = this.state.checked;
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    checked = updatedList;
    this.setState({ checked });
    console.log(checked);
  };

  render() {
    const rows = this.state.table;

    return (
      
      <div>
        <table align="center">
          <thead>
            <tr>
              <td></td>
              <td>Creditor</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Min Pay%</td>
              <td>Balance</td>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <TableRow
                row={row}
                handleCheckboxChange={this.handleCheckboxChange}
                index={i}
                key={i}
              />
            ))}
          </tbody>
        </table >
        <table align="center">
          <tbody>
            <tr>
              <td>Total Row Count</td>
              <td>{this.totalRows()}</td>
            </tr>
            <tr>
              <td>Total </td>
              <td>{this.totalSum()}</td>
            </tr>
            <tr>
              <td>Total Checked</td>
              <td>{this.totalCheckedRows()}</td>
            </tr>
            <tr>
              <td>Checked Row Count</td>
              <td>{this.totalCheckedSum()}</td>
            </tr>
          </tbody>
        </table>
        <AddRowButton addRow={this.addRow} />
        <RemoveLastRowButton removeLastRow={this.removeLastRow} />
      </div>
    );
  }
}

const TableRow = ({ row, handleCheckboxChange, index }) => (
  <tr>
    <td>
      <input type="checkbox" value={index} onChange={handleCheckboxChange} />
    </td>
    {Object.values(row).map((val, i) => i !== 0 && <td key={i}>{val}</td>)}
  </tr>
);

const AddRowButton = ({ addRow }) => (
  <button
    onClick={() =>
      addRow({
        id: 4,
        creditorName: "CBNA",
        firstName: "Suman",
        lastName: "Tester79",
        minPaymentPercentage: 2.0,
        balance: 100.0
      })
    }
  >
    ADD DEBT
  </button>
);

const RemoveLastRowButton = ({ removeLastRow }) => (
  <button onClick={() => removeLastRow()}>REMOVE DEBT</button>
);

render(<Table />, document.getElementById("root"));

export default Table;