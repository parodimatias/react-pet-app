import { API_BASE_URL } from "index";
const APICalls = {
  async auth(params) {
    const cs = params;
    const data = await fetch(API_BASE_URL + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
        fullName: cs.fullName,
        password: cs.password,
      }),
    });
    const response = await data.json();
    if (response == "ok") {
      return true;
    }
  },
  async profileUpdate(params) {
    const cs = params;
    const data = await fetch(API_BASE_URL + "/profileupdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: cs.userId,
        fullname: cs.fullName,
        password: cs.password,
      }),
    });
    const response = await data.json();
    if (response == "updated") {
      return true;
    } else {
      return false;
    }
  },
  async getAuthToken(params) {
    console.log("params son ", params);
    const cs = params;
    const data = await fetch(API_BASE_URL + "/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
        password: cs.password,
      }),
    });
    console.log("data es ", data);
    const response = await data.json();
    if (response == "wrong email or password") {
      alert("wrong password");
      return false;
    }
    const token = response;
    const dataMe = await fetch(API_BASE_URL + "/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const responseMe = await dataMe.json();
    if (responseMe == "Not auth") {
      return false;
    } else {
      const response = {
        ...cs,
        logged: true,
        userId: responseMe.id,
        fullName: responseMe.fullName,
        token: token,
      };
      return response;
    }
  },
  async getNearLostPets(params) {
    const cs = params;
    const data = await fetch(
      API_BASE_URL + "/pets?lng=" + cs.lng + "&lat=" + cs.lat,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await data.json();
    console.log(response);
    return response;
  },
  async getMyReportedPets(params) {
    const cs = params;
    const response = await fetch(API_BASE_URL + "/pets/" + cs.userId);
    const data = await response.json();
    return data;
  },
};

export default APICalls;
