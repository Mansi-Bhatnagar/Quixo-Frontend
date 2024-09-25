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
  const userId = localStorage.getItem("userId");

  //States
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  //Handlers
  const createWorkspaceHandler = () => {
    setShowCreateWorkspaceModal(true);
  };

  const isSidebarVisible = (value) => {
    setSidebarVisible(value);
  };

  //APIs
  const {
    data: workspaceData,
    error: workspaceError,
    isLoading: workspaceLoading,
  } = useQuery({
    queryFn: () => getAllWorkspaces(jwt, userId),
    queryKey: ["all-workspaces", jwt, userId],
    enabled: jwt !== "" && userId !== "",
  });

  //Effects
  useEffect(() => {
    if (!workspaceLoading && workspaceData) {
      setWorkspaces({ ...workspaceData?.data });
      console.log(workspaceData);
    } else if (workspaceError) {
      console.error(workspaceError);
    }
  }, [workspaceLoading, workspaceData, workspaceError]);

  return (
    <div className="min-h-screen bg-[#1d2125]">
      <Navbar
        isSidebarVisible={isSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <div className="mt-10 flex items-start gap-[30px] px-[150px] max-xl:px-[3%] max-sm:px-[5%]">
        {sidebarVisible ? (
          <div
            onClick={() => setSidebarVisible(false)}
            className="absolute left-0 top-0 hidden h-screen w-screen max-md:block"
          ></div>
        ) : (
          ""
        )}
        <Sidebar
          workspaces={workspaces}
          workspaceLoading={workspaceLoading}
          isSidebarVisible={isSidebarVisible}
          sidebarVisible={sidebarVisible}
        />
        <div className="text-[#97a4b2]">
          {workspaces?.created_workspaces?.length === 0 &&
          workspaces?.invited_workspaces?.length === 0 ? (
            <>
              <h4>Your workspaces</h4>
              <div>
                <p className="inline-block tracking-[1px] text-white">
                  Seems like you aren't a member of any workspaces yet.{" "}
                </p>
                <span
                  className="ml-[5px] cursor-pointer text-lg font-semibold tracking-[1px] text-[#97a4b2] hover:underline"
                  onClick={createWorkspaceHandler}
                >
                  Click to create
                </span>
                <img
                  className="mx-auto mb-0 mt-[100px] block w-[400px]"
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
