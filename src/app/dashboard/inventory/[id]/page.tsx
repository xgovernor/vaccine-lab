import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Syringe,
  Building2,
  FlaskConical,
  FileText,
  Edit,
  Trash2,
  Download,
  Pill,
  Target,
  Layers,
} from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual data fetching
const getVaccineData = (id: string) => {
  return {
    id,
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
  };
};

const PageInventoryDetails = ({ params }: { params: { id: string } }) => {
  const vaccine = getVaccineData(params.id);

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight wrap-break-word">
            {vaccine.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-all">
            Vaccine Code: {vaccine.code} • ID: {vaccine.id}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Syringe className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Vaccine Information
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Basic vaccine details and specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Vaccine Name</p>
                  <p className="font-medium text-sm sm:text-base break-words">{vaccine.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Vaccine Code</p>
                  <p className="font-medium text-sm sm:text-base">{vaccine.code}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    Manufacturer
                  </p>
                  <p className="font-medium text-sm sm:text-base">{vaccine.manufacturer}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                    Antigen (Disease Target)
                  </p>
                  <p className="font-medium text-sm sm:text-base">{vaccine.antigen}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                    <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
                    Series Name
                  </p>
                  <p className="font-medium text-sm sm:text-base">{vaccine.seriesName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Minimum Age</p>
                  <p className="font-medium text-sm sm:text-base">{vaccine.minAgeMonths} months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dosage Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Dosage & Administration
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Dose specifications and administration guidelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Dose Count (Series)</p>
                  <p className="font-medium text-sm sm:text-base">{vaccine.doseCount} doses</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Dose Volume</p>
                  <p className="font-medium text-sm sm:text-base">
                    {vaccine.doseVolume} {vaccine.doseUnit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                    <Pill className="w-3 h-3 sm:w-4 sm:h-4" />
                    Route of Administration
                  </p>
                  <p className="font-medium text-sm sm:text-base">{vaccine.route}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Injection Site Examples
                  </p>
                  <p className="font-medium text-sm sm:text-base">{vaccine.siteExamples}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Additional Notes & Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm leading-relaxed">{vaccine.notes}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full text-sm" variant="outline">
                View History
              </Button>
              <Button className="w-full text-sm" variant="outline">
                Print Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-start pt-2 md:pt-4">
        <Link href="/dashboard/inventory">
          <Button variant="ghost" size="sm" className="text-sm">
            ← Back to Inventory
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageInventoryDetails;
