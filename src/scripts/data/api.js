import CONFIG from "../config";
import { fetchLoader, stopLoader } from "../loader-animation";

export async function getAllDataStories() {
  fetchLoader();
  try {
    const keyToken = localStorage.getItem("token");
    const fetchResponse = await fetch(
      CONFIG.API_BASE_URL + "/stories?size=80",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keyToken}`,
        },
      }
    );
    const result = await fetchResponse.json();
    return result;
  } catch (error) {
    alert("Error Get All Data Stroies : " + error.message);
    console.error(error);
  } finally {
    stopLoader();
  }
}

export async function createStory({ description, photo, lat, lon }) {
  fetchLoader();
  try {
    const keyToken = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat !== undefined && lon !== undefined) {
      formData.append("lat", lat);
      formData.append("lon", lon);
    }

    const fetchResponse = await fetch(CONFIG.API_BASE_URL + "/stories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${keyToken}`,
      },
      body: formData,
    });
    if (!fetchResponse.ok) {
      alert(`Error When Create Data Strories : ${fetchResponse.statusText}`);
    }
    const result = await fetchResponse.json();
    return result;
  } catch (error) {
    alert("Error Create All Data Stroies : " + error.message);
    console.error(error);
  } finally {
    stopLoader();
  }
}

export async function login({ email, password }) {
  fetchLoader();
  try {
    const fetchResponse = await fetch(CONFIG.API_BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const result = await fetchResponse.json();
    if (fetchResponse.ok && result.loginResult?.token) {
      localStorage.setItem("token", result.loginResult.token);
      localStorage.setItem("userName", result.loginResult.name);
    }
    return result;
  } catch (error) {
    alert("Error While Login : " + error.message);
    console.error(error);
  } finally {
    stopLoader();
  }
}

export async function register({ name, email, password }) {
  fetchLoader();
  try {
    const fetchResponse = await fetch(CONFIG.API_BASE_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    if (!fetchResponse) {
      alert(`Error When Regis Strories : ${result.statusText}`);
    }
    const result = await fetchResponse.json();
    console.log({ result });
    return result;
  } catch (error) {
    alert("Error While Register : " + error.message);
    console.error(error);
  } finally {
    stopLoader();
  }
}
