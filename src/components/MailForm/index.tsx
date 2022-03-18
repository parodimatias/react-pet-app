import { loginInfoState } from "hooks";
import useFetch from "hooks/useFetch";
import { useForm } from "hooks/useForm";
import { API_BASE_URL } from "index";
import { validateMail } from "lib/validateInfo";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button } from "ui/Button";
import { TextField } from "ui/Textfield";
import css from "./style.css";

export function MailForm() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState); //Este State comanda el montaje en LoginForm
  const fetch = useFetch(null);

  const submitCallback = (state) => {
    const { email } = state;
    setLoginInfo({ ...loginInfo, email });
    const request = {
      url: API_BASE_URL + "/email",
      config: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      },
    };
    fetch.refetch(request);
  };
  const [data, handleSubmit, handleChange, errors] = useForm(
    submitCallback,
    validateMail
  );
  useEffect(() => {
    if (fetch.data == false && fetch.loading == false) {
      setLoginInfo({ ...loginInfo, emailSent: true, emailExist: false });
      navigate("signup");
    } else if (fetch.data == true) {
      setLoginInfo({ ...loginInfo, emailSent: true, emailExist: true });
      navigate("password");
    }
  }, [fetch.data, fetch.loading]);
  let a = <div></div>;
  if (fetch.loading) {
    a = (
      <div>Estamos chequeando si tu correo existe en nuestra base de datos</div>
    );
  } else {
    a = (
      <form onSubmit={handleSubmit} className={css.root}>
        <TextField
          name="email"
          labelText="email"
          onChange={handleChange}
        ></TextField>
        {errors.email && <p>{errors.email}</p>}
        <Button backgroundColor="#FF9DF5">Siguiente</Button>{" "}
      </form>
    );
  }
  return a;
}
