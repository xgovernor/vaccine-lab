"use client";

import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileTextIcon,
  Loader2,
  PackageX,
  PencilIcon,
  Trash2Icon,
  XIcon, // <-- Added for clearing date
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import {
  ColumnDef,
  ColumnFiltersState, // <-- Added
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, // <-- Added
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"; // <-- Updated imports
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // <-- Added
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

interface Vaccine {
  id: string;
  name: string;
  batchNumber: string;
  expiryDate: string; // Using ISO string for date
  quantity: number;
  status: "available" | "out-of-stock";
}

type VaccineActionType = "edit" | "delete" | "view";

const vaccineData: Vaccine[] = [
  // ... (Apnar data ekhane)
  {
    id: "VAC-001",
    name: "Moderna (Spikevax)",
    batchNumber: "MDRN-B-112A",
    expiryDate: "2026-10-31T00:00:00.000Z",
    quantity: 500,
    status: "available",
  },
  {
    id: "VAC-002",
    name: "Pfizer (Comirnaty)",
    batchNumber: "PFIZ-C-987B",
    expiryDate: "2026-12-31T00:00:00.000Z",
    quantity: 1200,
    status: "available",
  },
  {
    id: "VAC-003",
    name: "Sinopharm (BBIBP)",
    batchNumber: "SINO-A-45C",
    expiryDate: "2025-09-15T00:00:00.000Z",
    quantity: 0,
    status: "out-of-stock",
  },
  {
    id: "VAC-004",
    name: "AstraZeneca (Vaxzevria)",
    batchNumber: "AZ-V-77D",
    expiryDate: "2026-08-30T00:00:00.000Z",
    quantity: 350,
    status: "available",
  },
  {
    id: "VAC-005",
    name: "Johnson & Johnson",
    batchNumber: "JNJ-B-101E",
    expiryDate: "2026-11-20T00:00:00.000Z",
    quantity: 80,
    status: "available",
  },
  {
    id: "VAC-006",
    name: "Sinovac (CoronaVac)",
    batchNumber: "SINO-V-55F",
    expiryDate: "2025-10-10T00:00:00.000Z",
    quantity: 0,
    status: "out-of-stock",
  },
  {
    id: "VAC-007",
    name: "Moderna (Spikevax)",
    batchNumber: "MDRN-B-113A",
    expiryDate: "2026-11-30T00:00:00.000Z",
    quantity: 240,
    status: "available",
  },
];

// --- 2. STATUS BADGE FUNCTION ---
// (No change)
function getStatusBadge(status: Vaccine["status"]) {
  switch (status) {
    case "available":
      return (
        <Badge
          variant="outline"
          className="bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0"
        >
          <CheckCircle className="mr-1 h-3.5 w-3.5" />
          Available
        </Badge>
      );
    case "out-of-stock":
      return (
        <Badge
          variant="outline"
          className="bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0"
        >
          <PackageX className="mr-1 h-3.5 w-3.5" />
          Out of Stock
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

// --- 3. PAGINATION CONTROLS COMPONENT ---
// (No change)
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

// --- 4. THE MAIN VACCINE TABLE COMPONENT ---

const ITEMS_PER_PAGE = 5;

export default function VaccineTable() {
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: VaccineActionType;
  } | null>(null);

  // --- !! NEW !! ---
  // Filtering state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // --- !! NEW !! ---

  const isActionPending = (action: VaccineActionType, vaccineId: string) =>
    pendingAction?.id === vaccineId && pendingAction.type === action;

  const isRowBusy = (vaccineId: string) => pendingAction?.id === vaccineId;

  const handleAction = (vaccine: Vaccine, actionType: VaccineActionType) => {
    setPendingAction({ id: vaccine.id, type: actionType });
    setTimeout(() => {
      setPendingAction(null);
      console.log(`Action "${actionType}" completed for vaccine:`, vaccine.name);
    }, 1000);
  };

  // --- !! UPDATED !! ---
  // Columns definition for TanStack Table
  const columns: ColumnDef<Vaccine>[] = [
    {
      accessorKey: "name",

      header: "Vaccine",//updated head
      cell: ({ row }) => (
        <div className="h-10 px-4 font-medium">
          <div>{row.original.name}</div>
          <div className="text-xs font-normal text-muted-foreground">
            Batch: {row.original.batchNumber}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
      cell: ({ row }) => (
        <div className="h-10 px-4 text-sm text-muted-foreground">
          {format(new Date(row.original.expiryDate), "MMM dd, yyyy")}
        </div>
      ),
      // Custom date filter logic
      filterFn: (row, columnId, filterValue) => {
        const filterDateStr = filterValue as string;
        if (!filterDateStr) return true;
        const rowDateStr = row.getValue(columnId) as string;
        return rowDateStr.startsWith(filterDateStr);
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <div className="h-10 px-4 text-sm text-muted-foreground">
          {row.original.quantity.toLocaleString()} units
        </div>
      ),
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
        const vaccine = row.original;
        const busy = isRowBusy(vaccine.id);
        const editPending = isActionPending("edit", vaccine.id);
        const deletePending = isActionPending("delete", vaccine.id);
        const viewPending = isActionPending("view", vaccine.id);

        return (
          <div className="h-10 px-4">
            <TooltipProvider>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleAction(vaccine, "edit")}
                      disabled={busy}
                    >
                      {editPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <PencilIcon className="size-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit Stock</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-white"
                      onClick={() => handleAction(vaccine, "delete")}
                      disabled={busy}
                    >
                      {deletePending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2Icon className="size-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete Batch</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleAction(vaccine, "view")}
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

  // --- !! UPDATED !! ---
  // Removed currentPage and useMemo
  // Added pagination state for TanStack Table
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE,
  });

  // --- !! UPDATED !! ---
  // TanStack Table hook setup
  const table = useReactTable({
    data: vaccineData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    // Filtering setup
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      columnFilters,
    },
  });

  // Helper variable for date filter
  const dateFilterValue = table.getColumn("expiryDate")?.getFilterValue();

  // --- !! REMOVED !! ---
  // renderVaccineRow function is no longer needed

  return (
    <div className="rounded-lg border bg-card w-full">
      <h3 className="p-4 text-lg font-semibold">Vaccine Stock List</h3>

      {/* --- !! NEW !! --- */}
      {/* Filtering Toolbar */}
      <div className="flex items-center justify-between p-4">
        {/* Search Input */}
        <Input
          placeholder="Search by vaccine name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Date Filter (No new package) */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={(dateFilterValue as string) ?? ""}
            onChange={(event) =>
              table.getColumn("expiryDate")?.setFilterValue(event.target.value)
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ colorScheme: "dark" }}
          />
          {!!dateFilterValue && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                table.getColumn("expiryDate")?.setFilterValue(undefined)
              }
            >
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {/* --- !! NEW !! (Toolbar Shesh) --- */}

      <Table>
        {/* --- !! UPDATED !! --- */}
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

        {/* --- !! UPDATED !! --- */}
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
                No vaccines found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* --- !! UPDATED !! --- */}
      <PaginationControls
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        onPageChange={(page) => table.setPageIndex(page - 1)}
      />
    </div>
  );
}