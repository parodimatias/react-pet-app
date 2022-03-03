import { loginInfoState } from "hooks";
import { useForm } from "hooks/useForm";
import APICalls from "lib/APICalls";
import { validatePassword } from "lib/validateInfo";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button } from "ui/Button";
import { TextField } from "ui/Textfield";
import css from "./style.css";
export function PasswordForm() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const navigate = useNavigate();
  const submitCallback = (state) => {
    const password = state.password;
    setLoginInfo({ ...loginInfo, password });
  };
  const [
    data,
    handleSubmit,
    handleChange,
    errors,
    isSubmitted,
    setIsSubmitted,
  ] = useForm(submitCallback, validatePassword);
  useEffect(() => {
    if (isSubmitted) {
      setIsSubmitted(false);
      const callToApi = async () => {
        const response2 = await APICalls.getAuthToken(loginInfo);
        console.log(response2);
        if (response2) {
          const { token, logged, userId, fullName } = response2;
          setLoginInfo({ ...loginInfo, token, logged, userId, fullName });
          navigate("/");
        }
      };
      callToApi();
    }
  }, [isSubmitted]);
  return (
    <form onSubmit={handleSubmit} className={css.root}>
      <TextField
        type="password"
        name="password"
        labelText="contraseña"
        onChange={handleChange}
      ></TextField>
      {errors.password && <p>{errors.password}</p>}
      <Button backgroundColor="#FF9DF5">Siguiente</Button>{" "}
    </form>
  );
}
