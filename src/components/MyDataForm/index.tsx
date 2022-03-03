import { loginInfoState } from "hooks";
import { useForm } from "hooks/useForm";
import APICalls from "lib/APICalls";
import { validateInfo } from "lib/validateInfo";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button } from "ui/Button";
import { TextField } from "ui/Textfield";
import css from "./style.css";
export function MyDataForm() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState); //Este State comanda el montaje en LoginForm
  const submitCallback = (state) => {
    setLoginInfo({
      ...loginInfo,
      fullName: state.fullName,
      password: state.password,
    });
  };
  const [
    data,
    handleSubmit,
    handleChange,
    errors,
    isSubmitted,
    setIsSubmitted,
  ] = useForm(submitCallback, validateInfo);
  useEffect(() => {
    if (isSubmitted) {
      setIsSubmitted(false);
      if (!loginInfo.logged) {
        console.log("registrando");
        const callToApi = async () => {
          const response = await APICalls.auth(loginInfo);
          if (response) {
            const response2 = await APICalls.getAuthToken(loginInfo);
            if (response2) {
              const { token, logged, userId } = response2;
              setLoginInfo({ ...loginInfo, token, logged, userId });
              navigate("/");
            }
          }
        };
        callToApi();
      } else {
        console.log("actualizando perfil");
        const callToApi = async () => {
          const response = await APICalls.profileUpdate(loginInfo);
          if (response) {
            alert("Datos actualizados");
            navigate("/");
          }
        };
        callToApi();
      }
    }
  }, [isSubmitted]);
  return (
    <form onSubmit={handleSubmit} className={css.root}>
      <TextField
        name="fullName"
        labelText="nombre"
        onChange={handleChange}
        defaultValue={loginInfo.fullName}
      ></TextField>
      {errors.username && <p>{errors.username}</p>}
      <TextField
        type="password"
        name="password"
        labelText="contraseña"
        onChange={handleChange}
        defaultValue={loginInfo.password}
      ></TextField>
      {errors.password && <p>{errors.password}</p>}
      <TextField
        name="password2"
        type="password"
        labelText="repetir contraseña"
        onChange={handleChange}
        defaultValue={loginInfo.password}
      ></TextField>
      {errors.password2 && <p>{errors.password2}</p>}
      <Button backgroundColor="#FF9DF5">Guardar</Button>{" "}
    </form>
  );
}
