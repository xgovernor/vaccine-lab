import { Button } from "@/components/ui/button";
import { SyringeIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b sticky top-0 z-50 bg-white/30 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Removed red background from icon for a cleaner look */}
              <SyringeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800" />
              <Link href="/">
              <span className="text-xl sm:text-2xl font-semibold text-gray-900">
                VaccineHub
              </span></Link>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/verify"
                className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Verify Vaccine
              </Link>
              <Link
                href="/verify-vaccine"
                className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Check Vaccine
              </Link>
            </nav>

            <Link href="/auth/login">
              {/* Styled button to match the "Get Started" look from the screenshot */}
              <Button
                size="lg"
                className="rounded-full bg-gray-900 text-white hover:bg-gray-700 hidden sm:flex items-center"
              >
                <UserIcon className="w-5 h-5 sm:mr-2" />
                <span>Staff Login</span>
              </Button>
              {/* Show only icon on mobile */}
              <Button
                size="icon"
                className="rounded-full bg-gray-900 text-white hover:bg-gray-700 sm:hidden"
              >
                <UserIcon className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}