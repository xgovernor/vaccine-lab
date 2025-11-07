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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{vaccine.name}</h1>
          <p className="text-muted-foreground">
            Vaccine Code: {vaccine.code} • ID: {vaccine.id}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
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
              <CardTitle className="flex items-center gap-2">
                <Syringe className="w-5 h-5" />
                Vaccine Information
              </CardTitle>
              <CardDescription>Basic vaccine details and specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Vaccine Name</p>
                  <p className="font-medium">{vaccine.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Vaccine Code</p>
                  <p className="font-medium">{vaccine.code}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Manufacturer
                  </p>
                  <p className="font-medium">{vaccine.manufacturer}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Antigen (Disease Target)
                  </p>
                  <p className="font-medium">{vaccine.antigen}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Series Name
                  </p>
                  <p className="font-medium">{vaccine.seriesName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Minimum Age</p>
                  <p className="font-medium">{vaccine.minAgeMonths} months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dosage Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Dosage & Administration
              </CardTitle>
              <CardDescription>Dose specifications and administration guidelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Dose Count (Series)</p>
                  <p className="font-medium">{vaccine.doseCount} doses</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Dose Volume</p>
                  <p className="font-medium">
                    {vaccine.doseVolume} {vaccine.doseUnit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Route of Administration
                  </p>
                  <p className="font-medium">{vaccine.route}</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm text-muted-foreground">Injection Site Examples</p>
                  <p className="font-medium">{vaccine.siteExamples}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Additional Notes & Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{vaccine.notes}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                View History
              </Button>
              <Button className="w-full" variant="outline">
                Print Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-start pt-4">
        <Link href="/dashboard/inventory">
          <Button variant="ghost">← Back to Inventory</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageInventoryDetails;
