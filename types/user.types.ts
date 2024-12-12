export interface UserListType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avatar: string;
}



export interface CreateUserPayloadType {
    first_name: string;
    last_name: string;
    email: string;
}