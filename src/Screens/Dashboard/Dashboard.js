import { useState } from "react";
import CreateWorkspace from "../../Components/Modal/CreateWorkspace/CreateWorkspace";
import classes from "./Dashboard.module.css";
const Dashboard = () => {
  //States
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);

  //Handlers
  const createWorkspaceHandler = () => {
    setShowCreateWorkspaceModal(true);
  };

  return (
    <div className={classes.dashboardContainer}>
      <CreateWorkspace
        show={showCreateWorkspaceModal}
        onHide={() => setShowCreateWorkspaceModal(false)}
      />
      <button onClick={createWorkspaceHandler}>Create a workspace</button>
    </div>
  );
};

export default Dashboard;

// Get all workspaces call to check whether any workspaces for the current user exist or not
// if not then display
