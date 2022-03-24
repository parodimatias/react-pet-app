import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isMenuOpenState } from "./atom";
import { DropDownMenu } from "./DropDownMenu";
import logoImg from "./logo.png";
import menuImg from "./menu.png";
import css from "./style.css";
export function HeaderComp() {
  const [isOpen, setIsOpen] = useRecoilState(isMenuOpenState);
  return (
    <>
      <div className={css["menu-subcontainer"]}>
        <div className={css.logo}>
          <Link onClick={() => setIsOpen(false)} to="/">
            <img src={logoImg} alt="not found"></img>
          </Link>
        </div>
        <div className={css["menu-button"]}>
          <img
            onClick={() => setIsOpen(!isOpen)}
            src={menuImg}
            alt="not found"
          ></img>{" "}
        </div>
        {isOpen && <DropDownMenu></DropDownMenu>}
      </div>
    </>
  );
}
