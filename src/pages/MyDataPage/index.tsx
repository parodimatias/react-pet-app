import React from "react";
import { MyDataForm } from "components/MyDataForm";
import { TitleText } from "ui/Texts";
export function MyDataPage() {
  return (
    <div>
      <TitleText>Mis datos</TitleText>
      <MyDataForm></MyDataForm>
    </div>
  );
}
