import { loginInfoState } from "hooks";
import { useForm } from "hooks/useForm";
import APICalls from "lib/APICalls";
import { validateInfo } from "lib/validateInfo";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button } from "ui/Button";
import { TextField } from "ui/Textfield";
import { CaptionText } from "ui/Texts";
import css from "./style.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0aWFzcGFyb2RpIiwiYSI6ImNreTh6NnNlcDAxZXQycWs5c2VndTQxemYifQ.g5ici0kzf8C_pEntf30JYA";
export function PetReportForm() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [geocode, setGeocode] = useState([-64.34, -36.07]);
  const [lng, setLng] = useState(-64.34);
  const [lat, setLat] = useState(-36.07);
  const [zoom, setZoom] = useState(3);
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState); //Este State comanda el montaje en LoginForm
  const submitCallback = (state) => {
    setLoginInfo({
      ...loginInfo,
      fullName: state.fullName,
      password: state.password,
    });
  };
  const [
    data,
    handleSubmit,
    handleChange,
    errors,
    isSubmitted,
    setIsSubmitted,
  ] = useForm(submitCallback, validateInfo);
  useEffect(() => {
    if (isSubmitted) {
      setIsSubmitted(false);
      if (!loginInfo.logged) {
        console.log("registrando");
        const callToApi = async () => {
          const response = await APICalls.auth(loginInfo);
          if (response) {
            const response2 = await APICalls.getAuthToken(loginInfo);
            if (response2) {
              const { token, logged, userId } = response2;
              setLoginInfo({ ...loginInfo, token, logged, userId });
              navigate("/");
            }
          }
        };
        callToApi();
      } else {
        console.log("actualizando perfil");
        const callToApi = async () => {
          const response = await APICalls.profileUpdate(loginInfo);
          if (response) {
            alert("Datos actualizados");
            navigate("/");
          }
        };
        callToApi();
      }
    }
  }, [isSubmitted]);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("click", (e) => {
      const marker1 = new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map.current);
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  useEffect(() => {
    const searchGeocoding = async (query) => {
      console.log("haciendo fetch");
      const { features } = await (
        await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`
        )
      ).json();
      setGeocode(features[0].center);
    };
    const delayDebounceFn = setTimeout(() => {
      searchGeocoding(data["location"]);
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [data["location"]]);
  useEffect(() => {
    console.log("location", data["location"]);
    console.log("geocode", geocode);
    map.current.setCenter([geocode[0], geocode[1]]);
    map.current.zoomTo(15, {
      duration: 2000,
      offset: [100, 50],
    });
  }, [geocode]);

  return (
    <form onSubmit={handleSubmit} className={css.root}>
      <TextField
        name="name"
        labelText="nombre"
        onChange={handleChange}
        defaultValue={loginInfo.fullName}
      ></TextField>
      {errors.username && <p>{errors.username}</p>}
      <div className={css.mapbox}>
        <div className={css.sidebar}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className={css["map-container"]} />
      </div>
      <TextField
        name="location"
        labelText="ubicacion"
        onChange={handleChange}
      ></TextField>
      <CaptionText>
        Buscá un punto de referencia para reportar a tu mascota. Puede ser una
        dirección, un barrio o una ciudad.
      </CaptionText>
      <Button backgroundColor="#CDCDCD" onClick={() => navigate("/")}>
        Reportar mascota perdida
      </Button>{" "}
      <Button backgroundColor="#CDCDCD" onClick={() => navigate("/")}>
        Cancelar
      </Button>{" "}
    </form>
  );
}
