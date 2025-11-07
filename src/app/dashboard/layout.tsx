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
            link: "/appointment",
            subs: [
                { title: "All Appointments", link: "/appointment" },
                { title: "Schedule Appointment", link: "/appointment/schedule" },
            ],
        },
        {
            id: "users",
            title: "Stuff",
            icon: <UsersIcon className="size-4" />,
            link: "/users",
            subs: [
                { title: "All Stuff", link: "/users" },
                { title: "Add New Stuff", link: "/users/add" },
            ],
        },
        {
            id: "inventory",
            title: "Inventory",
            icon: <UsersIcon className="size-4" />,
            link: "/inventory",
            subs: [
                { title: "Inventory", link: "/inventory" },
                { title: "Add Item", link: "/inventory/add" },
            ],
        },
        {
            id: "analytics",
            title: "Analytics",
            icon: <UsersIcon className="size-4" />,
            link: "#",
            subs: [
                { title: "Analytics", link: "/analytics" },
                { title: "Reports", link: "/reports" },
            ],
        },
    ];


    return (
        <DashboardLayout sidebarRoutes={dashboardRoutes}>{children}</DashboardLayout>
    )
}

export default PageDashboardLayout
