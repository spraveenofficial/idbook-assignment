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
import { useMutation } from "react-query";
import { userServices } from "@/services/user.services";
import { toast } from "sonner";

type UserTableProps = {
  data: UserListType[];
  deleteUser?: (userId: string) => void;
  handleEdit?: (userObj: UserListType) => void;
  isLoading?: boolean;
};

export default function UserTable({ data, deleteUser, handleEdit, isLoading }: UserTableProps) {
  const { mutate } = useMutation<any, any, any>(
    (payload) => userServices.deleteUser(payload), // API call for creating leave
    {
      onSuccess: (_, variable) => {
        deleteUser && deleteUser(variable);
        toast("User Deleted successfully");
      },
      onError: (error) => {
        toast("Failed to delete user");
      },
    }
  );

  const handleDelete = async (userId: string) => {
    await mutate(userId);
  };

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
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.first_name + " " + row.original.last_name,
      size: 180,
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email,
      size: 180,
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => row.original.role ?? "N/A",
      size: 100, // Width for "Total"
    },
    {
      accessorKey: "actions",
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
            <DropdownMenuGroup onClick={() => {
                handleEdit && handleEdit(row.original);
            }} className="font-sans">
              <DropdownMenuItem className="hover:opacity-80 cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  handleDelete(row.original.id);
                }}
                className="text-red-600 hover:opacity-80 cursor-pointer"
              >
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
          {/* Check if data length is zero */}
          {!isLoading && data.length === 0 && (
            <TableRow>
              <TableCell
                className="text-black text-[12px] font-medium border-b-[1px] border-[#323B49]"
                colSpan={columns.length}
              >
                No data found
              </TableCell>
            </TableRow>
          )}
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
