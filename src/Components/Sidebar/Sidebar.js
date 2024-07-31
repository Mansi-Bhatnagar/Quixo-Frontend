import { useEffect, useState } from "react";
import CreateWorkspace from "../Modal/CreateWorkspace/CreateWorkspace";
import add from "../../Assets/Images/material-add.svg";
import board from "../../Assets/Images/board.svg";
import member from "../../Assets/Images/member.svg";
import dustbin from "../../Assets/Images/material-delete.svg";
import classes from "./Sidebar.module.css";
import DeleteWorkspace from "../Modal/DeleteWorkspace/DeleteWorkspace";

const Sidebar = (props) => {
  const { workspaces } = props;
  const tabColors = ["#80ed99", "#48cae4", "#d00000", "#9d4edd", "#ffba08"];
  let index = 0;

  //States
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [wsTabOpen, setWsTabOpen] = useState(workspaces && workspaces[0]?.id);
  const [activeWsIndex, setActiveWsIndex] = useState(
    workspaces && workspaces[0]?.id
  );
  const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] =
    useState(false);

  //Handlers
  const createWorkspaceHandler = () => {
    setShowCreateWorkspaceModal(true);
  };

  const wsTabHandler = (id) => {
    setWsTabOpen((prev) => (prev === id ? false : id));
    setActiveWsIndex(id);
  };

  const deleteWorkspaceHandler = () => {
    setShowDeleteWorkspaceModal(true);
  };

  useEffect(() => {
    console.log(activeWsIndex);
  }, [activeWsIndex]);

  return (
    <>
      <div className={classes.container}>
        <button className={classes.wsBtn} onClick={createWorkspaceHandler}>
          <img src={add} alt="add" />
          <span>Create New Workspace</span>
        </button>
        {workspaces &&
          workspaces.map((workspace) => {
            return (
              <div key={workspace.id} className={classes.wsTabContainer}>
                <div
                  className={classes.wsTab}
                  onClick={() => wsTabHandler(workspace.id)}
                >
                  <div
                    className={classes.wsIcon}
                    style={{ backgroundColor: `${tabColors[index++ % 5]}` }}
                  >
                    {workspace.workspace_name
                      ? workspace.workspace_name[0].toUpperCase()
                      : ""}
                  </div>
                  <span>{workspace.workspace_name || ""}</span>
                </div>
                {wsTabOpen === workspace.id && (
                  <ul className={classes.options}>
                    <li>
                      <img src={board} alt="board" />
                      <span>Boards</span>
                    </li>
                    <li>
                      <img src={member} alt="member" />
                      <span>Members</span>
                    </li>
                    <li onClick={deleteWorkspaceHandler}>
                      <img src={dustbin} alt="delete" />
                      <span>Delete Workspace</span>
                    </li>
                  </ul>
                )}
              </div>
            );
          })}
      </div>
      <CreateWorkspace
        show={showCreateWorkspaceModal}
        onHide={() => setShowCreateWorkspaceModal(false)}
      />
      <DeleteWorkspace
        show={showDeleteWorkspaceModal}
        onHide={() => setShowDeleteWorkspaceModal(false)}
        id={activeWsIndex}
      />
    </>
  );
};

export default Sidebar;
