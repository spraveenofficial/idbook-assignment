import { axiosInstance } from "@/lib/axios";
import { ApiBaseResponseType } from "@/types/response.types";
import { UserListType } from "@/types/user.types";

class UserServices {
  public async getUserList(currentPage?: number): Promise<ApiBaseResponseType<UserListType[]>> {
    const params = new URLSearchParams();
    if (currentPage) params.append("page", String(currentPage));
    const { data } = await axiosInstance.get<ApiBaseResponseType<UserListType[]>>(`/users?${params}`);
    return data;
  }
}

const userServices = new UserServices();

export { userServices };
