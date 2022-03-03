import { ClosePets } from "components/ClosePets";
import React from "react";
import { TitleText } from "ui/Texts";
export function Home() {
  return (
    <>
      <TitleText>Mascotas perdidas cerca tuyo</TitleText>
      <ClosePets></ClosePets>
    </>
  );
}
