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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// RPA Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
// import SoftInput from "components/SoftInput";
// import SoftBadge from "components/SoftBadge";


// RPA Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import PropTypes from 'prop-types'

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventoryData, updateVendor } from "../../store/inventorySlice";
import { TFormActions } from "store/TForm";
import { TextField } from "@mui/material";


function VendorName({ name, edit }) {
  if (edit) {
    const [torderno, setTOrderno] = useState(name);
    const dispatch = useDispatch()
    useEffect(() => { dispatch(TFormActions.setInput1(torderno)) }, [torderno])
    // <SoftBox mb={0}>
    //   <SoftInput type="text" value={torderno} onChange={(e) => setTOrderno(e.target.value)} />
    // </SoftBox>
    return (<TextField multiline sx={{ fontSize: '14px'}}  minRows={3} onChange={(e) => setTOrderno(e.target.value)} value={torderno} />)
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={0} py={0} sx={{maxWidth: '175px'}}>
        {/* <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox> */}
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="subtitle2" fontWeight="medium">
            {name}
          </SoftTypography>
          {/* <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography> */}
        </SoftBox>
      </SoftBox>
    );
  }

}

VendorName.propTypes = {
  name: PropTypes.string,
  edit: PropTypes.bool,
  //  email:PropTypes.string
}

function Vendorsku({ vendorsku, edit }) {

  if (edit) {
    const dispatch = useDispatch()
    const [torderp, setTOrderp] = useState(vendorsku);
    useEffect(() => {
      dispatch(TFormActions.setInput2(torderp))
    }, [torderp])
    return <TextField multiline sx={{ fontSize: '14px',maxWidth: '175px'}} minRows={2} onChange={(e) => setTOrderp(e.target.value)} value={torderp} />
  } else {
    return (
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="subtitile2" fontWeight="medium" color="dark">
          {vendorsku} &nbsp;
          {/* <SoftTypography variant="caption" color="secondary">
          days
        </SoftTypography> */}
        </SoftTypography>
      </SoftBox>
    );
  }
}
Vendorsku.propTypes = {
  vendorsku: PropTypes.string,
  edit: PropTypes.bool,
}

function TimeStamp({ date }) {
  return (
    <SoftBox display="flex" flexDirection="column"  px={0} py={0}>
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {date}
      </SoftTypography>
      {/* <SoftTypography variant="caption" color="secondary">
        {time}
      </SoftTypography> */}
    </SoftBox>
  );
}
TimeStamp.propTypes = {
  date: PropTypes.string,
  // time: PropTypes.string
}

function InventoryTable() {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false)
  const [eIndex, setEIndex] = useState(null)

  const isPosted = useSelector(state => state.inventory.isPosted)
  const clientid = useSelector(state => state.tform.select)

  useEffect(() => {
    dispatch(fetchInventoryData(clientid))
  }, [isPosted, clientid])
  const table = useSelector(state => state.inventory.inventoryData)
  // const table=useSelector(state=>state.table.tableData)
  // const { columns: prCols, rows: prRows } = projectsTableData;

  // const isPosted = useSelector(state => state.table.isPosted)
  const update = psku => {
    dispatch(updateVendor(psku))
  }

  const inventoryTableData = {
    columns: [
      { name: "product ids", align: "center" },
      { name: "product name and sku", align: "center" },
      { name: "vendor name", align: "center" },
      { name: "vendor sku", align: "center" },
      { name: "modified by", align: "center" },
      { name: "", align: "center" },

    ],

    rows: table !== null ? table.map((row, index) => {

      return {
        'product ids': (
          <SoftBox display="flex" flexDirection="column"  mb={1} px={0} py={0}>
            <SoftTypography variant="subtitle2" color="dark" fontWeight="medium">
              {row.productid+'\n'}
            </SoftTypography>
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {row.variantid}
            </SoftTypography>
            </SoftBox>

        ),

        'product name and sku': (
          <SoftBox display="flex" flexDirection="column" sx={{maxWidth: '200px'}} mb={1} px={0} py={0}>
            <SoftTypography variant="subtitle2" color='dark' fontWeight='medium' >
              {row.productname}
              </SoftTypography>
            <SoftTypography variant="caption" color="secondary" fontWeight="regular">
            {/* [false,"light","regular","medium","bold"] */}
            {row.productsku}
          </SoftTypography>
          </SoftBox>
        ),
        
        'vendor name': <VendorName name={row.vendorname} mb={1} edit={edit && eIndex === index} />
        ,
        'vendor sku': <Vendorsku vendorsku={row.vendorsku} mb={1} edit={edit && eIndex === index} />

        ,
        'modified by': (
          <SoftBox display="flex" flexDirection="column" px={0} py={0}>
            <SoftTypography variant="caption" color="dark" fontWeight="medium">
            {row.modified_by}
          </SoftTypography>
          <SoftTypography variant="caption" color="dark" fontWeight="regular">
            {new Date(row.modified_at).toLocaleDateString()}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary" fontWeight="light">
            {new Date(row.modified_at).toLocaleTimeString()}
          </SoftTypography>
          </SoftBox>
          ),
        "": (<SoftBox
          display="flex"
          alignItems="center"

          my={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}>

          {(edit && index === eIndex) && (<SoftBox mr={1}><SoftButton variant="text" color="error"
            onClick={() => {
              setEdit(false)
              setEIndex(null)
              // setTOrderno('');
              // setTOrderp(null);
            }}>
            <Icon> cancel </Icon>
          </SoftButton></SoftBox>)}

          <SoftButton variant="text" color="dark" disabled={edit && index !== eIndex}
            onClick={() => {
              if (edit) {
                setEdit(false)
                setEIndex(null)
                update(row.productsku)
              }
              else {
                setEdit(true)
                setEIndex(index)
                // setupid(row.productsku)
                dispatch(TFormActions.setInput1(row.vendorname));
                dispatch(TFormActions.setInput2(row.vendorsku));
                // setTOrderp(row.vendorsku)
              }
            }}>
            <Icon>{edit && index === eIndex ? 'update' : 'edit'}</Icon>
          </SoftButton>


        </SoftBox>)
      }
    }
    ) : [{}]

  };

  const { columns, rows } = inventoryTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar show={true} />
      <SoftBox py={1}>
        <SoftBox mb={1}>
          <Card>
            <SoftBox display="flex" justifyContent="space-around" alignItems="center" p={3}>
              <SoftTypography variant="h5">Inventory Table</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} edit={edit} select={clientid} />
            </SoftBox>
          </Card>
        </SoftBox>

        {/* <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Projects table</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </SoftBox>
        </Card> */}
      </SoftBox>


      <Footer />
    </DashboardLayout>
  );
}

export default InventoryTable;
