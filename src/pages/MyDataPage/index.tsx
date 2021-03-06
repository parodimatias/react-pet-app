import { MyDataForm } from "components/MyDataForm";
import { useLog } from "hooks/useLog";
import React from "react";
import { TitleText } from "ui/Texts";
import css from "./style.css";
export function MyDataPage() {
  useLog();
  return (
    <div className={css.root}>
      <TitleText>Mis Datos</TitleText>
      <MyDataForm></MyDataForm>
    </div>
  );
}
