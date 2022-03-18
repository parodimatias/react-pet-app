import useFetch from "hooks/useFetch";
import { useForm } from "hooks/useForm";
import { API_BASE_URL } from "index";
import { validateReportForm } from "lib/validateInfo";
import React, { useEffect } from "react";
import { Button } from "ui/Button";
import { TextField } from "ui/Textfield";
import css from "./style.css";
import logoImg from "./X.png";

type ReportPetPopUp = {
  setTrigger: (any) => void;
  petName: string;
  petId: string;
};

export function ReportPetPopUp(props: ReportPetPopUp) {
  const fetch = useFetch(null);
  const submitCallback = (formState) => {
    const request = {
      url: API_BASE_URL + "/sendnotification",
      config: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: props.petId,
          reporterName: formState.name,
          reporterPhone: formState.phone,
          reporterDesc: formState.message,
        }),
      },
    };
    fetch.refetch(request);
  };
  const [
    data,
    handleSubmit,
    handleChange,
    errors,
    isSubmitted,
    setIsSubmitted,
  ] = useForm(submitCallback, validateReportForm);

  useEffect(() => {
    if (fetch.data) {
      if (fetch.data[0]["statusCode"] == 202) {
        alert("Correo enviado, muchas gracias!");
        props.setTrigger(false);
      }
    }
  }, [fetch.data]);
  return (
    <div className={css["report-component"]}>
      <img
        onClick={() => {
          props.setTrigger(false);
        }}
        className={css["close"]}
        src={logoImg}
      ></img>
      <h1>Reportar info de {props.petName}</h1>
      <form onSubmit={handleSubmit} className={css["report-pet-form"]}>
        <TextField
          type="string"
          labelText="Tu nombre"
          onChange={handleChange}
          name="name"
        >
          Tu Nombre
        </TextField>
        <TextField
          type="text"
          labelText="Tu telefono"
          onChange={handleChange}
          name="phone"
        ></TextField>
        <TextField
          type="textarea"
          labelText="Mensaje"
          rows={4}
          onChange={handleChange}
          name="message"
        >
          Donde lo viste?
        </TextField>
        <Button type="submit" backgroundColor="red">
          Enviar
        </Button>
      </form>
    </div>
  );
}
