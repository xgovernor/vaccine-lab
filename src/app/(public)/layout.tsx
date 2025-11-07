import { Button } from "@/components/ui/button";
import { SyringeIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500 rounded-lg">
                <SyringeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-red-500">VaccineHub</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#how-it-works"
                className="text-base font-medium text-gray-600 hover:text-red-500 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#benefits"
                className="text-base font-medium text-gray-600 hover:text-red-500 transition-colors"
              >
                Benefits
              </Link>
              <Link
                href="/verify-vaccine"
                className="text-base font-medium text-gray-600 hover:text-red-500 transition-colors"
              >
                Verify Certificate
              </Link>
            </nav>

            <Link href="/auth/login">
              <Button
                variant="outline"
                size="lg"
                className="border-red-400 text-red-500 hover:bg-red-50"
              >
                <UserIcon className="w-5 h-5 sm:mr-2" />
                <span className="hidden sm:inline">Staff Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
