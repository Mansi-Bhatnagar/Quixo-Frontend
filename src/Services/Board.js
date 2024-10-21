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

export async function getBoardDetails(boardId, jwt) {
  try {
    const response = await axios.get(`/get_board_details/${boardId}`, {
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

export async function editBoardDetails(boardId, name, description, jwt) {
  try {
    const response = await axios.patch(
      `/edit_board_details/${boardId}`,
      {
        name: name,
        description: description,
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

export async function deleteBoard(boardId, jwt) {
  try {
    const response = await axios.delete(`/delete_board/${boardId}`, {
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

export async function addList(boardId, name, jwt) {
  try {
    const response = await axios.post(
      `/add_list/${boardId}`,
      {
        name: name,
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

export async function getLists(boardId, jwt) {
  try {
    const response = await axios.get(`/get_lists/${boardId}`, {
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

export async function addCard(listId, title, jwt) {
  try {
    const response = await axios.post(
      `/add_card/${listId}`,
      {
        title: title,
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

export async function getCards(listId, jwt) {
  try {
    const response = await axios.get(`/get_cards/${listId}`, {
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

export async function changeGradient(boardId, gradient, jwt) {
  try {
    const response = await axios.patch(
      `/change_gradient/${boardId}`,
      {
        gradient: gradient,
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

export async function deleteList(listId, jwt) {
  try {
    const response = await axios.delete(`/delete_list/${listId}`, {
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

export async function editCardTitle(cardId, title, jwt) {
  try {
    const response = await axios.patch(
      `/edit_card_title/${cardId}`,
      {
        title: title,
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

export async function editCardDescription(cardId, description, jwt) {
  try {
    const response = await axios.post(
      `/edit_card_description/${cardId}`,
      {
        description: description,
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

export async function deleteCard(cardId, jwt) {
  try {
    const response = await axios.delete(`/delete_card/${cardId}`, {
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
