import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CreateWorkspace from "../../Components/Modal/CreateWorkspace/CreateWorkspace";
import team from "../../Assets/Images/team.svg";
import classes from "./Dashboard.module.css";
const Dashboard = () => {
  //States
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [workspaces, setWorkspaces] = useState();

  //Handlers
  const createWorkspaceHandler = () => {
    setShowCreateWorkspaceModal(true);
  };
  const getAllWorkspacesHandler = () => {
    axios
      .get("http://localhost:5000/workspace/get_workspaces", {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setWorkspaces(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Effects
  useEffect(() => {
    getAllWorkspacesHandler();
  }, []);

  return (
    <div className={classes.dashboardContainer}>
      <Navbar />
      <div className={classes.content}>
        <Sidebar workspaces={workspaces} />
        <div className={classes.workspaces}>
          {!workspaces ? (
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
