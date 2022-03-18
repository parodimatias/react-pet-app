import React from "react";
import { Link } from "react-router-dom";
import { CaptionText, LinkText, TitleText } from "ui/Texts";
import editButtonImg from "./editButton.png";
import css from "./style.css";
type PetCard = {
  img: string;
  name: string;
  location: string;
  petId: string;
  callBack: (any) => any;
  editOrReport: "edit" | "report";
  found: boolean;
};
export function PetCard(props: PetCard) {
  const openPopUp = () => {
    props.callBack(props);
  };
  return (
    <div className={css["pet__item"]}>
      <div className={css["pet__img-container"]}>
        <img className={css["pet__img"]} src={props.img} />
      </div>
      <div className={css["pet__data-container"]}>
        <div className={css["pet__description-container"]}>
          <TitleText className={css["pet__description-name"]}>
            {props.name}
          </TitleText>
          <div className={css["pet__description-location"]}>
            <CaptionText>{props.location}</CaptionText>
          </div>
        </div>
        {props.editOrReport == "report" && (
          <div className={css["pet__description-link"]}>
            <button onClick={openPopUp} className={css["pet__link"]}>
              <LinkText>REPORTAR INFORMACION</LinkText>
            </button>
          </div>
        )}
        {props.editOrReport == "edit" && props.found == false && (
          <Link to={"/editpet/" + props.petId}>
            <img src={editButtonImg}></img>
          </Link>
        )}
        {props.editOrReport == "edit" && props.found == true && (
          <CaptionText>Encontrado</CaptionText>
        )}
      </div>
    </div>
  );
}
