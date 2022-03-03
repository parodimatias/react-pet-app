import React from "react";
import css from "./style.css";
import { MailForm } from "components/MailForm";
import { MyDataForm } from "components/MyDataForm";
import { PasswordForm } from "components/PasswordForm";
import { useRecoilState } from "recoil";
import { loginInfoState } from "hooks";
import { Outlet } from "react-router-dom";
export function LoginForm() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  console.log("loginInfo", loginInfo);
  return (
    <>
      <Outlet></Outlet>
    </>
  );
}
