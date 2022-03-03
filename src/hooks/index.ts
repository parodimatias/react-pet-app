import { atom } from "recoil";
export const emptyObject = {
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

export const popUpState = atom({
  key: "popUpOpen",
  default: false,
});

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
export const loginInfoState = atom({
  key: "loginInfo",
  default: emptyObject,
  effects: [localStorageEffect("current_user")],
});
