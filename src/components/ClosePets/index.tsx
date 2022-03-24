import { PetCard } from "components/PetCard/PetCard";
import { ReportPetPopUp } from "components/ReportPetPopUp";
import APICalls from "lib/APICalls";
import React, { useEffect, useState } from "react";
import { Button } from "ui/Button";
import { CaptionText } from "ui/Texts";
import css from "./style.css";

export const ClosePets = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [closePets, setClosePets] = useState(null);
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState(null);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  useEffect(() => {
    if (lat && lng) {
      const fetch = async () => {
        const response = await APICalls.getNearLostPets({ lat, lng });
        setClosePets(response);
      };
      fetch();
    }
  }, [lat, lng]);
  const handleCallBack = (childData) => {
    setPopUpInfo({ petName: childData.name, petId: childData.petId });
    window.scrollTo(0, 0);
    setButtonPopUp(true);
  };

  return (
    <div className={css.container}>
      {buttonPopUp && (
        <ReportPetPopUp
          setTrigger={setButtonPopUp}
          petName={popUpInfo.petName}
          petId={popUpInfo.petId}
        ></ReportPetPopUp>
      )}
      {!lat ? (
        <>
          <CaptionText>
            Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
            conocer tu ubicación.
          </CaptionText>
          <Button backgroundColor="#FF9DF5" onClick={getLocation}>
            Dar Locacion
          </Button>
        </>
      ) : closePets ? (
        <div className={css["pets-container"]}>
          {closePets.map((pet) => {
            if (pet.found == false) {
              return (
                <PetCard
                  editOrReport="report"
                  name={pet.nombre}
                  petId={pet.id}
                  callBack={handleCallBack}
                  location={pet.location}
                  found={pet.found}
                  img={pet.picture}
                ></PetCard>
              );
            } else {
              return false;
            }
          })}
        </div>
      ) : (
        <CaptionText>No hay mascotas reportadas cerca de tu zona</CaptionText>
      )}
    </div>
  );
};
