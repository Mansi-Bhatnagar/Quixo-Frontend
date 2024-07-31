import axios from "axios";

const config = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
  baseURL: "http://localhost:5000/workspace",
};

export async function createWorkspace(name, description) {
  try {
    const response = await axios.post(
      "/create_workspace",
      {
        email: localStorage.getItem("email"),
        name: name,
        description: description,
      },
      config
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllWorkspaces() {
  try {
    const response = await axios.get("/get_workspaces", config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteWorkspace(id) {
  try {
    const response = await axios.delete(`/delete_workspace/${id}`, config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
