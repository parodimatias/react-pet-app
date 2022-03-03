import { LoginForm } from "components/LoginForm";
import React, { useState } from "react";
import { TitleText } from "ui/Texts";
import css from "./style.css";
export function LoginPage() {
  const [loginData, setLoginData] = useState({
    mail: "",
    username: "",
    password: "",
  });
  return (
    <div className={css.root}>
      <TitleText>Ingresar</TitleText>
      <LoginForm></LoginForm>
    </div>
  );
}
