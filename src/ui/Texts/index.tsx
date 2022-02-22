import React from "react";
import "./style.css";

export function TitleText(props) {
  return <span className="title">{props.children}</span>;
}
export function SubtitleText(props) {
  return <span className="subtitle">{props.children}</span>;
}
export function SubtitleBoldText(props) {
  return <span className="subtitle-bold">{props.children}</span>;
}
export function BodyText(props) {
  return <span className="body">{props.children}</span>;
}
export function BodyBoldText(props) {
  return <span className="body-bold"></span>;
}
export function CaptionText(props) {
  return <span className="subtitle"></span>;
}
export function LinkText(props) {
  return <span className="link"></span>;
}
