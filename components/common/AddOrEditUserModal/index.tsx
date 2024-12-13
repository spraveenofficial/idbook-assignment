import { ModalContentEnum } from "@/types/common.types";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addEmployeeSchema } from "./validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { userServices } from "@/services/user.services";
import { toast } from "sonner";
import { useModal } from "@/contexts/modal-context";
import { UserListType } from "@/types/user.types";

type Props = {
  type: ModalContentEnum;
  addUser?: (payload: UserListType) => void;
  userObj?: UserListType;
  editUser?: (payload: UserListType) => void;
};

const ManageUserModal = (props: Props) => {
  const { type } = props;
  const { closeModal } = useModal();

  const defaultValues = type === ModalContentEnum.EDIT ? props.userObj : {};
  const form = useForm<any>({
    defaultValues: defaultValues,
    resolver: zodResolver(addEmployeeSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
   if(type === ModalContentEnum.CREATE){
    await mutate(data);
   }else{
    await editMutate(data);
   }
  };

  const { mutate, isLoading } = useMutation<any, any, any>(
    (data) => userServices.createUser(data), // API call for creating leave
    {
      onSuccess: (data: UserListType) => {
        props.addUser && props.addUser(data);
        toast("User added successfully");
        closeModal();
      },
      onError: (error) => {
        toast("Failed to add user");
      },
    }
  );

  const { mutate: editMutate, isLoading: isEditLoading } = useMutation<any, any, any>(
    (data) => userServices.updateUser(data, props.userObj?.id as string), // API call for creating leave
    {
      onSuccess: (data: UserListType) => {
        props.editUser && props.editUser({ ...data, id: props.userObj?.id as string });
        toast("User edited successfully");
        closeModal();
      },
      onError: (error) => {
        toast("Failed to edit user");
      },
    }
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-center w-full text-xl font-semibold m-0 p-0">
        {type === ModalContentEnum.CREATE ? "Add User" : "Edit User"}
      </h1>

      <Form {...form}>
        <FormField
          name="first_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-thin">
                First Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter First Name"
                  className={` flex focus:border-green-500 rounded-[6px] font-thin text-sm bg-transparent sm:h-12 h-6 ${
                    form.formState.errors.title
                      ? "border-red-600 placeholder:text-red-600"
                      : ""
                  } `}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          name="last_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-thin">
                Last Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Last Name"
                  className={` flex focus:border-green-500 rounded-[6px] font-thin text-sm bg-transparent sm:h-12 h-10 ${
                    form.formState.errors.title
                      ? "border-red-600 placeholder:text-red-600"
                      : ""
                  } `}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-thin">
                Email <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  className={` flex focus:border-green-500 rounded-[6px] font-thin text-sm bg-transparent sm:h-12 h-10 ${
                    form.formState.errors.title
                      ? "border-red-600 placeholder:text-red-600"
                      : ""
                  } `}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full gap-2">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white"
            onClick={form.handleSubmit(onSubmit)}
          >
            {type === ModalContentEnum.CREATE ? "Add User" : "Edit User"}
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {}}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ManageUserModal;
