"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit,
  Trash2,
  Download,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState, use } from "react";
import UpdatePasswordForm from "@/components/forms/update-password-form";
import UpdateUserRoleForm, { TRole } from "@/components/forms/update-user-role-form";
import { authClient } from "@/lib/auth-client";

// Mock data - replace with actual data fetching
const getUserData = (id: string) => {
  return {
    id,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@healthcenter.com",
    emailVerified: true,
    image: null,
    role: "doctor", // admin, staff, user
    createdAt: "2024-08-15",
    updatedAt: "2025-11-05",
    lastLogin: "2025-11-07T09:30:00",
  };
};

const getRoleBadge = (role: string) => {
  const roleConfig = {
    admin: {
      variant: "default" as const,
      className: "bg-purple-500 hover:bg-purple-600",
      text: "Admin",
    },
    staff: {
      variant: "default" as const,
      className: "bg-blue-500 hover:bg-blue-600",
      text: "Staff",
    },
    user: { variant: "secondary" as const, className: "", text: "User" },
  };

  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.user;

  return (
    <Badge variant={config.variant} className={config.className}>
      <Shield className="w-3 h-3 mr-1" />
      {config.text}
    </Badge>
  );
};

const PageUserDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  // const result = await getUserDetails({ id: "user-123" });
  const { id } = use(params);
  const user = getUserData(id);

  const session = authClient.useSession();

  if (!session.data?.user) {
    return null;
  }

  return (
    <div className="p-3 sm:p-4 md:p-14 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight wrap-break-word">
            Staff Details
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-all">
            User ID: {user.id}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Edit className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button variant="destructive" size="sm" className="flex-1 sm:flex-none">
            <Trash2 className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <User className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Basic staff member details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-sm sm:text-base">{session.data?.user.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Role</p>
                  <div>{getRoleBadge(session.data?.user.role || "Unknown")}</div>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    Email Address
                  </p>
                  <p className="font-medium text-sm sm:text-base break-all">{session.data?.user.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Email Status</p>
                  <div className="flex items-center gap-2">
                    {session.data?.user.emailVerified ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Verified</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600 font-medium">Not Verified</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(user.lastLogin).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <UpdatePasswordForm />
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Created</p>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(session.data?.user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(session.data?.user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <UpdateUserRoleForm currentRole={session.data?.user.role as TRole | undefined} userId={id} />

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full text-sm" variant="outline">
                Reset Password
              </Button>
              <Button className="w-full text-sm" variant="outline">
                Send Verification Email
              </Button>
              <Button className="w-full text-sm" variant="outline">
                View Activity Log
              </Button>
              <Button className="w-full text-sm" variant="outline">
                Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>

  );
};

export default PageUserDetails;
