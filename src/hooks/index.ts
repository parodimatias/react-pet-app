import { atom } from "recoil";
export const loginObject = {
  emailSent: false,
  emailExist: false,
  email: "",
  fullName: "",
  password: "",
  userId: "",
  token: "",
  logged: false,
  lng: "",
  lat: "",
};
const petsCollection = [];
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
export const popUpState = atom({
  key: "popUpOpen",
  default: false,
});
export const loginInfoState = atom({
  key: "loginInfo",
  default: loginObject,
  effects: [localStorageEffect("current_user")],
});
export const myReportedPetsState = atom({
  key: "myReportedPets",
  default: petsCollection,
});
