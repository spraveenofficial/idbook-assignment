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
  
  const { openModal, closeModal } = useModal();
  const [tableHeight, setTableHeight] = useState<string | number>("auto");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState<number>(0);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const { isLoading, isFetching, error, data } = useQuery<
    ApiBaseResponseType<UserListType[]>,
    AxiosError<AxiosErrorResponseType>
  >(["userData", currentPage], () => userServices.getUserList(currentPage), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
    cacheTime: 1000 * 60 * 10, // 10 minutes - data remains cached in memory
    onSuccess(data) {
      setTotalPages(data.total_pages);
      setTotalData(data.total);
      setLimit(data.per_page);
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

  return (
    <div className="m-4 overflow-hidden">
      <div className="flex justify-end gap-2">
        <Input
          type="email"
          placeholder="Search User"
          className="w-1/3 focus:bg-transparent"
        />
        <Button onClick={handleOpenAddUserModal}>Add New User</Button>
      </div>

      {!isLoading && userData?.length > 0 && (
        <Fragment>
          <div className="overflow-hidden" style={{ height: tableHeight }}>
            <UserTable data={userData} />
          </div>
          <Pagination
            totalPages={data?.total_pages as number}
            currentPage={data?.page as number}
            setCurrentPage={setCurrentPage}
            totalData={totalData}
            limit={limit}
            setLimit={setLimit}
          />
        </Fragment>
      )}
    </div>
  );
}
