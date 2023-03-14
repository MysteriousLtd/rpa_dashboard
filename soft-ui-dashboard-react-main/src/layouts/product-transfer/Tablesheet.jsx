import React from "react";
import { useState } from "react";
import './main.css';
import TableData from './Datafile';
import SoftBox from "components/SoftBox";
import { Tab, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import SoftTypography from "components/SoftTypography";
function getObjArray(obj) {
  const arr = []
  for (const [key, value] of Object.entries(obj)) {
    // if(key==='id') continue;
    arr.push(<td>{value}</td>)
  }
  return (arr)
}

function Tablesheet() {
  const [tableData, setTableData] = useState(TableData)
  console.log(tableData)

  return (
    <SoftBox my={2}>
      <div className="container-1 rounded">
    <SoftBox mx={'auto'}>
              <h2 className="table-heading">{tableData.title}</h2>
    </SoftBox>
        <TableContainer>
          <Table>
            <SoftBox component="thead">
              <tr>{tableData.cols.map((col) => <th key={col} scope="col">
                <SoftBox
                  component="th"
                  fontSize="medium"
                  fontWeight={'fontWeightBold'}
                  
                  // variant="h4"
                  color="#000"
                  opacity={1}
                >
                  {col}</SoftBox>
              </th>)}</tr>
            </SoftBox>
            <TableBody>
              {
                tableData.data.map((item) => (
                 
                    <SoftBox align='center'
                    key={item.id}
                  component="tr"
                  fontSize="medium"
                  fontWeight={'fontWeightBold'}
                  // variant="h4"
                  color="#000"
                  opacity={1}
                >
                    {
                      getObjArray(item).map((data) => <td key={data}>
                        <SoftTypography variant="subtitle2" color="dark" mx={1}>
                          {data}
                        </SoftTypography>
                      </td>)
                    }</SoftBox>
                  
                ))
              }
            </TableBody>
          </Table></TableContainer>

      </div></SoftBox>
  );
}

export default Tablesheet;