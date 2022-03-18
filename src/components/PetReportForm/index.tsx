import { Dropzone } from "components/StyledDropzone";
import { loginInfoState, myReportedPetsState } from "hooks";
import { useForm } from "hooks/useForm";
import APICalls from "lib/APICalls";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button } from "ui/Button";
import { TextField } from "ui/Textfield";
import { CaptionText } from "ui/Texts";
import css from "./style.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0aWFzcGFyb2RpIiwiYSI6ImNreTh6NnNlcDAxZXQycWs5c2VndTQxemYifQ.g5ici0kzf8C_pEntf30JYA";
type PetReformProp = {
  editOrReport: "edit" | "report";
};
export function PetReportForm(props: PetReformProp) {
  const params = useParams();
  const [currentPet, setCurrentPet] = useState({} as any);
  const [geocode, setGeocode] = useState([-64.34, -36.07]);
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState); //Este State comanda el montaje en LoginForm
  const [myReportedPets, setMyReportedPets] =
    useRecoilState(myReportedPetsState);
  const submitCallback = (state) => {};
  const [
    data,
    handleSubmit,
    handleChange,
    errors,
    isSubmitted,
    setIsSubmitted,
    saveExtraData,
  ] = useForm(submitCallback);
  // Preload
  useEffect(() => {
    if (props.editOrReport == "edit") {
      const pet: any = myReportedPets.filter((pet) => pet.id == params.petId);
      setCurrentPet(pet[0]);
      setGeocode([pet[0].lng, pet[0].lat]);
    }
  }, [myReportedPets]);

  // Submit Fetch

  useEffect(() => {
    if (isSubmitted) {
      if (props.editOrReport == "report") {
        const callToApi = async () => {
          const response = await APICalls.reportLostPet({
            ...loginInfo,
            ...data,
          });
          if (response) {
            alert("Pet successfully reported");
            navigate("/");
          }
        };
        callToApi();
      } else if (props.editOrReport == "edit") {
        const callToApi = async () => {
          const response = await APICalls.updateLostPet({
            id: params.petId,
            ...data,
          });
          if (response) {
            alert("Datos actualizados");
            navigate("/");
          }
        };
        callToApi();
      }
      setIsSubmitted(false);
    }
  }, [isSubmitted]);
  // Dropzone

  const handleImage = (files) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const resultObject = { picture: reader.result };
        saveExtraData(resultObject);
      };
      reader.readAsDataURL(file);
    });
  };
  // Report Found Pet
  const reportFoundPet = async () => {
    const response = APICalls.foundPet({ id: params.petId });
    if (response) {
      navigate("/");
    }
  };
  // Unlink lost pet
  const unlinkPet = async () => {
    const response = await APICalls.unlinkPet({ id: params.petId });
    if (response) {
      navigate("/");
    }
  };
  // Geocoding
  useEffect(() => {
    if (data["location"]) {
      const searchGeocoding = async (query) => {
        const { features } = await (
          await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=AR,UY&access_token=${mapboxgl.accessToken}`
          )
        ).json();
        const resultCoordinates = {
          lng: features[0].center[0],
          lat: features[0].center[1],
        };
        saveExtraData(resultCoordinates);

        setGeocode(features[0].center);
      };
      const delayDebounceFn = setTimeout(() => {
        searchGeocoding(data["location"]);
      }, 2000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [data["location"]]);

  return (
    <form
      onSubmit={handleSubmit}
      className={css.root}
      onKeyPress={(event) => {
        event.code == "Enter" && event.preventDefault();
      }}
    >
      <TextField
        name="nombre"
        labelText="nombre"
        onChange={handleChange}
        defaultValue={currentPet.nombre}
      ></TextField>
      {errors.username && <p>{errors.username}</p>}
      <Dropzone callback={handleImage}></Dropzone>
      <Map
        initialViewState={{
          longitude: -64,
          latitude: -36,
          zoom: 14,
        }}
        longitude={geocode[0]}
        latitude={geocode[1]}
        style={{ width: 400, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={geocode[0]}
          latitude={geocode[1]}
          draggable={true}
          onDragEnd={(e) => {
            saveExtraData(e.lngLat);
            setGeocode(Object.values(e.lngLat));
          }}
          anchor="bottom"
        ></Marker>
      </Map>
      <TextField
        name="location"
        labelText="ubicacion"
        onChange={handleChange}
        defaultValue={currentPet.location}
      ></TextField>
      <CaptionText>
        Buscá un punto de referencia para reportar a tu mascota. Puede ser una
        dirección, un barrio o una ciudad.
      </CaptionText>
      {props.editOrReport == "report" && (
        <>
          <Button backgroundColor="#CDCDCD" type="submit">
            Reportar mascota perdida
          </Button>
          <Button backgroundColor="#CDCDCD" onClick={() => navigate("/")}>
            Cancelar
          </Button>
        </>
      )}
      {props.editOrReport == "edit" && (
        <>
          <Button backgroundColor="#CDCDCD" type="submit">
            Guardar
          </Button>
          <Button
            backgroundColor="#97EA9F"
            type="button"
            onClick={reportFoundPet}
          >
            Reportar como encontrado
          </Button>
          <Button backgroundColor="#CDCDCD" type="button" onClick={unlinkPet}>
            Despublicar
          </Button>
        </>
      )}
    </form>
  );
}
