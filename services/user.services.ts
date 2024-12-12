import { axiosInstance } from "@/lib/axios";
import { ApiBaseResponseType } from "@/types/response.types";
import { CreateUserPayloadType, UserListType } from "@/types/user.types";

class UserServices {
  public async getUserList(currentPage?: number): Promise<ApiBaseResponseType<UserListType[]>> {
    const params = new URLSearchParams();
    if (currentPage) params.append("page", String(currentPage));
    const { data } = await axiosInstance.get<ApiBaseResponseType<UserListType[]>>(`/users?${params}`);
    return data;
  }


  public async createUser(data: CreateUserPayloadType): Promise<ApiBaseResponseType<UserListType>> {
    const { data: responseData } = await axiosInstance.post<ApiBaseResponseType<UserListType>>("/users", data);
    return responseData;
  }


  public async deleteUser(id: string): Promise<ApiBaseResponseType<UserListType>> {
    const { data } = await axiosInstance.delete<ApiBaseResponseType<UserListType>>(`/users/${id}`);
    return data;
  }
}

const userServices = new UserServices();

export { userServices };
