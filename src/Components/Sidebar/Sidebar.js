import { useState } from "react";
import CreateWorkspace from "../Modal/CreateWorkspace/CreateWorkspace";
import add from "../../Assets/Images/material-add.svg";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  //States
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);

  //Handlers
  const createWorkspaceHandler = () => {
    setShowCreateWorkspaceModal(true);
  };

  return (
    <>
      <div className={classes.container}>
        <button className={classes.wsBtn} onClick={createWorkspaceHandler}>
          <img src={add} alt="add" />
          <span>Create New Workspace</span>
        </button>
      </div>
      <CreateWorkspace
        show={showCreateWorkspaceModal}
        onHide={() => setShowCreateWorkspaceModal(false)}
      />
    </>
  );
};

export default Sidebar;
