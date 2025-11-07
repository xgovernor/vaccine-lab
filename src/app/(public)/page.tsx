import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, FileCheck, ArrowRight } from "lucide-react";
import Image from "next/image"; //

export default function Home() {
  return (
    <>
      <section className="min-h-[calc(100vh-5rem)] flex items-center bg-gradient-to-br from-[#8d6a4c] via-[#a07b58] to-[#6a4f3a] text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
          
        
          <div className="flex flex-col md:flex-row items-center gap-12">
            
          
            <div className="md:w-1/2 space-y-8 md:space-y-12">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white">
                  Schedule Your Vaccination Appointment
                </h1>

                <p className="text-xl sm:text-2xl text-amber-100 max-w-3xl leading-relaxed">
                  Book your vaccination appointment online. Safe, secure, and
                  convenient access to vaccines for you and your family.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link href="/appointment-form" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto cursor-pointer rounded-full text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-200 h-auto shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 hover:scale-105"
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
                    className="w-full sm:w-auto cursor-pointer rounded-full text-lg px-8 py-6 bg-white/10 text-white border-none backdrop-blur-sm hover:bg-white/20 h-auto"
                  >
                    <FileCheck className="w-6 h-6 mr-3" />
                    Verify Certificate
                  </Button>
                </Link>
              </div>
            </div>

           
            <div className="md:w-1/2 w-full mt-8 md:mt-0">
              <Image
                src="https://caltechsites-prod-assets.s3.amazonaws.com/scienceexchange/images/Caltech-Corona-Virus-Syringe.2e16d0ba.fill-933x525-c100.jpg" 
                alt="Vaccination illustration"
                width={800} 
                height={700} 
                className="w-full h-auto rounded-lg shadow-2xl object-cover"
              />
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}