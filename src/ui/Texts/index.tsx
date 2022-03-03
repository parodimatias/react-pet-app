import React from "react";
import css from "./style.css";

export function TitleText(props) {
  return <span className={css.title}>{props.children}</span>;
}
export function SubtitleText(props) {
  return <span className={css.subtitle}>{props.children}</span>;
}
export function SubtitleBoldText(props) {
  return <span className={css["subtitle-bold"]}>{props.children}</span>;
}
export function BodyText(props) {
  return <span className={css.body}>{props.children}</span>;
}
export function BodyBoldText(props) {
  return <span className={css["body-bold"]}>{props.children}</span>;
}
export function CaptionText(props) {
  return <span className={css.caption}>{props.children}</span>;
}
export function LinkText(props) {
  return <span className={css.link}>{props.children}</span>;
}
