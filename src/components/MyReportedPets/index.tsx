import { PetCard } from "components/PetCard/PetCard";
import { loginInfoState } from "hooks";
import APICalls from "lib/APICalls";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import css from "./style.css";

export const MyReportedPets = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState); //Este State comanda el montaje en LoginForm
  const [myReportedPets, setMyReportedPets] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      console.log("haciendo fetch");
      const response = await APICalls.getMyReportedPets(loginInfo);
      setMyReportedPets(response);
      console.log(response);
    };
    fetch();
  }, []);
  const handleCallBack = (childData) => {
    console.log(childData);
  };

  return (
    <div className={css.container}>
      <div className={css["pets-container"]}>
        {myReportedPets &&
          myReportedPets.map((pet) => {
            return (
              <PetCard
                name={pet.nombre}
                petId={pet.id}
                callBack={handleCallBack}
                location={pet.location}
                img={pet.picture}
              ></PetCard>
            );
          })}
      </div>
    </div>
  );
};
