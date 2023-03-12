import React from "react";
import { useState } from "react";
import './main.css';
import TableData from './Datafile'
function getObjArray(obj) {
    const arr = []
    for (const [key, value] of Object.entries(obj)) {
      
     arr.push(<td>{value}</td>)
    }
    return (arr)
  }

function Tablesheet() {
    const [tableData, setTableData] = useState(TableData)
    console.log(tableData)

  return (
    
    <div className="container-1 rounded">
    <h2 className="table-heading">Order Table</h2>
      <table className="table rounded">
      <thead>
      <tr className="rounded">
          <th scope="col">S. No.</th>
          <th scope="col">Heading 2</th>
          <th scope="col">Heading 3</th>
          <th scope="col">Heading 4</th>
          <th scope="col">Heading 5</th>
        </tr>
      </thead>
      <tbody>
      {
        tableData.map((item) => (
        <tr key={item.id}>
          {getObjArray(item)}
        </tr>

        ))
    }
      </tbody>
      </table>
    </div>
  );
}

export default Tablesheet;