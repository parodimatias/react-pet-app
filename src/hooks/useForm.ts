import { useEffect, useState } from "react";
export function useForm(submitCallback, validate?) {
  const [state, setState] = useState({} as any);
  const [errors, setErrors] = useState({} as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e: any) => {
    e.preventDefault();
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  useEffect(() => {}, [state]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate) {
      setErrors(validate(state));
      setIsSubmitting(true);
    } else {
      setIsSubmitted(true);
    }
  };
  const saveExtraData = (data: {}) => {
    setState((state) => ({ ...state, ...data }));
  };
  //useEffect detecta que no haya errores y chequea que se haya presionado submit para llamar a un callback
  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitCallback(state);
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
    saveExtraData,
  ];
}
