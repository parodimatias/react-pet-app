import { PetCard } from "components/PetCard/PetCard";
import { loginInfoState, myReportedPetsState } from "hooks";
import APICalls from "lib/APICalls";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import css from "./style.css";
export const MyReportedPets = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState); //Este State comanda el montaje en LoginForm
  const [myReportedPets, setMyReportedPets] =
    useRecoilState(myReportedPetsState);
  useEffect(() => {
    const fetch = async () => {
      const response = await APICalls.getMyReportedPets(loginInfo);
      setMyReportedPets(response);
    };
    fetch();
  }, []);
  const handleCallBack = (childData) => {};

  return (
    <div className={css.container}>
      <div className={css["pets-container"]}>
        {myReportedPets &&
          myReportedPets.map((pet) => {
            return (
              <PetCard
                editOrReport="edit"
                name={pet.nombre}
                petId={pet.id}
                found={pet.found}
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
