import axios from "axios";

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
        baseURL: process.env.REACT_APP_WORKSPACE_BASE_URL,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllWorkspaces(jwt, userId) {
  try {
    console.log(process.env.REACT_APP_WORKSPACE_BASE_URL);
    const response = await axios.get(`/get_user_workspaces/${userId}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${jwt}`,
      },
      baseURL: process.env.REACT_APP_WORKSPACE_BASE_URL,
    });
    console.log(response);
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
      baseURL: process.env.REACT_APP_WORKSPACE_BASE_URL,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addWorkspaceMember(workspaceId, email, jwt) {
  try {
    const response = await axios.post(
      `/add_member/${workspaceId}`,
      { email: email },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${jwt}`,
        },
        baseURL: process.env.REACT_APP_WORKSPACE_BASE_URL,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMembers(workspaceId, jwt) {
  try {
    const response = await axios.get(`/get_members/${workspaceId}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${jwt}`,
      },
      baseURL: process.env.REACT_APP_WORKSPACE_BASE_URL,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editWorkspaceDetails(
  workspaceId,
  name,
  description,
  jwt
) {
  try {
    const response = await axios.patch(
      `/edit_workspace_details/${workspaceId}`,
      {
        name: name,
        description: description,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${jwt}`,
        },
        baseURL: process.env.REACT_APP_WORKSPACE_BASE_URL,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
