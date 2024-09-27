import axios from "axios";

const config = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    withCredentials: true,
  },
  baseURL: process.env.REACT_APP_AUTH_BASE_URL,
  withCredentials: true,
};

export async function createUser(username, email, password) {
  try {
    const response = await axios.post(
      "/signup",
      {
        username: username,
        email: email,
        password: password,
      },
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function verifyOTP(otp, token, workspaceId) {
  try {
    const response = await axios.post(
      "/signup_verification",
      {
        otp: Number(otp),
        token: token,
        workspace_id: workspaceId,
      },
      config
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function login(email, password, token, workspaceId) {
  try {
    const response = await axios.post(
      "/login",
      {
        email: email,
        password: password,
        workspace_id: workspaceId,
        token: token,
      },
      config
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logout(email) {
  try {
    const response = await axios.post(
      "/logout",
      { email: email },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        baseURL: process.env.REACT_APP_AUTH_BASE_URL,
        withCredentials: true,
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function forgetPassword(email) {
  try {
    const response = await axios.post("/pw_forget", { email: email }, config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createNewPassword(email, password, otp) {
  try {
    const response = await axios.post(
      "/pw_reset",
      {
        email: email,
        new_password: password,
        otp: Number(otp),
      },
      config
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
