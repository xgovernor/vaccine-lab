import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import {
  
  Calendar,
  FileCheck,
  ArrowRight,
 
} from "lucide-react";

export default function Home() {
  return (
    <>
      {" "}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
        <div className="text-center space-y-8 md:space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
              Schedule Your Vaccination Appointment
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Book your vaccination appointment online. Safe, secure, and convenient access to
              vaccines for you and your family.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Link href="/appointment-form" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full cursor-pointer rounded-full text-lg px-8 py-6 bg-red-500 hover:bg-red-700 text-white h-auto shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 hover:scale-105 animate-pulse hover:animate-none"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Book Appointment
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
            <Link href="/verify-vaccine" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full cursor-pointer rounded-full text-lg px-8 py-6 border-red-400 text-red-500 hover:bg-red-50 h-auto"
              >
                <FileCheck className="w-6 h-6 mr-3" />
                Verify Certificate
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Separator />
    </>
  );
}
