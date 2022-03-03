import { MyReportedPets } from "components/MyReportedPets";
import { useLog } from "hooks/useLog";
import React from "react";
import { TitleText } from "ui/Texts";
import css from "./style.css";
export function MyReportedPetsPage() {
  useLog();
  return (
    <div className={css.root}>
      <TitleText>Mis mascotas reportadas</TitleText>
      <MyReportedPets></MyReportedPets>
    </div>
  );
}
