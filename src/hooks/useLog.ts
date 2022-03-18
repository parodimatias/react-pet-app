//This Hook is used to check whether the user is logged, otherwise it routes to login page
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginInfoState } from "./index";
export function useLog() {
  let navigate = useNavigate();
  const loggedData = useRecoilValue(loginInfoState);
  useEffect(() => {
    if (!loggedData.logged) {
      navigate("/login");
    }
  }, [loggedData]);
}
