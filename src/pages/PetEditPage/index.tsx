import { PetReportForm } from "components/PetReportForm";
import { useLog } from "hooks/useLog";
import React from "react";
import css from "./style.css";
export function PetEditPage() {
  useLog();
  return (
    <div className={css.root}>
      <PetReportForm editOrReport="edit"></PetReportForm>
    </div>
  );
}
