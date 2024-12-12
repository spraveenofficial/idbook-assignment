"use client";

import { CreditCard, EllipsisVertical, Trash } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserListType } from "@/types/user.types";

type UserTableProps = {
  data: UserListType[];
};

export default function UserTable({ data }: UserTableProps) {
  const columns: ColumnDef<UserListType>[] = [
    {
      accessorKey: "id",
      header: ({ table }) => <div className="flex items-center ml-4">Id</div>,
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="flex justify-center items-center ml-4">
            <div className="flex-col gap-1">
              <h3>{row.original.id}</h3>
            </div>
          </div>
        </div>
      ),
      size: 50,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.first_name + " " + row.original.last_name,
      size: 180,
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
      cell: ({ row }) => row.original.role ?? "N/A",
      size: 100, // Width for "Total"
    },
    {
      accessorKey: "role",
      header: "Action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="h-5 w-5 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 dark:bg-darkBg bg-white border-grey border-[0.5px] text-black dark:text-white font-manrope">
            <DropdownMenuLabel className="border-b-grey border-b pb-3">
              User Actions
            </DropdownMenuLabel>
            <DropdownMenuGroup className="font-sans">
              <DropdownMenuItem className="hover:opacity-80 cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 hover:opacity-80 cursor-pointer">
                <Trash className="mr-2 h-4 w-4" />
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 20, // Width for "Total"
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
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
                  className={`text-black text-[12px] font-medium border-b-[1px] border-[#323B49] ${
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
