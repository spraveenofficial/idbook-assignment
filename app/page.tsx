"use client";

import UserTable from "@/components/common/UserTable/usertable";
import { userServices } from "@/services/user.services";
import {
  ApiBaseResponseType,
  AxiosErrorResponseType,
} from "@/types/response.types";
import { UserListType } from "@/types/user.types";
import { AxiosError } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useEffect, useState } from "react";
import Pagination from "@/components/common/TablePagination";
import { useModal } from "@/contexts/modal-context";
import ManageUserModal from "@/components/common/AddOrEditUserModal";
import { ModalContentEnum } from "@/types/common.types";

export default function Home() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { openModal } = useModal();
  const [tableHeight, setTableHeight] = useState<string | number>("auto");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState<number>(0);

  const { isLoading, isFetching, error, data, refetch } = useQuery<
    ApiBaseResponseType<UserListType[]>,
    AxiosError<AxiosErrorResponseType>
  >(["userData", currentPage], () => userServices.getUserList(currentPage), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
    cacheTime: 1000 * 60 * 10, // 10 minutes - data remains cached in memory
    onSuccess(data) {
      setTotalData(data.total);
    },
  });

  const userData: UserListType[] = data?.data || [];


  const addNewUser = (newUser: UserListType) => {
    queryClient.setQueryData<ApiBaseResponseType<UserListType[]>>(
      ["userData", currentPage],
      (oldData: any) => {
        console.log("oldData", oldData);
        if (!oldData) return null;

        // Update the results array
        const updatedResults = [newUser, ...oldData.data];

        // Return the updated data structure
        return {
          ...oldData,
          data: updatedResults,
          total: oldData.total + 1,
        };
      },
    );
  }

  const deleteUserByUserId = (userId: string) => {
    queryClient.setQueryData<ApiBaseResponseType<UserListType[]>>(
      ["userData", currentPage],
      (oldData: any) => {
        if (!oldData) return null;

        // Update the results array
        const updatedResults = oldData.data.filter((user: UserListType) => user.id.toString() !== userId.toString());

        // Return the updated data structure
        return {
          ...oldData,
          data: updatedResults,
          total: oldData.total - 1,
        };
      },
    );
  };

  const editUser = (editedUser: UserListType) => {
    queryClient.setQueryData<ApiBaseResponseType<UserListType[]>>(
      ["userData", currentPage],
      (oldData: any) => {
        if (!oldData) return null;

        // Update the results array
        const updatedResults = oldData.data.map((user: UserListType) => {
          if (user.id.toString() === editedUser.id.toString()) {
            return editedUser;
          }
          return user;
        });

        // Return the updated data structure
        return {
          ...oldData,
          data: updatedResults,
        };
      },
    );
  }

  useEffect(() => {
    const handleResize = () => {
      const paginationHeight = 70;
      const availableHeight = window.innerHeight - 350 - paginationHeight;
      setTableHeight(Math.max(availableHeight, 0));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenAddUserModal = () => {
    openModal(<ManageUserModal type={ModalContentEnum.CREATE} addUser={addNewUser} />);
  };

  const handleOpenEditUserModal = (userObj: UserListType) => {
    openModal(<ManageUserModal type={ModalContentEnum.EDIT} userObj={userObj} editUser={editUser} />);
  };

  useEffect(() => {
    // Search the user by name and email without api call
    if (!searchQuery) return;

    const searchResults = userData.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase()) || user.email.includes(searchQuery.toLowerCase());
    });

    queryClient.setQueryData<ApiBaseResponseType<UserListType[]>>(["userData", currentPage], (oldData: any) => {
      if (!oldData) return null;

      return {
        ...oldData,
        data: searchResults,
        total: searchResults.length,
      };
    });

  }, [searchQuery]);

  const handleTypeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === ""){
      refetch();
    }
    setSearchQuery(e.target.value);
  }

  return (
    <div className="m-4 overflow-hidden">
      <div className="flex justify-end gap-2">
        <Input
          type="email"
          placeholder="Search User"
          className="w-1/3 focus:bg-transparent"
          onChange={handleTypeSearch}
        />
        <Button onClick={handleOpenAddUserModal}>Add New User</Button>
      </div>

      {!isLoading && userData?.length > 0 && (
        <Fragment>
          <div className="overflow-hidden" style={{ height: tableHeight }}>
            <UserTable data={userData} deleteUser={deleteUserByUserId} handleEdit={handleOpenEditUserModal} />
          </div>
          <Pagination
            totalPages={data?.total_pages as number}
            currentPage={data?.page as number}
            setCurrentPage={setCurrentPage}
            totalData={totalData}
            limit={data?.data.length as number}
          />
        </Fragment>
      )}
    </div>
  );
}
