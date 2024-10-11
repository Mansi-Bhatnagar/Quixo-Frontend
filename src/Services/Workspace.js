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

export async function getAllWorkspaces(jwt) {
  try {
    console.log(process.env.REACT_APP_WORKSPACE_BASE_URL);
    const response = await axios.get(`/get_user_workspaces`, {
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

export async function leaveWorkspace(workspaceId, newAdminId, jwt) {
  try {
    const response = await axios.post(
      `/leave_workspace/${workspaceId}`,
      {
        new_admin_id: newAdminId,
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

export async function removeMember(workspaceId, userId, jwt) {
  try {
    const response = await axios.post(
      `/remove_member/${workspaceId}`,
      {
        user_id: userId,
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
