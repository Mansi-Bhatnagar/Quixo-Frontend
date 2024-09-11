import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import CreateWorkspace from "../Components/Modal/CreateWorkspace";
import team from "../Assets/Images/team.svg";
import { getAllWorkspaces } from "../Services/Workspace";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const jwt = useSelector((state) => state.authentication.jwt);

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
    queryFn: () => getAllWorkspaces(jwt),
    queryKey: ["all-workspaces", jwt],
    enabled: jwt !== "",
  });

  //Effects
  useEffect(() => {
    if (!workspaceLoading && workspaceData) {
      setWorkspaces([...workspaceData?.data]);
      console.log(workspaceData);
    } else if (workspaceError) {
      console.error(workspaceError);
    }
  }, [workspaceLoading, workspaceData, workspaceError]);

  return (
    <div className="bg-[#1d2125] min-h-screen">
      <Navbar />
      <div className="flex items-start gap-[30px] mt-10 pl-[150px]">
        <Sidebar workspaces={workspaces} />
        <div className="text-[#97a4b2] ">
          {workspaces.length === 0 ? (
            <>
              <h4>Your workspaces</h4>
              <div>
                <p className="text-white inline-block tracking-[1px]">
                  Seems like you aren't a member of any workspaces yet.{" "}
                </p>
                <span
                  className="ml-[5px] text-[#97a4b2] tracking-[1px] font-semibold text-lg cursor-pointer hover:underline"
                  onClick={createWorkspaceHandler}
                >
                  Click to create
                </span>
                <img
                  className="w-[400px] block mb-0 mt-[100px] mx-auto"
                  src={team}
                  alt="team"
                />
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
      {showCreateWorkspaceModal && (
        <CreateWorkspace
          open={showCreateWorkspaceModal}
          setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
          showInitialScreen={true}
        />
      )}
    </div>
  );
};

export default Dashboard;
