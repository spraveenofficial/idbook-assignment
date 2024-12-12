"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserListType } from "@/types/user.types";

export default function UserTable() {
  const columns: ColumnDef<UserListType>[] = [
    {
      accessorKey: "name",
      header: ({ table }) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            ref={(ref) => {
              if (ref) {
                ref.indeterminate =
                  table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected();
              }
            }}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="mr-4" // Margin for spacing
          />
          Id
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="mr-4" // Margin for spacing
          />
          <div className="flex justify-center items-center gap-3">
            <div className="flex-col gap-1">
              <h3>{row.original.name}</h3>
            </div>
          </div>
        </div>
      ),
      size: 100, // Set a width for the Employee Name column
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.name,
      size: 180
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email,
      size: 180,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => row.original.role,
      size: 100, // Width for "Total"
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: [],
    columns,
    state: {
      sorting,
    },
    enableRowSelection: true, // Enable row selection
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full h-full overflow-y-scroll mt-4 font-manrope scrollbar-hide">
      <Table className="relative border-collapse">
        <TableHeader className="sticky top-0 bg-[#323B49] z-10 border-none">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none">
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={`text-[#CBD5E0] text-[12px] font-[700] z-10 ${
                    index === 0
                      ? "rounded-tl-[10px] rounded-bl-[10px]"
                      : index === headerGroup.headers.length - 1
                      ? "rounded-tr-[10px] rounded-br-[10px]"
                      : ""
                  }`}
                  style={{
                    width: header.column.columnDef.size,
                    backgroundColor: "#323B49",
                    borderBottom: "none",
                  }}
                >
                  <span className="flex items-center gap-3 font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-0">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={`text-white text-[12px] font-medium border-b-[1px] border-[#323B49] ${
                    rowIndex === 0 ? "border-t-0" : ""
                  }`}
                  style={{
                    width: cell.column.columnDef.size,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
