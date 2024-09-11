import axios from "axios";

// const config = {
//   headers: {
//     "X-Requested-With": "XMLHttpRequest",
//     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//   },
//   baseURL: "http://localhost:5000/workspace",
// };

export async function createWorkspace(name, description, jwt) {
  try {
    const response = await axios.post(
      "/create_workspace",
      {
        email: localStorage.getItem("email"),
        name: name,
        description: description,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${jwt}`,
        },
        baseURL: "http://localhost:5000/workspace",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllWorkspaces(jwt) {
  try {
    const response = await axios.get("/get_workspaces", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${jwt}`,
      },
      baseURL: "http://localhost:5000/workspace",
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteWorkspace(id, jwt) {
  try {
    const response = await axios.delete(`/delete_workspace/${id}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${jwt}`,
      },
      baseURL: "http://localhost:5000/workspace",
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addWorkspaceMember(workspaceId, emails, jwt) {
  try {
    const response = await axios.post(
      `/add_member/${workspaceId}`,
      { email: emails },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${jwt}`,
        },
        baseURL: "http://localhost:5000/workspace",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
