import DashboardLayout from '@/components/dashboard-layout'
import { Route } from '@/components/nav-main';
import React from 'react'
import { HomeIcon, UsersIcon } from 'lucide-react';

const PageDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dashboardRoutes: Route[] = [
        {
            id: "home",
            title: "Home",
            icon: <HomeIcon className="size-4" />,
            link: "/dashboard",
        },
        {
            id: "appointment",
            title: "Appointment",
            icon: <UsersIcon className="size-4" />,
            link: "/dashboard/appointment",
            subs: [
                { title: "All Appointments", link: "/dashboard/appointment" },
                { title: "Schedule Appointment", link: "/dashboard/appointment/schedule" },
            ],
        },
        {
            id: "users",
            title: "Stuff",
            icon: <UsersIcon className="size-4" />,
            link: "/dashboard/users",
            subs: [
                { title: "All Stuff", link: "/dashboard/users" },
                { title: "Add New Stuff", link: "/dashboard/users/add" },
            ],
        },
        {
            id: "inventory",
            title: "Inventory",
            icon: <UsersIcon className="size-4" />,
            link: "/dashboard/inventory",
            subs: [
                { title: "Inventory", link: "/dashboard/inventory" },
                { title: "Add Item", link: "/dashboard/inventory/add" },
            ],
        },
        {
            id: "analytics",
            title: "Analytics",
            icon: <UsersIcon className="size-4" />,
            link: "#",
            subs: [
                { title: "Analytics", link: "/dashboard/analytics" },
                { title: "Reports", link: "/dashboard/reports" },
            ],
        },
    ];


    return (
        <DashboardLayout sidebarRoutes={dashboardRoutes}>{children}</DashboardLayout>
    )
}

export default PageDashboardLayout
