import React from "react";
import { CaptionText } from "ui/Texts/index";
import css from "./style.css";
type TextField = {
  children?: any;
  name?: string;
  type?: string;
  defaultValue?: string;
  labelText: string;
  onChange: any;
  rows?: number;
};
export function TextField(props: TextField) {
  let input;
  if (props.type == "textarea") {
    input = (
      <textarea
        className={css.textarea}
        name={props.name}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        rows={props.rows}
      ></textarea>
    );
  } else {
    input = (
      <input
        className={css.textfield}
        type={props.type}
        name={props.name}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      ></input>
    );
  }

  return (
    <div className={css["textfield-container"]}>
      <label htmlFor={props.name}>
        <CaptionText>{props.labelText}</CaptionText>
      </label>
      {input}
    </div>
  );
}
