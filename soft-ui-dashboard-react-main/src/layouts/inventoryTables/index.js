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
import SoftInput from "components/SoftInput";
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


function VendorName({ name, edit }) {
  if (edit) {
    const [torderno, setTOrderno] = useState(name);
    const dispatch = useDispatch()
    useEffect(() => { dispatch(TFormActions.setInput1(torderno)) }, [torderno])
    return (<SoftBox mb={0}>
      <SoftInput type="text" value={torderno} onChange={(e) => setTOrderno(e.target.value)} />
    </SoftBox>)
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        {/* <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox> */}
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
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
    return <SoftBox mb={1}>
      <SoftInput onChange={(e) => setTOrderp(e.target.value)} type="text" value={torderp} />
    </SoftBox>
  } else {
    return (
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="caption" fontWeight="medium" color="text">
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
    <SoftBox display="flex" flexDirection="column" px={1} py={0}>
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
      { name: "productid", align: "center" },
      { name: "variantid", align: "center" },
      { name: "productname", align: "center" },
      { name: "productsku", align: "center" },
      { name: "vendorname", align: "center" },
      { name: "vendorsku", align: "center" },
      { name: "modifiedby", align: "center" },
      { name: "", align: "center" },

    ],

    rows: table !== null ? table.map((row, index) => {

      return {
        'productid': (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {row.productid}
          </SoftTypography>
        ),
        'variantid': (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {row.variantid}
          </SoftTypography>),

        'productname': <SoftTypography variant="caption" fontWeight='regular' >{row.productname}</SoftTypography>
        ,
        'productsku': (
          <SoftTypography variant="caption" color="secondary" fontWeight="light">
            {/* [false,"light","regular","medium","bold"] */}
            {row.productsku}
          </SoftTypography>
        ),
        'vendorname': <VendorName name={row.vendorname} edit={edit && eIndex === index} />
        ,
        'vendorsku': <Vendorsku vendorsku={row.vendorsku} edit={edit && eIndex === index} />

        ,
        'modifiedby': (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {row.modified_by}
          </SoftTypography>),
        "": (<SoftBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
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
                dispatch(TFormActions.setInput2(row.vendorname));
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
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Inventory Table</SoftTypography>
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
