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
  XIcon, // <-- Added for clearing date
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import {
  ColumnDef,
  ColumnFiltersState, // --- !! NEW !! ---
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, // --- !! NEW !! ---
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // --- !! NEW !! ---
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

// --- 1. DATA INTERFACE & MOCK DATA ---
// (Data ekhane same ache)
interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  service: string;
  center: string;
  dateTime: string;
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


// --- 2. STATUS BADGE FUNCTION ---
// (Ei function-e kono change nai)
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

// --- 3. PAGINATION CONTROLS COMPONENT ---
// (Ei component-e kono change nai)
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

  // --- !! NEW !! ---
  // Filtering-er jonno state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // --- !! NEW !! ---


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
    setTimeout(() => {
      setPendingAction(null);
      console.log(
        `Action "${actionType}" completed for appointment:`,
        appointment.id,
      );
    }, 1000);
  };

  const columns: ColumnDef<Appointment>[] = [
    {
      accessorKey: "patientName",
      header: "Patient",
      cell: ({ row }) => (
        <div className="h-10 px-4 font-medium">
          <div>{row.original.patientName}</div>
          <div className="text-xs font-normal text-muted-foreground">
            {row.original.patientEmail}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => (
        <div className="h-10 px-4">
          <div>{row.original.service}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.center}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "dateTime",
      header: "Date & Time",
      cell: ({ row }) => (
        <div className="h-10 px-4 text-sm text-muted-foreground">
          {format(new Date(row.original.dateTime), "MMM dd, yyyy - p")}
        </div>
      ),
      // --- !! NEW !! ---
      // Date filter korar custom logic
      filterFn: (row, columnId, filterValue) => {
        const filterDateStr = filterValue as string;
        if (!filterDateStr) return true; // Kono date select na korle
        const rowDateStr = row.getValue(columnId) as string; // "2025-11-10T09:30:00.000Z"
        // Shudhu "YYYY-MM-DD" ongsho-ta compare korbe
        return rowDateStr.startsWith(filterDateStr);
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="h-10 px-4">{getStatusBadge(row.original.status)}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const appointment = row.original;
        const busy = isRowBusy(appointment.id);
        const reschedulePending = isActionPending("reschedule", appointment.id);
        const cancelPending = isActionPending("cancel", appointment.id);
        const viewPending = isActionPending("view", appointment.id);
        const canModify =
          appointment.status === "pending" ||
          appointment.status === "confirmed";

        return (
          <div className="h-10 px-4">
            <TooltipProvider>
              <div className="flex items-center gap-1">
                {canModify && (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleAction(appointment, "reschedule")
                          }
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
          </div>
        );
      },
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE,
  });

  const table = useReactTable({
    data: appointmentsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    // --- !! NEW !! ---
    // Filtering setup
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // --- !! NEW !! ---
    state: {
      pagination,
      columnFilters, // --- !! NEW !! ---
    },
  });

  // --- !! NEW !! ---
  // Helper variable for checking if date filter is active
  const dateFilterValue = table.getColumn("dateTime")?.getFilterValue();
  // --- !! NEW !! ---

  return (
    <div className="rounded-lg border bg-card w-full">
      <h3 className="p-4 text-lg font-semibold">Scheduled Appointments</h3>

      {/* --- !! NEW !! --- */}
      {/* Filtering Toolbar */}
      <div className="flex items-center justify-between p-4">
        {/* Search Input */}
        <Input
          placeholder="Search by patient name..."
          value={
            (table.getColumn("patientName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("patientName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Date Filter (No new package) */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={(dateFilterValue as string) ?? ""}
            onChange={(event) =>
              table.getColumn("dateTime")?.setFilterValue(event.target.value)
            }
            // shadcn/ui Input component-er moton style deyar jonno
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ colorScheme: "dark" }} // Dark mode-e calendar icon-ke shada rakhe
          />
          {!!dateFilterValue && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                table.getColumn("dateTime")?.setFilterValue(undefined)
              }
            >
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {/* --- !! NEW !! (Toolbar Shesh) --- */}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="hover:bg-transparent border-b"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="h-10 px-3 font-medium">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No appointments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <PaginationControls
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        onPageChange={(page) => table.setPageIndex(page - 1)}
      />
    </div>
  );
}