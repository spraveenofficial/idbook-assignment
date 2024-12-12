import { axiosInstance } from "@/lib/axios";
import { ApiBaseResponseType } from "@/types/response.types";
import { UserListType } from "@/types/user.types";

class UserServices {
  public async getUserList(): Promise<ApiBaseResponseType<UserListType[]>> {
    const { data } = await axiosInstance.get<ApiBaseResponseType<UserListType[]>>("/users");
    return data;
  }
}

const userServices = new UserServices();

export { userServices };
