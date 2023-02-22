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

function Tables() {
  const { columns, rows } = authorsTableData;
  // const { columns: prCols, rows: prRows } = projectsTableData;

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
                  <SoftInput type="number" onChange={(e) => setPassword(e.target.value)} placeholder="Order Name" />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold" >
                      Order Period (in days)
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Order Period" />
                </SoftBox>
                
                <SoftBox mt={4} mb={1}>
                  <SoftButton variant="gradient" color="dark" fullWidth >
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
