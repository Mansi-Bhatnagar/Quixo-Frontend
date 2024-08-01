import axios from "axios";

const config = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    withCredentials: true,
  },
  baseURL: "http://localhost:5000/auth",
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

export async function verifyOTP(email, otp) {
  try {
    const response = await axios.post(
      "/signup_verification",
      {
        email: email,
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

export async function login(email, password) {
  try {
    const response = await axios.post(
      "/login",
      {
        email: email,
        password: password,
      },
      config
    );
    return response;
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
