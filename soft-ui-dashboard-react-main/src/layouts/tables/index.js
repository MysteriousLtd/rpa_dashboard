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
import { fetchTableData, postOrder, updateOrder } from "../../store/TableSlice";
import { TFormActions } from "store/TForm";


function OrderNumber({ number, edit }) {

  if (edit) {
    const [torderno, setTOrderno] = useState(number);
    const dispatch = useDispatch()
    useEffect(() => { dispatch(TFormActions.setInput1(torderno)) }, [torderno])
    return ((<SoftBox mb={0}>
      <SoftInput type="text" value={torderno} onChange={(e) => { setTOrderno(e.target.value); }} />
    </SoftBox>))
  } else {
    return (<SoftBox display="flex" alignItems="center" px={1} py={0.5}>
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
}

OrderNumber.propTypes = {
  edit: PropTypes.bool,
  number: PropTypes.string,
  //  email:PropTypes.string
}

function Period({ period, edit }) {
  if (edit) {
    const [torderp, setTOrderp] = useState(period)
    const dispatch = useDispatch();
    useEffect(() => { dispatch(TFormActions.setInput2(torderp)) }, [torderp])
    return (<SoftBox mb={0}>
      <SoftInput onChange={(e) => setTOrderp(e.target.value)} type="number" value={torderp} />
    </SoftBox>)
  } else {
    return (<SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {period} &nbsp;
        <SoftTypography variant="caption" color="secondary">
          days
        </SoftTypography>
      </SoftTypography>
    </SoftBox>
    );
  }
}

Period.propTypes = {
  edit: PropTypes.bool,
  period: PropTypes.string
}

function TimeStamp({ date, time }) {
  return (
    <SoftBox display="flex" flexDirection="column" px={1} py={0}>
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {date}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {time}
      </SoftTypography>
    </SoftBox>
  );
}
TimeStamp.propTypes = {
  date: PropTypes.string,
  time: PropTypes.string
}


function Tables() {
  const [edit, setEdit] = useState(false);
  // const [torderno, setTOrderno]=useState('');
  // const [torderp, setTOrderp] = useState('')
  const [orderno, setOrderno] = useState('');
  const [orderp, setOrderp] = useState('');
  const [eIndex, setEIndex] = useState(null);
  const user = useSelector(state => state.loginState.user)

  // const table=useSelector(state=>state.table.tableData)
  // const { columns: prCols, rows: prRows } = projectsTableData;
  const dispatch = useDispatch();
  const isPosted = useSelector(state => state.table.isPosted)
  const select = useSelector(state => state.tform.select)
  // const [inp1, setinp1] = useState(useSelector(state => state.tform.input1))
  console.log(select)
  
  useEffect(() => {
    dispatch(fetchTableData())
    // table= useSelector(state => state.table.tableData)
  }, [isPosted, select])
  const table= useSelector(state => state.table.tableData)

  
  useEffect(()=>{
    console.log(table)
  },[table])
   

  const update = ordernum => {

    // let inp1=useSelector(state=>state.tform.input1)
    // console.log( ordernum); 
    dispatch(updateOrder(ordernum));
    setEIndex(null)
  }



  const ordersTableData = {
    columns: [
      { name: "number", align: "left" },
      { name: "period", align: "left" },
      { name: "status", align: "center" },
      { name: "remark", align: "center" },
      { name: "created by", align: "center" },
      { name: "timestamp", align: "center" },
      { name: "", align: "center" },

    ],
    rows: (table !== null && table.length!==0) ? table.map((row, index) => {
      let date = new Date(row.ordercreatedtime)
      let color = row.orderstatus === 'Order Created' ? 'success' : row.orderstatus === "New" ? 'info' : 'error';
      return {
        'number': <OrderNumber number={row.ordernumber} edit={index === eIndex} />,
        'period': <Period period={row.orderperiod} edit={index === eIndex} />,
        'status': <SoftBadge variant="gradient" badgeContent={row.orderstatus} color={color} size="xs" container />
        ,
        'remark': (
          <SoftTypography variant="caption" color="secondary" fontWeight="light">
            {/* [false,"light","regular","medium","bold"] */}
            {row.orderremark}
          </SoftTypography>
        ),
        'created by': (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {row.ordercreatedby}
          </SoftTypography>
        )
        ,
        'timestamp': (
          <TimeStamp date={date.toLocaleDateString()} time={date.toLocaleTimeString()} />
        ),
        '': (<SoftBox
          display="flex"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}>


          {eIndex === index && (<SoftBox mr={1}><SoftButton variant="text" color="error"
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

                update(table[eIndex].ordernumber)
                setEdit(false)


                // setTOrderno('');
                // setTOrderp(null);




              }
              else {
                setEdit(true)
                setEIndex(index)
                // setTOrderno(row.ordernumber);
                // setTOrderp(row.orderperiod)
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

  // let client= useSelector(state=> state.tform.select)
  const placeOrder = () => {
    const article = {orderno ,  orderp};
    dispatch(postOrder(article))
    setOrderno('');
    setOrderp('');
  }
  console.log(table)
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
              {table !== [{}] ? <Table columns={columns} rows={rows} edit={edit} select={select} />
                : <SoftTypography align='center'>No data to show</SoftTypography>}
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
