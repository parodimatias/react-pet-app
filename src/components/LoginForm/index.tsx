import { loginInfoState } from "hooks";
import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
export function LoginForm() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  return (
    <>
      <Outlet></Outlet>
    </>
  );
}
