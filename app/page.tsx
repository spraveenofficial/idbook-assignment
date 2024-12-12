'use client';

import UserTable from "@/components/common/UserTable/usertable";
import { userServices } from "@/services/user.services";
import { ApiBaseResponseType, AxiosErrorResponseType } from "@/types/response.types";
import { UserListType } from "@/types/user.types";
import { AxiosError } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Home() {

  const [userData, setUserData] = useState<UserListType[]>([]);

  const { isLoading, isFetching, error, data } = useQuery<
    ApiBaseResponseType<UserListType[]>,
    AxiosError<AxiosErrorResponseType>
  >(["officeData"], () => userServices.getUserList(), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
    cacheTime: 1000 * 60 * 10, // 10 minutes - data remains cached in memory

    onSuccess(data) {
      setUserData(data.data);
    },
  });


  return (
    <div>
      <h1 className="text-4xl text-red-500">Tailwind css</h1>

      <UserTable data={userData} />
    </div>
  );
}
