import { CONFIG } from "../config";
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

export async function getDetailStory(id) {
  try {
    const keyToken = localStorage.getItem("token");
    const fetchResponse = await fetch(
      CONFIG.API_BASE_URL + `/stories/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keyToken}`,
        },
      }
    );
    if (!fetchResponse.ok) {
      alert(`Error When Get Detail Strories : ${fetchResponse.statusText}`);
    }
    const result = await fetchResponse.json();
    return result;
  } catch (error) {

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

export async function subscribeWebPush({ endpoint, p256dh, auth }) {
  try {
    const keyToken = localStorage.getItem("token");
    if (!keyToken) throw new Error("User not authenticated (no token)");

    const response = await fetch(
      `${CONFIG.API_BASE_URL}/notifications/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keyToken}`,
        },
        body: JSON.stringify({
          endpoint,
          keys: {
            p256dh,
            auth,
          },
        }),
      }
    );

    const result = await response.json();
    if (!response.ok || result.error) {
      throw new Error(result.message || "Failed to subscribe");
    }

    return result;
  } catch (error) {
    console.error("Error subscribing to push notification:", error);
    throw error;
  }
}

export async function unsubscribeWebPush(endpoint) {
  const keyToken = localStorage.getItem("token");

  const response = await fetch(
    CONFIG.API_BASE_URL + "/notifications/subscribe",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      body: JSON.stringify({ endpoint }),
    }
  );

  if (!response.ok) {
    throw new Error("Gagal unsubscribe: " + response.statusText);
  }

  return response.json();
}
