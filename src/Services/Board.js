import axios from "axios";

export async function createBoard(
  name,
  description,
  gradient,
  workspaceId,
  jwt
) {
  try {
    const response = await axios.post(
      "/create_board",
      {
        name: name,
        description: description,
        gradient: gradient,
        workspace_id: workspaceId,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${jwt}`,
        },
        baseURL: process.env.REACT_APP_BOARD_BASE_URL,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBoards(workspaceId, jwt) {
  try {
    const response = await axios.get(`/get_boards/${workspaceId}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${jwt}`,
      },
      baseURL: process.env.REACT_APP_BOARD_BASE_URL,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBoardGradients(jwt) {
  try {
    const response = await axios.get("/get_board_gradients", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${jwt}`,
      },
      baseURL: process.env.REACT_APP_BOARD_BASE_URL,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
