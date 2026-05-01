import React from 'react'
import { Outlet } from 'react-router-dom'
import AppLayout from '../components/AppLayout'

const Layout = () => {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    )
}

export default Layout
