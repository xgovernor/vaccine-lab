import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Syringe,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Download,
} from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual data fetching
const getAppointmentData = (id: string) => {
  return {
    id,
    patientName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    address: "123 Main Street, New York, NY 10001",
    appointmentDate: "2025-11-15",
    appointmentTime: "10:30 AM",
    vaccine: "COVID-19 Pfizer-BioNTech",
    doseNumber: "2nd Dose",
    status: "scheduled", // scheduled, completed, cancelled, no-show
    notes: "Patient has no known allergies. Previous dose administered on 2025-10-18.",
    createdAt: "2025-11-01",
    vaccinationSite: "Main Health Center - Room 202",
    healthCardNumber: "1234-5678-9012",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
  };
};

const getStatusBadge = (status: string) => {
  const statusConfig = {
    scheduled: { variant: "default" as const, icon: Calendar, text: "Scheduled", className: "" },
    completed: {
      variant: "default" as const,
      icon: CheckCircle,
      text: "Completed",
      className: "bg-green-500 hover:bg-green-600",
    },
    cancelled: { variant: "destructive" as const, icon: XCircle, text: "Cancelled", className: "" },
    "no-show": { variant: "secondary" as const, icon: AlertCircle, text: "No Show", className: "" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={config.className || ""}>
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </Badge>
  );
};

const PageAppointmentDetails = ({ params }: { params: { id: string } }) => {
  const appointment = getAppointmentData(params.id);

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            Appointment Details
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-all">
            Appointment ID: {appointment.id}
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
            <span className="hidden sm:inline">Cancel</span>
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <User className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Patient Information
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Personal details of the patient
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-sm sm:text-base">{appointment.patientName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(appointment.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2 break-all">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    {appointment.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    {appointment.phone}
                  </p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-sm sm:text-base flex items-start gap-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span>{appointment.address}</span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Health Card Number</p>
                  <p className="font-medium text-sm sm:text-base">{appointment.healthCardNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="font-medium text-sm sm:text-base">{appointment.emergencyContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vaccination Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Syringe className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Vaccination Details
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Information about the vaccine and administration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Vaccine</p>
                  <p className="font-medium text-sm sm:text-base">{appointment.vaccine}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Dose Number</p>
                  <p className="font-medium text-sm sm:text-base">{appointment.doseNumber}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">Vaccination Site</p>
                  <p className="font-medium text-sm sm:text-base">{appointment.vaccinationSite}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Additional Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm leading-relaxed">{appointment.notes}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">{getStatusBadge(appointment.status)}</div>
            </CardContent>
          </Card>

          {/* Appointment Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Schedule</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Appointment date and time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Date</p>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(appointment.appointmentDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Time</p>
                  <p className="font-medium text-sm sm:text-base">{appointment.appointmentTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full text-sm" variant="outline">
                Send Reminder
              </Button>
              <Button className="w-full text-sm" variant="outline">
                Reschedule
              </Button>
              <Button className="w-full text-sm" variant="outline">
                Mark as Completed
              </Button>
              <Button className="w-full text-sm" variant="outline">
                Print Details
              </Button>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs sm:text-sm">
              <div>
                <p className="text-muted-foreground">Created On</p>
                <p className="font-medium">
                  {new Date(appointment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-start pt-2 md:pt-4">
        <Link href="/dashboard/appointment">
          <Button variant="ghost" size="sm" className="text-sm">
            ← Back to Appointments
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageAppointmentDetails;
