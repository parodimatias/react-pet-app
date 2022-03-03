import { Layout } from "components/Layout";
import { MailForm } from "components/MailForm";
import { MyDataForm } from "components/MyDataForm";
import { PasswordForm } from "components/PasswordForm";
import { PetReportForm } from "components/PetReportForm";
import { Home } from "pages/Home";
import { LoginPage } from "pages/LoginPage";
import { MyDataPage } from "pages/MyDataPage/index";
import { MyReportedPetsPage } from "pages/MyReportedPetsPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mydata" element={<MyDataPage />}></Route>
          <Route path="login" element={<LoginPage />}>
            <Route index element={<MailForm />}></Route>
            <Route path="signup" element={<MyDataForm />}></Route>
            <Route path="password" element={<PasswordForm />}></Route>
          </Route>
          <Route path="myreportedpets" element={<MyReportedPetsPage />}></Route>
          <Route path="petreport" element={<PetReportForm />}></Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
}
