"use client";

import {
  CalendarDaysIcon,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  FileTextIcon,
  Loader2,
  Trash2Icon,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { format } from "date-fns"; // A great library for formatting dates

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// --- 1. UPDATED DATA INTERFACE & MOCK DATA ---

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  service: string;
  center: string;
  dateTime: string; // Using ISO string for date
  status: "pending" | "confirmed" | "completed" | "canceled";
}

type AppointmentActionType = "reschedule" | "cancel" | "view";

const appointmentsData: Appointment[] = [
  {
    id: "APP-001",
    patientName: "John Doe",
    patientEmail: "john.doe@example.com",
    service: "Vaccine - Dose 1",
    center: "Sylhet MAG Osmani Medical",
    dateTime: "2025-11-10T09:30:00.000Z",
    status: "confirmed",
  },
  {
    id: "APP-002",
    patientName: "Jane Smith",
    patientEmail: "jane.smith@example.com",
    service: "Vaccine - Dose 2",
    center: "Dhaka Medical College",
    dateTime: "2025-11-10T11:00:00.000Z",
    status: "pending",
  },
  {
    id: "APP-003",
    patientName: "Emma Rodriguez",
    patientEmail: "emma.rodriguez@example.com",
    service: "Booster Dose",
    center: "Sylhet MAG Osmani Medical",
    dateTime: "2025-11-09T14:00:00.000Z",
    status: "completed",
  },
  {
    id: "APP-004",
    patientName: "James Wilson",
    patientEmail: "james.wilson@example.com",
    service: "Vaccine - Dose 1",
    center: "Chattogram Medical",
    dateTime: "2025-11-11T10:30:00.000Z",
    status: "canceled",
  },
  {
    id: "APP-005",
    patientName: "Olivia Martinez",
    patientEmail: "olivia.martinez@example.com",
    service: "Vaccine - Dose 1",
    center: "Dhaka Medical College",
    dateTime: "2025-11-12T15:00:00.000Z",
    status: "pending",
  },
  {
    id: "APP-006",
    patientName: "Lucas Anderson",
    patientEmail: "lucas.anderson@example.com",
    service: "Booster Dose",
    center: "Sylhet MAG Osmani Medical",
    dateTime: "2025-11-12T09:00:00.000Z",
    status: "confirmed",
  },
  {
    id: "APP-007",
    patientName: "Sophia Taylor",
    patientEmail: "sophia.taylor@example.com",
    service: "Vaccine - Dose 2",
    center: "Chattogram Medical",
    dateTime: "2025-11-08T16:30:00.000Z",
    status: "completed",
  },
];

// --- 2. UPDATED STATUS BADGE FUNCTION (WITH ICONS) ---

function getStatusBadge(status: Appointment["status"]) {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20 border-0"
        >
          <Clock className="mr-1 h-3.5 w-3.5" />
          Pending
        </Badge>
      );
    case "confirmed":
      return (
        <Badge
          variant="outline"
          className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 border-0"
        >
          <CheckCircle className="mr-1 h-3.5 w-3.5" />
          Confirmed
        </Badge>
      );
    case "completed":
      return (
        <Badge
          variant="outline"
          className="bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0"
        >
          <CheckCircle className="mr-1 h-3.5 w-3.5" />
          Completed
        </Badge>
      );
    case "canceled":
      return (
        <Badge
          variant="outline"
          className="bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0"
        >
          <XCircle className="mr-1 h-3.5 w-3.5" />
          Canceled
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

// --- 3. THE NEW PAGINATION CONTROLS COMPONENT ---

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// --- 4. THE MAIN APPOINTMENT TABLE COMPONENT ---

const ITEMS_PER_PAGE = 5;

export default function AppointmentTable() {
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: AppointmentActionType;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Memoize paginated data
  const { paginatedData, totalPages } = useMemo(() => {
    const total = Math.ceil(appointmentsData.length / ITEMS_PER_PAGE);
    const data = appointmentsData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
    return { paginatedData: data, totalPages: total };
  }, [currentPage]);

  const isActionPending = (
    action: AppointmentActionType,
    appointmentId: string,
  ) =>
    pendingAction?.id === appointmentId && pendingAction.type === action;

  const isRowBusy = (appointmentId: string) =>
    pendingAction?.id === appointmentId;

  const handleAction = (
    appointment: Appointment,
    actionType: AppointmentActionType,
  ) => {
    setPendingAction({ id: appointment.id, type: actionType });
    // Simulate API call
    setTimeout(() => {
      setPendingAction(null);
      console.log(
        `Action "${actionType}" completed for appointment:`,
        appointment.id,
      );
      // Here you would refetch data or update state
    }, 1000);
  };

  const renderAppointmentRow = (appointment: Appointment) => {
    const busy = isRowBusy(appointment.id);
    const reschedulePending = isActionPending("reschedule", appointment.id);
    const cancelPending = isActionPending("cancel", appointment.id);
    const viewPending = isActionPending("view", appointment.id);

    const canModify =
      appointment.status === "pending" || appointment.status === "confirmed";

    return (
      <TableRow key={appointment.id} className="hover:bg-muted/50">
        {/* Patient Cell */}
        <TableCell className="h-10 px-4 font-medium">
          <div>{appointment.patientName}</div>
          <div className="text-xs font-normal text-muted-foreground">
            {appointment.patientEmail}
          </div>
        </TableCell>

        {/* Service Cell */}
        <TableCell className="h-10 px-4">
          <div>{appointment.service}</div>
          <div className="text-xs text-muted-foreground">
            {appointment.center}
          </div>
        </TableCell>

        {/* Date Cell */}
        <TableCell className="h-10 px-4 text-sm text-muted-foreground">
          {format(new Date(appointment.dateTime), "MMM dd, yyyy - p")}
        </TableCell>

        {/* Status Cell */}
        <TableCell className="h-10 px-4">
          {getStatusBadge(appointment.status)}
        </TableCell>

        {/* Actions Cell */}
        <TableCell className="h-10 px-4">
          <TooltipProvider>
            <div className="flex items-center gap-1">
              {canModify && (
                <>
                  {/* Reschedule Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleAction(appointment, "reschedule")}
                        disabled={busy}
                      >
                        {reschedulePending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <CalendarDaysIcon className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reschedule</TooltipContent>
                  </Tooltip>

                  {/* Cancel Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive hover:text-white"
                        onClick={() => handleAction(appointment, "cancel")}
                        disabled={busy}
                      >
                        {cancelPending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Trash2Icon className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Cancel Appointment</TooltipContent>
                  </Tooltip>
                </>
              )}

              {/* View Details Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction(appointment, "view")}
                    disabled={busy && !viewPending}
                  >
                    {viewPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <FileTextIcon className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="rounded-lg border bg-card w-full">
      <h3 className="p-4 text-lg font-semibold">Scheduled Appointments</h3>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="h-10 px-3 font-medium">Patient</TableHead>
            <TableHead className="h-10 px-3 font-medium">Service</TableHead>
            <TableHead className="h-10 px-3 font-medium">Date & Time</TableHead>
            <TableHead className="h-10 px-3 font-medium w-[120px]">
              Status
            </TableHead>
            <TableHead className="h-10 px-3 font-medium w-[180px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{paginatedData.map(renderAppointmentRow)}</TableBody>
      </Table>
      
      {/* --- 5. PAGINATION COMPONENT IN USE --- */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}