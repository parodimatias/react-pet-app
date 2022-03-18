import { loginInfoState, loginObject } from "hooks";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { BodyBoldText, LinkText, SubtitleBoldText } from "ui/Texts";
import { isMenuOpenState } from "./atom";
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

function DropDownMenu() {
  const [loggedData, setLoggedData] = useRecoilState(loginInfoState);
  const [isOpen, setIsOpen] = useRecoilState(isMenuOpenState);
  const clearLoggedData = () => {
    console.log("borrando local storage");
    setIsOpen(!isOpen);
    setLoggedData(loginObject);
  };
  return (
    <div className={css.dropdown}>
      <div className={css["option-container"]}>
        <div>
          <SubtitleBoldText>
            <Link onClick={() => setIsOpen(false)} to="/mydata">
              Mis datos
            </Link>
          </SubtitleBoldText>
        </div>
        <div>
          <SubtitleBoldText>
            <Link onClick={() => setIsOpen(false)} to="/myreportedpets">
              Mis mascotas reportadas
            </Link>
          </SubtitleBoldText>{" "}
        </div>
        <div>
          <SubtitleBoldText>
            <Link onClick={() => setIsOpen(false)} to="/petreport">
              Reportar Mascota
            </Link>
          </SubtitleBoldText>{" "}
        </div>
      </div>
      <div className="log-option-container">
        <div>
          {loggedData.logged ? (
            <>
              <BodyBoldText>{loggedData.email}</BodyBoldText>
              <br></br>
              <LinkText>
                <Link to="/" onClick={clearLoggedData}>
                  Cerrar Sesion
                </Link>
              </LinkText>
            </>
          ) : (
            <LinkText>
              <Link onClick={() => setIsOpen(false)} to="/login">
                Iniciar Sesion
              </Link>
            </LinkText>
          )}
        </div>
      </div>
    </div>
  );
}
