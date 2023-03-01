/**
=========================================================
* Mysterious Tech Dashboard React - v4.0.0
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
// Mysterious Tech Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";


// Mysterious Tech Dashboard React examples
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
import { fetchInventoryData  } from "../../store/inventorySlice";


function OrderNumber({ number }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      {/* <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox> */}
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {number}
        </SoftTypography>
        {/* <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography> */}
      </SoftBox>
    </SoftBox>
  );
}

OrderNumber.propTypes = {
  number: PropTypes.string,
  //  email:PropTypes.string
}

function Period({ period }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {period} &nbsp;
        {/* <SoftTypography variant="caption" color="secondary">
          days
        </SoftTypography> */}
      </SoftTypography>
    </SoftBox>
  );
}
Period.propTypes = {
  period: PropTypes.string
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

const Row = () => {

}


function InventoryTable() {
  const dispatch = useDispatch();
  const isPosted = useSelector(state => state.inventory.isPosted)
  const [edit, setEdit] = useState(false)
  const [orderno, setOrderno] = useState('');
  const [orderp, setOrderp] = useState('');
  const [torderno, setTOrderno] = useState('');
  const [torderp, setTOrderp] = useState('');
  const [eIndex, setEIndex] = useState(null);
  const user = useSelector(state => state.loginState.user)

useEffect(() => {
    dispatch(fetchInventoryData())
  },[isPosted])  
  const table = useSelector(state => state.inventory.inventoryData)
  // const table=useSelector(state=>state.table.tableData)
  // const { columns: prCols, rows: prRows } = projectsTableData;
  
  // const isPosted = useSelector(state => state.table.isPosted)
  

  const ordersTableData = {
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
        'vendorname': (eIndex !== null && index === eIndex) ? (<SoftBox mb={1}>

          <SoftInput type="text" value={torderno} />

        </SoftBox>) : <OrderNumber number={row.vendorname} />
        ,
        'vendorsku': (eIndex !== null && index === eIndex) ? (<SoftBox mb={1}>

          <SoftInput onChange={(e) => setTOrderp(e.target.value)} type="text" value={torderp} />

        </SoftBox>) : <Period period={row.vendorsku} />

        ,
        'modifiedby':( 
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {row.modified_by}
          </SoftTypography>),
        "": (<SoftBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}>

          {eIndex === index && (<SoftBox mr={1}><SoftButton variant="text" color="error"
            onClick={() => {
              setEdit(false)
              setEIndex(null)
              setTOrderno('');
              setTOrderp(null);
            }}>
            <Icon> cancel </Icon>
          </SoftButton></SoftBox>)}

          <SoftButton variant="text" color="dark"
            onClick={() => {

              if (edit) {
                setEdit(false)
                setEIndex(null)
                setTOrderno('');
                setTOrderp(null);
                // dispatch(updateOrder({}))
              }
              else {
                setEdit(true)
                setEIndex(index)
                setTOrderno(row.vendorname);
                setTOrderp(row.vendorsku)
              }

            }}>
            <Icon>{eIndex === index ? 'update' : 'edit'}</Icon>
          </SoftButton>


        </SoftBox>)
      }
    }
    ) : [{}]

  };

  const { columns, rows } = ordersTableData;


  const placeOrder = async () => {
    const article = {
      "ClientID": "Client_Sofabed",
      "OrderNumber": orderno,
      "OrderPeriod": orderp,
      "OrderCreatedBy": `${user.displayName}`
    };
    dispatch(postOrder(article))
    setOrderno('');
    setOrderp('');
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={4} pb={3} px={3}>
              <SoftBox component="form" role="form" >
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold" >
                      Order Name
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput type="text" value={orderno} onChange={(e) => setOrderno(e.target.value)} placeholder="Order Name" />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold" >
                      Order Period (in days)
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput type="number" value={orderp} onChange={(e) => setOrderp(e.target.value)} placeholder="Order Period" />
                </SoftBox>

                <SoftBox mt={4} mb={1}>
                  <SoftButton variant="gradient" color="dark" fullWidth onClick={placeOrder} disabled={(orderno === "" || orderp === '')}>
                    Place Order
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>

        </SoftBox>
      </SoftBox>


      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Orders table</SoftTypography>
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
              <Table columns={columns} rows={rows} edit={edit} />
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
