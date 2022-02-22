import React from "react";
import css from "./style.css";
type Button = {
  children?: string;
  color?: number;
};
export function Button(props: Button) {
  return <button className={css.button}>Hola</button>;
}
