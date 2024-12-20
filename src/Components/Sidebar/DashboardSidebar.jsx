import { useEffect, useState } from "react";
import CreateWorkspace from "../Modal/CreateWorkspace";
import add from "../../Assets/Images/material-add.svg";
import board from "../../Assets/Images/board.svg";
import member from "../../Assets/Images/member.svg";
import dustbin from "../../Assets/Images/material-delete.svg";
import DeleteWorkspace from "../Modal/DeleteWorkspace";
import {
  ChevronDoubleRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Sidebar = (props) => {
  const { workspaces } = props;
  const isSmallScreen = window.innerWidth < 768;
  const navigate = useNavigate();

  //States
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [wsTabOpen, setWsTabOpen] = useState();
  const [activeWsIndex, setActiveWsIndex] = useState();
  const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  //Handlers
  const createWorkspaceHandler = () => {
    setShowCreateWorkspaceModal(true);
    if (isSmallScreen) {
      props.isSidebarVisible(false);
    }
  };

  const wsTabHandler = (workspaceId, name, description, workspaceColor) => {
    setWsTabOpen((prev) => (prev === workspaceId ? false : workspaceId));
    setActiveWsIndex(workspaceId, name, description, workspaceColor);
    boardsHandler(workspaceId, name, description, workspaceColor);
  };

  const deleteWorkspaceHandler = () => {
    setShowDeleteWorkspaceModal(true);
    if (isSmallScreen) {
      props.isSidebarVisible(false);
    }
  };

  const membersHandler = (workspaceId, name, description, workspaceColor) => {
    setSelectedOption(1);
    navigate(`${workspaceId}/${name.split(" ").join("")}/members`, {
      state: { color: workspaceColor, name: name, description: description },
    });
    if (isSmallScreen) {
      props.isSidebarVisible(false);
    }
  };

  const boardsHandler = (workspaceId, name, description, workspaceColor) => {
    setSelectedOption(0);
    navigate(`${workspaceId}/${name.split(" ").join("")}/boards`, {
      state: { color: workspaceColor, name: name, description: description },
    });
    if (isSmallScreen) {
      props.isSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (workspaces) {
      const created = workspaces.created_workspaces;
      const invited = workspaces.invited_workspaces;
      if (created?.length > 0) {
        const wsId = created[0].workspace_id;
        const name = created[0].workspace_name;
        const description = created[0].description;
        const wsColor = created[0].workspace_color;
        setWsTabOpen(wsId);
        setActiveWsIndex(wsId, name, description, wsColor);
        navigate(`${wsId}/${name.split(" ").join("")}/boards`, {
          state: { color: wsColor, name: name, description: description },
        });
      } else if (invited?.length > 0) {
        const wsId = invited[0].workspace_id;
        const name = invited[0].workspace_name;
        const description = invited[0].description;
        const wsColor = invited[0].workspace_color;
        setWsTabOpen(wsId);
        setActiveWsIndex(wsId, name, description, wsColor);
        navigate(`${wsId}/${name.split(" ").join("")}/boards`, {
          state: { color: wsColor, name: name, description: description },
        });
      }
    }
  }, [workspaces]);

  return (
    <>
      {props.sidebarVisible && (
        <div className="no-scrollbar sticky top-10 max-h-[calc(100vh_-_93px)] min-h-[calc(100vh_-_93px)] min-w-[265px] overflow-x-hidden overflow-y-scroll scroll-smooth border-r border-r-[#33415c] max-md:absolute max-md:left-[3%] max-md:top-16 max-md:w-[297px] max-md:rounded-md max-md:bg-[#33415c] max-md:p-4 max-md:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
          <button
            className="mb-6 flex w-[250px] items-center justify-start gap-[10px] rounded-md border-none bg-transparent p-[5px] hover:cursor-pointer hover:bg-[#5c677d]"
            onClick={createWorkspaceHandler}
          >
            <img src={add} alt="add" />
            <span className="text-white">Create New Workspace</span>
          </button>
          <h3 className="my-4 text-sm text-[#97a4b2]">Your workspaces</h3>
          {props.workspaceLoading ? (
            <Skeleton
              height={40}
              width={250}
              count={4}
              baseColor={"#33415c"}
              highlightColor={"#5c677d"}
              className="mb-[10px]"
            />
          ) : (
            workspaces?.created_workspaces?.length > 0 &&
            workspaces?.created_workspaces?.map((workspace, idx) => {
              return (
                <div key={workspace.workspace_id}>
                  <div
                    style={{
                      background:
                        wsTabOpen === workspace.workspace_id ? "#5c677d" : "",
                    }}
                    className="flex w-[250px] items-center justify-start gap-[10px] rounded-md p-[5px] hover:cursor-pointer hover:bg-[#5c677d]"
                    onClick={() =>
                      wsTabHandler(
                        workspace.workspace_id,
                        workspace.workspace_name,
                        workspace.description,
                        workspace.workspace_color
                      )
                    }
                  >
                    <div
                      className="mx-0 my-[5px] flex h-[30px] w-[30px] items-center justify-center rounded-md text-white"
                      style={{
                        backgroundColor: `${workspace.workspace_color}`,
                      }}
                    >
                      {workspace.workspace_name
                        ? workspace.workspace_name[0].toUpperCase()
                        : ""}
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className="text-white">
                        {workspace.workspace_name || ""}
                      </span>
                      <ChevronDownIcon className="w-5 text-white" />
                    </div>
                  </div>

                  {wsTabOpen === workspace.workspace_id && (
                    <ul className="my-2 ml-2 [&_li]:flex [&_li]:w-max [&_li]:cursor-pointer [&_li]:items-center [&_li]:justify-start [&_li]:gap-2 [&_li]:rounded-lg [&_li]:px-2 [&_li]:py-[6px] hover:[&_li]:cursor-pointer [&_span]:text-[#97a4b2]">
                      <li
                        onClick={() =>
                          boardsHandler(
                            workspace.workspace_id,
                            workspace.workspace_name,
                            workspace.description,
                            workspace.workspace_color
                          )
                        }
                      >
                        {selectedOption === 0 && (
                          <ChevronDoubleRightIcon className="h-4 w-4 text-[#97a4b2]" />
                        )}
                        <img src={board} alt="board" />
                        <span>Boards</span>
                      </li>
                      <li
                        onClick={() =>
                          membersHandler(
                            workspace.workspace_id,
                            workspace.workspace_name,
                            workspace.description,
                            workspace.workspace_color
                          )
                        }
                      >
                        {selectedOption === 1 && (
                          <ChevronDoubleRightIcon className="h-4 w-4 text-[#97a4b2]" />
                        )}
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
            })
          )}
          <h3 className="my-4 text-sm text-[#97a4b2]">
            Workspaces shared with you
          </h3>
          {workspaces?.invited_workspaces?.length > 0 &&
            workspaces?.invited_workspaces?.map((workspace, idx) => {
              return (
                <div key={workspace.workspace_id}>
                  <div
                    style={{
                      background:
                        wsTabOpen === workspace.workspace_id ? "#5c677d" : "",
                    }}
                    className="flex w-[250px] items-center justify-start gap-[10px] rounded-md p-[5px] hover:cursor-pointer hover:bg-[#5c677d]"
                    onClick={() =>
                      wsTabHandler(
                        workspace.workspace_id,
                        workspace.workspace_name,
                        workspace.description,
                        workspace.workspace_color
                      )
                    }
                  >
                    <div
                      className="mx-0 my-[5px] flex h-[30px] w-[30px] items-center justify-center rounded-md text-white"
                      style={{
                        backgroundColor: `${workspace.workspace_color}`,
                      }}
                    >
                      {workspace.workspace_name
                        ? workspace.workspace_name[0].toUpperCase()
                        : ""}
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className="text-white">
                        {workspace.workspace_name || ""}
                      </span>
                      <ChevronDownIcon className="w-5 text-white" />
                    </div>
                  </div>

                  {wsTabOpen === workspace.workspace_id && (
                    <ul className="[&_li]:flex [&_li]:w-[200] [&_li]:cursor-pointer [&_li]:items-center [&_li]:justify-start [&_li]:gap-2 [&_li]:rounded-lg [&_li]:px-2 [&_li]:py-[6px] hover:[&_li]:cursor-pointer [&_span]:text-[#97a4b2]">
                      <li
                        onClick={() =>
                          boardsHandler(
                            workspace.workspace_id,
                            workspace.workspace_name,
                            workspace.description,
                            workspace.workspace_color
                          )
                        }
                      >
                        {selectedOption === 0 && (
                          <ChevronDoubleRightIcon className="h-4 w-4 text-[#97a4b2]" />
                        )}
                        <img src={board} alt="board" />
                        <span>Boards</span>
                      </li>
                      <li
                        onClick={() =>
                          membersHandler(
                            workspace.workspace_id,
                            workspace.workspace_name,
                            workspace.description,
                            workspace.workspace_color
                          )
                        }
                      >
                        {selectedOption === 1 && (
                          <ChevronDoubleRightIcon className="h-4 w-4 text-[#97a4b2]" />
                        )}
                        <img src={member} alt="member" />
                        <span>Members</span>
                      </li>
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {showCreateWorkspaceModal && (
        <CreateWorkspace
          open={showCreateWorkspaceModal}
          setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
          showInitialScreen={true}
        />
      )}
      <DeleteWorkspace
        open={showDeleteWorkspaceModal}
        onClose={() => setShowDeleteWorkspaceModal(false)}
        id={activeWsIndex}
      />
    </>
  );
};

export default Sidebar;
