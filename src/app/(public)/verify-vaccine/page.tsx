"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Syringe,
  Building2,
  FlaskConical,
  FileText,
  CheckCircle,
  AlertCircle,
  Target,
  Layers,
  Pill,
  Calendar,
  Shield,
} from "lucide-react";

// Mock vaccine data - replace with actual API call
const mockVaccines = [
  {
    id: "1",
    code: "CVX-208",
    name: "COVID-19 (mRNA-Pfizer-BioNTech)",
    manufacturer: "Pfizer-BioNTech",
    antigen: "SARS-CoV-2",
    seriesName: "Primary Series",
    doseCount: 2,
    doseVolume: 0.3,
    doseUnit: "ml",
    route: "IM (Intramuscular)",
    siteExamples: "Deltoid muscle (upper arm), Anterolateral thigh (for infants)",
    minAgeMonths: 6,
    notes:
      "Store at -80°C to -60°C. Once thawed, may be stored at 2°C to 8°C for up to 10 weeks. After dilution, use within 6 hours. Do not refreeze.",
    approved: true,
    approvalDate: "2020-12-11",
  },
  {
    id: "2",
    code: "CVX-212",
    name: "COVID-19 (mRNA-Moderna)",
    manufacturer: "Moderna",
    antigen: "SARS-CoV-2",
    seriesName: "Primary Series",
    doseCount: 2,
    doseVolume: 0.5,
    doseUnit: "ml",
    route: "IM (Intramuscular)",
    siteExamples: "Deltoid muscle (upper arm)",
    minAgeMonths: 6,
    notes:
      "Store at -50°C to -15°C. Once thawed, may be stored at 2°C to 8°C for up to 30 days. After first puncture, use within 6 hours.",
    approved: true,
    approvalDate: "2020-12-18",
  },
  {
    id: "3",
    code: "CVX-141",
    name: "Influenza, seasonal, injectable",
    manufacturer: "Various Manufacturers",
    antigen: "Influenza virus",
    seriesName: "Annual",
    doseCount: 1,
    doseVolume: 0.5,
    doseUnit: "ml",
    route: "IM (Intramuscular)",
    siteExamples: "Deltoid muscle (upper arm)",
    minAgeMonths: 6,
    notes:
      "Store at 2°C to 8°C. Do not freeze. Protect from light. Administer annually before flu season.",
    approved: true,
    approvalDate: "1945-04-13",
  },
];

type Vaccine = (typeof mockVaccines)[0];

const PageVerify = () => {
  const [vaccineCode, setVaccineCode] = useState("");
  const [searchResult, setSearchResult] = useState<Vaccine | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setSearchResult(null);
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      const result = mockVaccines.find(
        (vaccine) => vaccine.code.toLowerCase() === vaccineCode.toLowerCase()
      );

      if (result) {
        setSearchResult(result);
      } else {
        setError("No vaccine found with the provided code. Please check the code and try again.");
      }
      setIsSearching(false);
    }, 800);
  };

  const handleReset = () => {
    setVaccineCode("");
    setSearchResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 rounded-full">
              <Syringe className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-red-600 mb-4">
            Verify Vaccine Information
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Search and verify vaccine details using the vaccine code (CVX code)
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Search Form */}
          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-red-600">
                <Search className="w-5 h-5" />
                Search Vaccine
              </CardTitle>
              <CardDescription>
                Enter the vaccine code (e.g., CVX-208, CVX-212) to view detailed information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="vaccineCode" className="flex items-center gap-2 text-base">
                  <FlaskConical className="w-4 h-4 text-red-500" />
                  Vaccine Code (CVX Code)
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="vaccineCode"
                    type="text"
                    placeholder="Enter vaccine code (e.g., CVX-208)"
                    value={vaccineCode}
                    onChange={(e) => setVaccineCode(e.target.value)}
                    className="border-red-200 focus:border-red-400 text-lg"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && vaccineCode) {
                        handleSearch();
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleSearch}
                  disabled={!vaccineCode || isSearching}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white"
                  size="lg"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "Searching..." : "Search Vaccine"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full sm:w-auto border-red-400 text-red-500 hover:bg-red-50"
                  size="lg"
                >
                  Clear
                </Button>
              </div>

              {/* Sample Codes */}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Try these sample codes:</p>
                <div className="flex flex-wrap gap-2">
                  {mockVaccines.map((vaccine) => (
                    <Badge
                      key={vaccine.code}
                      variant="outline"
                      className="cursor-pointer border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => setVaccineCode(vaccine.code)}
                    >
                      {vaccine.code}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="border-red-300 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900">Vaccine Not Found</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search Result */}
          {searchResult && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <Separator />

              {/* Vaccine Header */}
              <Card className="border-red-100 bg-gradient-to-br from-red-50 to-white">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-red-600 mb-2">
                        {searchResult.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        Code: {searchResult.code} • ID: {searchResult.id}
                      </CardDescription>
                    </div>
                    {searchResult.approved && (
                      <Badge className="bg-green-500 text-white hover:bg-green-600 shrink-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>

              {/* Basic Information */}
              <Card className="border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-red-600">
                    <Syringe className="w-5 h-5" />
                    Vaccine Information
                  </CardTitle>
                  <CardDescription>Basic vaccine details and specifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-red-500" />
                        Manufacturer
                      </p>
                      <p className="font-medium text-base">{searchResult.manufacturer}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Target className="w-4 h-4 text-red-500" />
                        Antigen (Target Disease)
                      </p>
                      <p className="font-medium text-base">{searchResult.antigen}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Layers className="w-4 h-4 text-red-500" />
                        Series Name
                      </p>
                      <p className="font-medium text-base">{searchResult.seriesName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-red-500" />
                        Minimum Age
                      </p>
                      <p className="font-medium text-base">{searchResult.minAgeMonths} months</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-500" />
                        Approval Date
                      </p>
                      <p className="font-medium text-base">
                        {new Date(searchResult.approvalDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dosage Information */}
              <Card className="border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-red-600">
                    <FlaskConical className="w-5 h-5" />
                    Dosage & Administration
                  </CardTitle>
                  <CardDescription>
                    Dose specifications and administration guidelines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Dose Count (Series)</p>
                      <p className="font-medium text-base">{searchResult.doseCount} dose(s)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Dose Volume</p>
                      <p className="font-medium text-base">
                        {searchResult.doseVolume} {searchResult.doseUnit}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Pill className="w-4 h-4 text-red-500" />
                        Route of Administration
                      </p>
                      <p className="font-medium text-base">{searchResult.route}</p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-sm text-muted-foreground">Injection Site Examples</p>
                      <p className="font-medium text-base">{searchResult.siteExamples}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Storage & Notes */}
              <Card className="border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-red-600">
                    <FileText className="w-5 h-5" />
                    Storage & Handling Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{searchResult.notes}</p>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-base text-red-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Important Notice
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-red-800 space-y-2">
                  <p>
                    • This information is for reference purposes only and should not replace
                    professional medical advice
                  </p>
                  <p>
                    • Always consult with a healthcare provider before receiving any vaccination
                  </p>
                  <p>
                    • Storage and handling requirements must be strictly followed by healthcare
                    facilities
                  </p>
                  <p>• Report any adverse reactions to your healthcare provider immediately</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white"
                  size="lg"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Vaccine Info
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-red-400 text-red-500 hover:bg-red-50"
                  size="lg"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageVerify;
