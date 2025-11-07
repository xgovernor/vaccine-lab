import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";
import { Route } from "../nav-main";

export default function DashboardLayout({ children, sidebarRoutes }: { children: React.ReactNode, sidebarRoutes: Route[] }) {
    return (
        <SidebarProvider>
            <div className="relative flex h-screen w-full">
                <DashboardSidebar sidebarRoutes={sidebarRoutes} />
                <SidebarInset className="flex flex-col">
                    {children}
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
