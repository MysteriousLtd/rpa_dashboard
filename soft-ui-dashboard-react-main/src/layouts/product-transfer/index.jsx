import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import Formsheet from './FormSheet'
import Tablesheet from './Tablesheet'

function ProductTransfer() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Formsheet />
      <Tablesheet />
    </DashboardLayout>
  )
}

export default ProductTransfer
