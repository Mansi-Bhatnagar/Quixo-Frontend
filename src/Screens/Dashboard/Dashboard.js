import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CreateWorkspace from "../../Components/Modal/CreateWorkspace/CreateWorkspace";
import team from "../../Assets/Images/team.svg";
import classes from "./Dashboard.module.css";
import { getAllWorkspaces } from "../../Services/Workspace";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  //States
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [workspaces, setWorkspaces] = useState([]);

  //Handlers
  const createWorkspaceHandler = () => {
    setShowCreateWorkspaceModal(true);
  };

  //APIs

  const {
    data: workspaceData,
    error: workspaceError,
    isLoading: workspaceLoading,
  } = useQuery({
    queryFn: getAllWorkspaces,
    queryKey: ["all-workspaces"],
  });

  //Effects
  useEffect(() => {
    if (!workspaceLoading && workspaceData) {
      setWorkspaces(workspaceData?.data);
    } else if (workspaceError) {
      console.error(workspaceError);
    }
  }, [workspaceLoading, workspaceData, workspaceError]);

  return (
    <div className={classes.dashboardContainer}>
      <Navbar />
      <div className={classes.content}>
        <Sidebar workspaces={workspaces} />
        <div className={classes.workspaces}>
          {workspaces.length === 0 ? (
            <>
              <h4>Your workspaces</h4>
              <div className={classes.noWsContainer}>
                <p>Seems like you aren't a member of any workspaces yet. </p>
                <span onClick={createWorkspaceHandler}>Click to create</span>
                <img src={team} alt="team" />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <CreateWorkspace
        show={showCreateWorkspaceModal}
        onHide={() => setShowCreateWorkspaceModal(false)}
      />
    </div>
  );
};

export default Dashboard;
