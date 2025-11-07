"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  Building2,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  User,
  Hash,
  Syringe,
  Shield,
} from "lucide-react";

// Mock vaccination data based on exact database schema - replace with actual API call
const mockVaccinations = [
  {
    // Vaccination table fields
    id: "vacc_001",
    createdAt: new Date("2024-11-01T10:00:00Z"),
    createdBy: "user_admin_001",
    updatedAt: new Date("2024-11-01T10:00:00Z"),
    vaccine_id: "covid_pfizer_001",
    patient_id: "pat_001",
    facility_id: "fac_001",
    vaccination_date: "2024-11-15",
    vaccinator_id: "user_001",
    dose_number: 1,
    nextDueAt: "2024-12-15",
    notes:
      "First dose of COVID-19 vaccine series. Please bring ID and insurance card.",

    // Patient table fields (referenced by patient_id)
    patient: {
      id: "pat_001",
      createdAt: new Date("2024-10-15T08:00:00Z"),
      updatedAt: new Date("2024-10-15T08:00:00Z"),
      updatedBy: "user_admin_001",
      name: "John Doe",
      dob: new Date("1990-05-15T00:00:00Z"),
      gender: "Male",
      fatherName: "Michael Doe",
      motherName: "Sarah Doe",
      email: "john.doe@email.com",
      phone: "+1234567890",
      address: "456 Patient St",
      city: "Dhaka",
      state: "Dhaka Division",
      zip: "1000",
      country: "Bangladesh",
      nationalId: "1234567890123",
      birthCertificateId: "BD123456789",
    },

    // Vaccine table fields (referenced by vaccine_id)
    vaccine: {
      id: "covid_pfizer_001",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      createdBy: "user_admin_001",
      updatedAt: new Date("2024-01-01T00:00:00Z"),
      code: "CVX-208",
      name: "COVID-19 (mRNA-Pfizer-BioNTech)",
      manufacturer: "Pfizer-BioNTech",
      antigen: "SARS-CoV-2",
      series_name: "Primary Series",
      dose_count: 2,
      dose_volume: "0.3",
      dose_unit: "ml",
      route: "IM (Intramuscular)",
      site_examples:
        "Deltoid muscle (upper arm), Anterolateral thigh (for infants)",
      min_age_months: 6,
      notes:
        "Store at -80°C to -60°C. Once thawed, may be stoblack at 2°C to 8°C for up to 10 weeks.",
    },

    // Facility table fields (referenced by facility_id)
    facility: {
      id: "fac_001",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      createdBy: "user_admin_001",
      updatedAt: new Date("2024-01-01T00:00:00Z"),
      status: "Active",
      title: "Community Health Center",
      address: "123 Main St",
      city: "Dhaka",
      state: "Dhaka Division",
      zip: "1000",
      country: "Bangladesh",
      phone: "+8801234567800",
      email: "contact@communityhc.com",
      capacity: "100 patients/day",
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: "9:00 AM - 5:00 PM",
      notes: "Primary healthcare facility with vaccination services",
    },

    // Vaccinator (User table fields, referenced by vaccinator_id)
    vaccinator: {
      id: "user_001",
      name: "Dr. Sarah Johnson",
      email: "dr.sarah@communityhc.com",
      emailVerified: true,
      image: null,
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z"),
    },
  },
  {
    // Vaccination table fields
    id: "vacc_002",
    createdAt: new Date("2024-11-05T14:00:00Z"),
    createdBy: "user_admin_001",
    updatedAt: new Date("2024-11-05T14:00:00Z"),
    vaccine_id: "flu_seasonal_001",
    patient_id: "pat_002",
    facility_id: "fac_002",
    vaccination_date: "2024-11-20",
    vaccinator_id: "user_002",
    dose_number: 1,
    nextDueAt: "2025-11-20",
    notes: "Annual flu vaccination. No special preparation requiblack.",

    // Patient table fields
    patient: {
      id: "pat_002",
      createdAt: new Date("2024-10-20T10:00:00Z"),
      updatedAt: new Date("2024-10-20T10:00:00Z"),
      updatedBy: "user_admin_001",
      name: "Jane Smith",
      dob: new Date("1985-08-22T00:00:00Z"),
      gender: "Female",
      fatherName: "Robert Smith",
      motherName: "Linda Smith",
      email: "jane.smith@email.com",
      phone: "+1987654321",
      address: "789 Oak Ave",
      city: "Chittagong",
      state: "Chittagong Division",
      zip: "4000",
      country: "Bangladesh",
      nationalId: "9876543210987",
      birthCertificateId: "BD987654321",
    },

    // Vaccine table fields
    vaccine: {
      id: "flu_seasonal_001",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      createdBy: "user_admin_001",
      updatedAt: new Date("2024-01-01T00:00:00Z"),
      code: "CVX-141",
      name: "Influenza, seasonal, injectable",
      manufacturer: "Sanofi Pasteur",
      antigen: "Influenza virus",
      series_name: "Annual",
      dose_count: 1,
      dose_volume: "0.5",
      dose_unit: "ml",
      route: "IM (Intramuscular)",
      site_examples: "Deltoid muscle (upper arm)",
      min_age_months: 6,
      notes:
        "Store at 2°C to 8°C. Do not freeze. Protect from light. Administer annually before flu season.",
    },

    // Facility table fields
    facility: {
      id: "fac_002",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      createdBy: "user_admin_001",
      updatedAt: new Date("2024-01-01T00:00:00Z"),
      status: "Active",
      title: "City Medical Clinic",
      address: "456 Health Ave",
      city: "Chittagong",
      state: "Chittagong Division",
      zip: "4000",
      country: "Bangladesh",
      phone: "+8801987654800",
      email: "info@citymedical.com",
      capacity: "80 patients/day",
      weekdays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      hours: "8:00 AM - 6:00 PM",
      notes: "Specialized medical clinic with immunization services",
    },

    // Vaccinator (User table fields)
    vaccinator: {
      id: "user_002",
      name: "Dr. Michael Brown",
      email: "dr.michael@citymedical.com",
      emailVerified: true,
      image: null,
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z"),
    },
  },
  {
    // Vaccination table fields
    id: "vacc_003",
    createdAt: new Date("2024-11-03T09:00:00Z"),
    createdBy: "user_admin_001",
    updatedAt: new Date("2024-11-03T09:00:00Z"),
    vaccine_id: "covid_moderna_booster_001",
    patient_id: "pat_003",
    facility_id: "fac_003",
    vaccination_date: "2024-11-18",
    vaccinator_id: "user_003",
    dose_number: 3,
    nextDueAt: "2025-05-18",
    notes:
      "Booster dose. Please wait 15 minutes after vaccination for observation.",

    // Patient table fields
    patient: {
      id: "pat_003",
      createdAt: new Date("2024-09-15T12:00:00Z"),
      updatedAt: new Date("2024-09-15T12:00:00Z"),
      updatedBy: "user_admin_001",
      name: "Robert Wilson",
      dob: new Date("1978-12-10T00:00:00Z"),
      gender: "Male",
      fatherName: "James Wilson",
      motherName: "Mary Wilson",
      email: "robert.wilson@email.com",
      phone: "+1555123456",
      address: "321 Pine St",
      city: "Sylhet",
      state: "Sylhet Division",
      zip: "3100",
      country: "Bangladesh",
      nationalId: "5551234567890",
      birthCertificateId: "BD555123456",
    },

    // Vaccine table fields
    vaccine: {
      id: "covid_moderna_booster_001",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      createdBy: "user_admin_001",
      updatedAt: new Date("2024-01-01T00:00:00Z"),
      code: "CVX-212",
      name: "COVID-19 (mRNA-Moderna) - Booster",
      manufacturer: "Moderna",
      antigen: "SARS-CoV-2",
      series_name: "Booster",
      dose_count: 1,
      dose_volume: "0.25",
      dose_unit: "ml",
      route: "IM (Intramuscular)",
      site_examples: "Deltoid muscle (upper arm)",
      min_age_months: 18,
      notes:
        "Store at -50°C to -15°C. Once thawed, may be stoblack at 2°C to 8°C for up to 30 days.",
    },

    // Facility table fields
    facility: {
      id: "fac_003",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      createdBy: "user_admin_001",
      updatedAt: new Date("2024-01-01T00:00:00Z"),
      status: "Active",
      title: "Regional Vaccination Center",
      address: "789 Wellness Blvd",
      city: "Sylhet",
      state: "Sylhet Division",
      zip: "3100",
      country: "Bangladesh",
      phone: "+8801555123400",
      email: "appointments@regionalvax.com",
      capacity: "200 patients/day",
      weekdays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      hours: "7:00 AM - 9:00 PM",
      notes: "Large-scale vaccination center with extended hours",
    },

    // Vaccinator (User table fields)
    vaccinator: {
      id: "user_003",
      name: "Dr. Emily Davis",
      email: "dr.emily@regionalvax.com",
      emailVerified: true,
      image: null,
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z"),
    },
  },
];

type VaccinationRecord = (typeof mockVaccinations)[0];

const PageVerify = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vaccinationId, setVaccinationId] = useState("");
  const [searchResult, setSearchResult] =
    useState<VaccinationRecord | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setSearchResult(null);
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      const result = mockVaccinations.find(
        (vaccination) =>
          vaccination.patient.phone === phoneNumber &&
          vaccination.id.toLowerCase() === vaccinationId.toLowerCase()
      );

      if (result) {
        setSearchResult(result);
      } else {
        setError(
          "No vaccination appointment found with the provided phone number and vaccination ID. Please check your details and try again."
        );
      }
      setIsSearching(false);
    }, 800);
  };

  const handleReset = () => {
    setPhoneNumber("");
    setVaccinationId("");
    setSearchResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-black-100 rounded-full">
              <Calendar className="w-12 h-12 text-black-600" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black-600 mb-4">
            Verify Vaccination Record
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your phone number and vaccination ID to verify your vaccination
            appointment details
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Search Form */}
          <Card className="border-black-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-black-600">
                <Search className="w-5 h-5" />
                Search Vaccination Record
              </CardTitle>
              <CardDescription>
                Enter your phone number and vaccination ID to verify your
                vaccination appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="flex items-center gap-2 text-base"
                  >
                    <Phone className="w-4 h-4 text-black-500" />
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number (e.g., +1234567890)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-black-200 focus:border-black-400 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="vaccinationId"
                    className="flex items-center gap-2 text-base"
                  >
                    <Hash className="w-4 h-4 text-black-500" />
                    Vaccination ID
                  </Label>
                  <Input
                    id="vaccinationId"
                    type="text"
                    placeholder="Enter vaccination ID (e.g., vacc_001)"
                    value={vaccinationId}
                    onChange={(e) => setVaccinationId(e.target.value)}
                    className="border-black-200 focus:border-black-400 text-lg"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && phoneNumber && vaccinationId) {
                        handleSearch();
                      }
                    }}
                  />
                </div>
              </div>

             
              <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center">
                
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full  sm:w-auto border-black-400 text-black-500 hover:bg-black-50"
                  size="lg"
                >
                  Clear
                </Button>
              </div>

              {/* Sample Vaccination IDs */}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  Sample vaccination IDs to try:
                </p>
                <div className="flex flex-wrap gap-2">
                  {mockVaccinations.map((vaccination) => (
                    <Badge
                      key={vaccination.id}
                      variant="outline"
                      className="cursor-pointer border-black-300 text-black-600 hover:bg-black-50"
                      onClick={() => {
                        setVaccinationId(vaccination.id);
                        setPhoneNumber(vaccination.patient.phone);
                      }}
                    >
                      {vaccination.id}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="border-black-300 bg-black-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-black-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-black-900">
                      Vaccination Record Not Found
                    </h3>
                    <p className="text-sm text-black-700 mt-1">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search Result */}
          {searchResult && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <Separator />

              {/* Vaccination Header */}
              <Card className="border-black-100 bg-linear-to-br from-black-50 to-white">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-black-600 mb-2">
                        Vaccination ID: {searchResult.id}
                      </CardTitle>
                      <CardDescription className="text-base">
                        Patient: {searchResult.patient.name} • Phone:{" "}
                        {searchResult.patient.phone}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600 text-white shrink-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Vaccination Information */}
              <Card className="border-black-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-black-600">
                    <Calendar className="w-5 h-5" />
                    Vaccination Details
                  </CardTitle>
                  <CardDescription>
                    Your vaccination appointment information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-black-500" />
                        Vaccination Date
                      </p>
                      <p className="font-medium text-base">
                        {new Date(
                          searchResult.vaccination_date
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Hash className="w-4 h-4 text-black-500" />
                        Dose Number
                      </p>
                      <p className="font-medium text-base">
                        Dose {searchResult.dose_number}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Syringe className="w-4 h-4 text-black-500" />
                        Vaccine Name
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.name}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-black-500" />
                        Vaccinator
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccinator.name}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Hash className="w-4 h-4 text-black-500" />
                        Vaccine Code
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.code}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Shield className="w-4 h-4 text-black-500" />
                        Series Name
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.series_name}
                      </p>
                    </div>
                    {searchResult.nextDueAt && (
                      <div className="space-y-1 sm:col-span-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4 text-black-500" />
                          Next Dose Due
                        </p>
                        <p className="font-medium text-base">
                          {new Date(searchResult.nextDueAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Vaccine Information */}
              <Card className="border-black-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-black-600">
                    <Syringe className="w-5 h-5" />
                    Vaccine Information
                  </CardTitle>
                  <CardDescription>
                    Details about the vaccine administeblack
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-black-500" />
                        Manufacturer
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.manufacturer}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Shield className="w-4 h-4 text-black-500" />
                        Antigen (Target Disease)
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.antigen}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Syringe className="w-4 h-4 text-black-500" />
                        Route of Administration
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.route}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Dose Volume
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.dose_volume}{" "}
                        {searchResult.vaccine.dose_unit}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Minimum Age
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.min_age_months} months
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Total Doses in Series
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.dose_count} dose(s)
                      </p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Injection Site Examples
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.vaccine.site_examples}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vaccine Storage & Handling */}
              {searchResult.vaccine.notes && (
                <Card className="border-black-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-black-600">
                      <FileText className="w-5 h-5" />
                      Vaccine Storage & Handling
                    </CardTitle>
                    <CardDescription>
                      Important storage and handling information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">
                      {searchResult.vaccine.notes}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Facility Information */}
              <Card className="border-black-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-black-600">
                    <MapPin className="w-5 h-5" />
                    Facility Details
                  </CardTitle>
                  <CardDescription>
                    Where the vaccination took place
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-black-500" />
                        Facility Name
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.facility.title}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Shield className="w-4 h-4 text-black-500" />
                        Status
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.facility.status}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-black-500" />
                        Full Address
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.facility.address},{" "}
                        {searchResult.facility.city},{" "}
                        {searchResult.facility.state}{" "}
                        {searchResult.facility.zip},{" "}
                        {searchResult.facility.country}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4 text-black-500" />
                        Contact Information
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.facility.phone}
                      </p>
                      <p className="font-medium text-sm text-gray-600">
                        {searchResult.facility.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4 text-black-500" />
                        Operating Hours
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.facility.hours}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Daily Capacity
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.facility.capacity}
                      </p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Working Days
                      </p>
                      <p className="font-medium text-base">
                        {searchResult.facility.weekdays.join(", ")}
                      </p>
                    </div>
                    {searchResult.facility.notes && (
                      <div className="space-y-1 sm:col-span-2">
                        <p className="text-sm text-muted-foreground">
                          Facility Notes
                        </p>
                        <p className="font-medium text-base">
                          {searchResult.facility.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Patient & Vaccinator Information */}
              <Card className="border-black-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-black-600">
                    <User className="w-5 h-5" />
                    Patient & Provider Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">
                        Patient Information
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Full Name
                          </p>
                          <p className="font-medium">
                            {searchResult.patient.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Date of Birth
                          </p>
                          <p className="font-medium">
                            {new Date(
                              searchResult.patient.dob
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Gender
                          </p>
                          <p className="font-medium">
                            {searchResult.patient.gender}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Contact Information
                          </p>
                          <p className="font-medium">
                            {searchResult.patient.phone}
                          </p>
                          <p className="font-medium text-sm text-gray-600">
                            {searchResult.patient.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Father's Name
                          </p>
                          <p className="font-medium">
                            {searchResult.patient.fatherName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Mother's Name
                          </p>
                          <p className="font-medium">
                            {searchResult.patient.motherName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Address
                          </p>
                          <p className="font-medium">
                            {searchResult.patient.address},{" "}
                            {searchResult.patient.city},{" "}
                            {searchResult.patient.state}{" "}
                            {searchResult.patient.zip},{" "}
                            {searchResult.patient.country}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            National ID
                          </p>
                          <p className="font-medium">
                            {searchResult.patient.nationalId}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Birth Certificate ID
                          </p>
                          <p className="font-medium">
                            {searchResult.patient.birthCertificateId}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">
                        Healthcare Provider
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Provider Name
                          </p>
                          <p className="font-medium">
                            {searchResult.vaccinator.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Email
                          </p>
                          <p className="font-medium">
                            {searchResult.vaccinator.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Email Verified
                          </p>
                          <p className="font-medium">
                            {searchResult.vaccinator.emailVerified
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Provider ID
                          </p>
                          <p className="font-medium">
                            {searchResult.vaccinator.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {searchResult.notes && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Notes:</strong> {searchResult.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Vaccination Record Information */}
              <Card className="border-black-200 bg-black-50">
                <CardHeader>
                  <CardTitle className="text-base text-black-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-black-800 space-y-2">
                  <p>
                    • This vaccination record is official and can be used for
                    verification purposes
                  </p>
                  <p>
                    • Keep this information safe and accessible for future
                    reference
                  </p>
                  <p>
                    • If you experience any adverse reactions, contact your
                    healthcare provider immediately
                  </p>
                  <p>
                    • Record created on:{" "}
                    {searchResult.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="w-full sm:w-auto bg-black-500 hover:bg-black-700 text-white"
                  size="lg"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Vaccination Certificate
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-black-400 text-black-500 hover:bg-black-50"
                  size="lg"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Facility
                </Button>
                {searchResult.nextDueAt && (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-black-400 text-black-500 hover:bg-black-50"
                    size="lg"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Next Dose
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageVerify;