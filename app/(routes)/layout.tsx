import React from 'react'
import AppHeader from './_components/AppHeader'


function DashboardLayout({children}:any) {
  return (
    <div>
        <AppHeader />
        {children}</div>
  )
}

export default DashboardLayout