import React from "react";
import css from "./style.css";
import { BodyBoldText } from "ui/Texts/index";
type Button = {
  children?: string;
  backgroundColor: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => any;
};
export function Button(props: Button) {
  return (
    <button
      type={props.type}
      className={css.button}
      style={{ backgroundColor: props.backgroundColor }}
      onClick={props.onClick}
    >
      <BodyBoldText>{props.children}</BodyBoldText>
    </button>
  );
}
