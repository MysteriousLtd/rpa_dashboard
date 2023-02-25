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
import axios from "axios";
// Mysterious Tech Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// Mysterious Tech Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { fetchTableData , postOrder } from "../../store/TableSlice";

function Tables() {
  const { columns, rows } = authorsTableData;
  const [orderno, setOrderno] = useState('');
  const [orderp, setOrderp] = useState('');
  const table=useSelector(state=>state.table.tableData)
  // const { columns: prCols, rows: prRows } = projectsTableData;
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchTableData())
    console.log(table)
  },[])

  const placeOrder = async () => {
    const article = {
      "ClientID": "Client_Sofabed",
      "OrderNumber": orderno,
      "OrderPeriod": orderp,
      "OrderCreatedBy": "TEST"
    };
    dispatch(postOrder(article))

    // const headers = { 
    //     'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJhZG1pbiIsImlhdCI6MTY3NzI2MDYzOCwiZXhwIjoxNjc3MjY0MjM4fQ.2k3DXrUW0EhTXnWMIVcSd8EbxtYCcCV3ejFQimpoTlA',
    //     'content-type': 'application/json'
    // };

    // await axios.post('http://34.235.34.12:7001/api/v1/orders/guardian', article, { headers })
    //     .then(response => console.log({ msgId: response.data })).catch(error => {
    //         // this.setState({ errorMessage: error.message });
    //         console.error('There was an error!', error);
    //     });

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
                  <SoftInput type="text" value={orderp} onChange={(e) => setOrderp(e.target.value)} placeholder="Order Period" />
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
              <Table columns={columns} rows={rows} />
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

export default Tables;
