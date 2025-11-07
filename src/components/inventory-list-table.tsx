"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileTextIcon,
  Loader2,
  PencilIcon,
  Trash2Icon,
  XIcon, // <-- Added for clearing filters
} from "lucide-react";
import { useState } from "react";
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
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  code: string | null;
  name: string;
  manufacturer: string | null;
  antigen: string | null;
  series_name: string | null;
  dose_count: number;
  dose_volume: string | null;
  dose_unit: string | null;
  route: string | null;
  site_examples: string | null;
  min_age_months: number;
  notes: string | null;
}

type VaccineActionType = "edit" | "delete" | "view";

const vaccineData: Vaccine[] = [
  {
    id: "VAC-001",
    createdAt: new Date(),
    createdBy: "user-1",
    updatedAt: new Date(),
    code: "CVX-207",
    name: "COVID-19 (Moderna)",
    manufacturer: "Moderna",
    antigen: "SARS-CoV-2",
    series_name: "Primary series",
    dose_count: 2,
    dose_volume: "0.5",
    dose_unit: "ml",
    route: "IM",
    site_examples: "Deltoid",
    min_age_months: 216, // 18 years
    notes: "mRNA vaccine",
  },
  {
    id: "VAC-002",
    createdAt: new Date(),
    createdBy: "user-1",
    updatedAt: new Date(),
    code: "CVX-208",
    name: "COVID-19 (Pfizer)",
    manufacturer: "Pfizer-BioNTech",
    antigen: "SARS-CoV-2",
    series_name: "Primary series",
    dose_count: 2,
    dose_volume: "0.3",
    dose_unit: "ml",
    route: "IM",
    site_examples: "Deltoid",
    min_age_months: 72, // 6 months
    notes: "mRNA vaccine",
  },
  {
    id: "VAC-003",
    createdAt: new Date(),
    createdBy: "user-1",
    updatedAt: new Date(),
    code: "CVX-03",
    name: "MMR (Measles, Mumps, Rubella)",
    manufacturer: "Merck",
    antigen: "Measles, Mumps, Rubella",
    series_name: "Primary series",
    dose_count: 2,
    dose_volume: "0.5",
    dose_unit: "ml",
    route: "SC",
    site_examples: "Upper arm",
    min_age_months: 12,
    notes: "Live attenuated vaccine",
  },
  {
    id: "VAC-004",
    createdAt: new Date(),
    createdBy: "user-1",
    updatedAt: new Date(),
    code: "CVX-21",
    name: "Varicella (Chickenpox)",
    manufacturer: "Merck",
    antigen: "Varicella-zoster",
    series_name: "Primary series",
    dose_count: 2,
    dose_volume: "0.5",
    dose_unit: "ml",
    route: "SC",
    site_examples: "Upper arm",
    min_age_months: 12,
    notes: "Live attenuated vaccine",
  },
  {
    id: "VAC-005",
    createdAt: new Date(),
    createdBy: "user-1",
    updatedAt: new Date(),
    code: "CVX-20",
    name: "DTaP (Diphtheria, Tetanus, Pertussis)",
    manufacturer: "Sanofi Pasteur",
    antigen: "Diphtheria, Tetanus, Pertussis",
    series_name: "Primary series",
    dose_count: 5,
    dose_volume: "0.5",
    dose_unit: "ml",
    route: "IM",
    site_examples: "Anterolateral thigh, deltoid",
    min_age_months: 2,
    notes: "Inactivated vaccine",
  },
];

// --- 2. ROUTE BADGE FUNCTION ---
function getRouteBadge(route: string | null) {
  if (!route) return <Badge variant="secondary">N/A</Badge>;

  switch (route.toUpperCase()) {
    case "IM":
      return (
        <Badge
          variant="outline"
          className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 border-0"
        >
          Intramuscular
        </Badge>
      );
    case "SC":
      return (
        <Badge
          variant="outline"
          className="bg-purple-500/15 text-purple-700 hover:bg-purple-500/25 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20 border-0"
        >
          Subcutaneous
        </Badge>
      );
    case "PO":
      return (
        <Badge
          variant="outline"
          className="bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0"
        >
          Oral
        </Badge>
      );
    default:
      return <Badge variant="secondary">{route}</Badge>;
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

export default function VaccineTable({ data }: { data: Vaccine[] }) {
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
      header: "Vaccine",
      cell: ({ row }) => (
        <div className="h-10 px-4 font-medium">
          <div>{row.original.name}</div>
          <div className="text-xs font-normal text-muted-foreground">
            Code: {row.original.code || "N/A"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
      cell: ({ row }) => (
        <div className="h-10 px-4 text-sm text-muted-foreground">
          {row.original.manufacturer || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "antigen",
      header: "Antigen",
      cell: ({ row }) => (
        <div className="h-10 px-4 text-sm text-muted-foreground">
          {row.original.antigen || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "dose_count",
      header: "Doses",
      cell: ({ row }) => (
        <div className="h-10 px-4 text-sm text-muted-foreground">
          {row.original.dose_count} dose{row.original.dose_count !== 1 ? "s" : ""}
          {row.original.dose_volume && (
            <div className="text-xs">
              ({row.original.dose_volume} {row.original.dose_unit})
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "route",
      header: "Route",
      cell: ({ row }) => (
        <div className="h-10 px-4">{getRouteBadge(row.original.route)}</div>
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
    data: data,
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

  // --- !! REMOVED !! ---
  // renderVaccineRow function is no longer needed

  return (
    <div className="rounded-lg border bg-card w-full">
      <h3 className="p-4 text-lg font-semibold">Vaccine Stock List</h3>

      {/* --- !! NEW !! --- */}
      {/* Filtering Toolbar */}
      <div className="flex items-center justify-between gap-4 p-4">
        {/* Search Input */}
        <Input
          placeholder="Search by vaccine name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Manufacturer Filter */}
        <Input
          placeholder="Filter by manufacturer..."
          value={(table.getColumn("manufacturer")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("manufacturer")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        {/* Clear Filters Button */}
        {columnFilters.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-10 px-4"
          >
            <XIcon className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
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
