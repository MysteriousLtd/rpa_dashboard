/**
=========================================================
* RPA Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect , useState} from "react";
import { useSelector } from "react-redux";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// RPA Dashboard React components
import SoftBox from "components/SoftBox";
// import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";

// RPA Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

// const TRow=({orderno, orderp, })
// const select=useSelector(state=>state.tform.select)

function Table({ columns, rows, edit }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;
  const [trows, setTrows]=useState(rows)
  const [tcols, setTcols]=useState(columns)
  const select=useSelector(state=>state.tform.select)

  useEffect(()=>{
    setTrows(rows)
    setTcols(columns)
  },[rows, columns])
  // const [reload, setReload]=useState(true)
  // const [prevSelect, setPrevSelect]= useState(select)
  // const select = useSelector(state => state.tform.select)
  // useMemo((select)=>{
  //   if(prevSelect!==select){
  //     setPrevSelect(select)
  //     setReload(false)
  //   }
  //   else{
  //     setReload(true)
  //   }
  //   window.location.reload(reload)
  // },[select])
  
  const renderColumns = useMemo(()=>tcols.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    // if (key === 0) {
    //   pl = 3;
    //   pr = 3;
    // } else 
    if (key === tcols.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SoftBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={0.5}
        pb={0.5}
        pl={align === "left" ? pl : 0.5}
        pr={align === "right" ? pr : 0.5}
        textAlign={align}
        fontSize={size.sm}
        fontWeight={fontWeightBold}
        // variant="h4"
        color="#000"
        opacity={1} 
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SoftBox>
    );
  }),[tcols,select,edit]);

  // const reload= useCallback(()=>{
  //   window.location.reload(false);
  // }, [rows])
  // useEffect(
  //   reload()
  //   ,[rows])

  const renderRows = useMemo(()=>trows.map((row, key) => {
    const rowKey = `row-${key}`;
    const tableRow = tcols.map(({ name, align }) => {
      let template;
      if (Array.isArray(row[name])) {
        template = (
          <SoftBox
            key={name}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SoftBox text={'center'} py={0.5} px={0.5}>
              {/* <SoftBox mr={2}>
                <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </SoftBox> */}
              <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        );
      } else {
        template = (
          <SoftBox
            key={name}
            component="td"
            px={0.5}
            py={0.5}
            mb={0.5}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SoftTypography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </SoftTypography>
          </SoftBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  }),[trows, tcols,select,edit]);

  return useMemo( ()=> (
      <TableContainer>
        <MuiTable>
          <SoftBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SoftBox>
         {trows!==[{}] && <TableBody>{renderRows}</TableBody>}
        </MuiTable>
      </TableContainer>
    ),[trows,tcols, edit, select])
    }
// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
