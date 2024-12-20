"use client";

import React, { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import UserService from "@/services/modules/user.service";
import { ISignUpLoginForm } from "@/types/user/user.interface";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import NotificationModal from "@/components/common/notification-modal";
import AuthFormBackground from "@/components/common/auth-form-background";
import Input from "@/components/ui/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface ICommonSignupLoginForm {
  type: "login" | "signup";
}

const AuthForm = ({ type }: ICommonSignupLoginForm) => {
  const toast = useToast();
  const userStore = useUserStore();
  const router = useRouter();
  const data = {
    login: {
      title: "Đăng nhập",
      switchTitle: "Chưa có tài khoản?",
      switchBtnLabel: "Đăng ký",
      switchLink: "/dang-ky"

    },
    signup: {
      title: "Đăng ký",
      switchTitle: "Đã có tài khoản?",
      switchBtnLabel: "Đăng nhập",
      switchLink: "/dang-nhap",
      successTitle: "Đăng ký thành công",
      successDescription: "Cảm ơn bạn đã đăng ký, chúc bạn có những trải nghiệm thú vị"
    }
  };

  const schema = useMemo(() => {
    if (type === "signup") {
      return yup.object({
        name: yup
          .string()
          .required("Vui lòng nhập tên của bạn"),
        email: yup
          .string()
          .required("Vui lòng nhập email")
          .email("Email không hợp lệ"),
        password: yup
          .string()
          .required("Mật khẩu là bắt buộc")
          .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      });
    }

    if (type === "login") {
      return yup.object({
        email: yup
          .string()
          .required("Vui lòng nhập email")
          .email("Email không hợp lệ"),
        password: yup
          .string()
          .required("Mật khẩu là bắt buộc")
          .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      });
    }
  }, [type]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<ISignUpLoginForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  async function onSubmit(formData: ISignUpLoginForm) {
    let response = null;
    try {
      response = await signIn("credentials", {
        ...(type === "signup" ? {
          name: formData.name
        } : {}),
        type,
        email: formData.email,
        password: formData.password,
        redirect: false
      });
    } catch (error: any) {
      console.log({ catchError: error });
    }
    console.log({ response });

    if (response?.code?.length > 0) {
      toast.toast({
        title: response?.code,
        variant: "destructive"
      });
    } else {
      if (type === "login") {
        router.push("/");
      } else if (type === "signup") {
        commonNotifyModal.openModal({
          title: data[type].successTitle,
          description: data[type].successDescription,
          type: "Success",
          onSubmit: () => router.push("/"),
          onCancel: () => router.push("/")
        });
      }
    }
  }

  const commonNotifyModal = NotificationModal();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {commonNotifyModal.content}
      <div className="flex h-screen">
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <AuthFormBackground />
        </div>
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              {data[type].title}
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Tham gia để chia sẻ niềm đam mê nước hoa
            </h1>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
              {/*<div className="w-full  mb-2 lg:mb-0">*/}
              {/*  <button*/}
              {/*    type="button"*/}
              {/*    className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"*/}
              {/*  >*/}
              {/*    <svg*/}
              {/*      xmlns="http://www.w3.org/2000/svg"*/}
              {/*      viewBox="0 0 512 512"*/}
              {/*      className="w-4"*/}
              {/*      id="google"*/}
              {/*    >*/}
              {/*      <path*/}
              {/*        fill="#fbbb00"*/}
              {/*        d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"*/}
              {/*      ></path>*/}
              {/*      <path*/}
              {/*        fill="#518ef8"*/}
              {/*        d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"*/}
              {/*      ></path>*/}
              {/*      <path*/}
              {/*        fill="#28b446"*/}
              {/*        d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"*/}
              {/*      ></path>*/}
              {/*      <path*/}
              {/*        fill="#f14336"*/}
              {/*        d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"*/}
              {/*      ></path>*/}
              {/*    </svg>*/}
              {/*    {" "}*/}
              {/*    {data[type].title} bằng Gmail{" "}*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
            {/*<div className="my-4 text-sm text-gray-600 text-center">*/}
            {/*  <p>Hoặc</p>*/}
            {/*</div>*/}
            <div>
              {type === "signup" && (
                <Input
                  name={"name"}
                  type="text"
                  input={{ className: "bg-white" }}
                  wrapperClassName={"bg-white border border-gray-700 max-h-10"}
                  icon={{ name: "user" }}
                  placeholder="Nhập tên của bạn"
                  label={{ title: "Tên người dùng" }}
                  validation={{
                    control
                  }}
                />
              )}
              <Input
                type="text"
                name="email"
                placeholder="Nhập email"
                icon={{ name: "email" }}
                input={{ className: "bg-white" }}
                wrapperClassName={"bg-white border border-gray-700 max-h-10"}
                label={{ title: "Email" }}
                validation={{
                  control
                }}

              />
              <Input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                icon={{ name: "key" }}
                input={{ className: "bg-white" }}
                wrapperClassName={"bg-white border border-gray-700 max-h-10"}
                label={{ title: "Mật khẩu" }}
                validation={{
                  control
                }}
              />
              <div>
                <Button
                  loading={isSubmitting}
                  type={"submit"}
                  className="mt-6 w-full"
                >
                  {data[type].title}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                {data[type].switchTitle}{" "}
                <Link
                  href={data[type].switchLink}
                  className="text-black font-semibold hover:underline"
                >
                  {data[type].switchBtnLabel}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
