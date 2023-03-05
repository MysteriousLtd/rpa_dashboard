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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useState } from "react";

// @mui material components
import Icon from "@mui/material/Icon";

// RPA Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

function Bill({ name, company, email, vat, noGutter }) {
  const [companyS, setCompany] = useState(company)
  const [emailS, setEmail] = useState(email)
  const [vatS, setVat] = useState(vat)
  const [edit, setEdit] = useState(false)
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </SoftTypography>

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}>
            <SoftBox mr={1}>
              <SoftButton variant="text" color="error">
                <Icon>{edit ? 'cancel' : 'delete'}</Icon>&nbsp;{edit ? 'cancel' : 'delete'}
              </SoftButton>

            </SoftBox>


            <SoftButton variant="text" color="dark"
              onClick={() => {
                setEdit(!edit)
              }}>
              <Icon>{edit ? 'update' : 'edit'}</Icon>&nbsp;{edit ? 'update' : 'edit'}
            </SoftButton>


          </SoftBox>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Company Name:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {edit ? <SoftBox mb={1}>
                <SoftInput onChange={(e) => setCompany(e.target.value)} type="email" value={companyS} />
              </SoftBox> : `${companyS}`}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {edit ? <SoftBox mb={1}>
                <SoftInput onChange={(e) => setEmail(e.target.value)} type="email" value={emailS} />
              </SoftBox> : `${emailS}`}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="caption" color="text">
          VAT Number:&nbsp;&nbsp;&nbsp;
          <SoftTypography variant="caption" fontWeight="medium">
            {edit ? <SoftBox mb={1}>
              <SoftInput onChange={(e) => setVat(e.target.value)} type="email" value={vatS} />
            </SoftBox> : `${vatS}`}
          </SoftTypography>
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
