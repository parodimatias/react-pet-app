import React, { useState, useEffect } from "react";
export function useForm(callback, validate) {
  const [state, setState] = useState({} as any);
  const [errors, setErrors] = useState({} as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e: any) => {
    console.log("soy handle change", state);
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrors(validate(state));
    setIsSubmitting(true);
  };
  //useEffect detecta que no haya errores y chequea que se haya presionado submit para llamar a un callback
  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(state);
      setIsSubmitted(true);
    }
  }, [errors]);
  return [
    state,
    handleSubmit,
    handleChange,
    errors,
    isSubmitted,
    setIsSubmitted,
  ];
}
