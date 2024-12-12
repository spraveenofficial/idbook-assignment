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

type Props = {
  type: ModalContentEnum;
};

const ManageUserModal = (props: Props) => {
  const { type } = props;

  const form = useForm<any>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    // resolver: yupResolver(addEmployeeSchema),
  });

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
      </Form>

      <div className="flex justify-end w-full gap-2">
        <Button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white"
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
    </div>
  );
};

export default ManageUserModal;
