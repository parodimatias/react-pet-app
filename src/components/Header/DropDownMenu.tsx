import { loginInfoState, loginObject } from "hooks";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { BodyBoldText, LinkText, SubtitleBoldText } from "ui/Texts";
import { isMenuOpenState } from "./atom";
import css from "./style.css";
export function DropDownMenu() {
  const [loggedData, setLoggedData] = useRecoilState(loginInfoState);
  const [isOpen, setIsOpen] = useRecoilState(isMenuOpenState);
  const clearLoggedData = () => {
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
