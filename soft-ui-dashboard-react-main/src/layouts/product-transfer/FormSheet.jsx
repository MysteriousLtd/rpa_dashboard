import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import React, { useEffect, useState } from "react";
import "./main.css";

function Formsheet() {
  const clients = ['Client_Sofabed', 'Client_Jennifer', 'Client_Jennihome']
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [text, setText] = useState('')

  return (
    <div className="container-1 rounded">
      {/* <SoftBox component="form" role="form" width="full"> */}
      <FormControl fullWidth>
        <SoftBox className="form-header">
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0}>
              <SoftTypography id='selectSource' component="label" variant="caption" fontWeight="bold" >
                Source
              </SoftTypography>
            </SoftBox>

            <SoftBox mb={1} ml={0}>
              
              <Select className="rounded"
                labelId="selectSource"
                id="demo-simple-select"
                value={source}
                label="Source"
                onChange={(e) => setSource(e.target.value)}
              >
                {clients.map((client) => {
                  if (client !== destination)
                    return <MenuItem value={client} key={client}>{client}</MenuItem>
                })}
              </Select>


            </SoftBox>
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0}>
              <SoftTypography id="selectDestination" component="label" variant="caption" fontWeight="bold" >
                Destination
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1} ml={0}>
            <Select className="rounded"
                labelId="selectDestination"
                id="demo-simple-select"
                value={destination}
                // label="Source"
                onChange={(e) => setDestination(e.target.value)}
              >
                {clients.map((client) => {
                  if (client !== source)
                    return <MenuItem value={client} key={client}>{client}</MenuItem>
                })}
              </Select>
            </SoftBox>

          </SoftBox>
        </SoftBox>

        <SoftBox my={2}>
          <TextField multiline sx={{ fontSize: '14px' }} fullWidth minRows={3} onChange={(e) => setText(e.target.value)} value={text} />
        </SoftBox>

        <SoftBox my={2} width={'294px'} mx={'auto'}>
        <input  className="form-control" type="file" id="formFile"></input>
        </SoftBox>
        <SoftBox mt={2} mb={2} mx={'auto'}>
          <SoftButton variant="gradient" color="dark">
            Submit
          </SoftButton>
        </SoftBox>
        </FormControl>
      {/* </SoftBox> */}
    </div>
  );
}

export default Formsheet;