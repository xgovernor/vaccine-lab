"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Session } from "@/lib/auth-client";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Link from "next/link";



const columns: ColumnDef<Session["user"]>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <Link className="font-medium" href={`/dashboard/users/${row.original.id}`}>{name}</Link>;
    }
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];


export default function UsersTable({ users }: { users: Session["user"][] }) {
  const table = useReactTable({ data: users, columns, getCoreRowModel: getCoreRowModel() })

  console.log("Users", users)


  return (
    <div className="rounded-lg border bg-card w-[95%]">
      <h3 className="p-4 text-lg font-semibold">Registered Users</h3>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="hover:bg-transparent border-b">
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="h-10 px-3 font-medium">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}

              <TableHead className="h-10 px-3 font-medium w-[180px]">
                Actions
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>


        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="h-10 px-4 font-medium">
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
