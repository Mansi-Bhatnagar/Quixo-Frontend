import { useState } from "react";
import CreateWorkspace from "./Modal/CreateWorkspace";
import add from "../Assets/Images/material-add.svg";
import board from "../Assets/Images/board.svg";
import member from "../Assets/Images/member.svg";
import dustbin from "../Assets/Images/material-delete.svg";
import DeleteWorkspace from "./Modal/DeleteWorkspace";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const { workspaces } = props;
  const tabColors = ["#007f5f", "#023e7d", "#d00000", "#9d4edd", "#ffba08"];
  const navigate = useNavigate();

  //States
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [wsTabOpen, setWsTabOpen] = useState();
  const [activeWsIndex, setActiveWsIndex] = useState(
    (workspaces?.length > 0 && workspaces[0]?.id) || 1
  );
  const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] =
    useState(false);
  const [activeWsColor, setActiveWsColor] = useState();

  //Handlers
  const createWorkspaceHandler = () => {
    setShowCreateWorkspaceModal(true);
  };

  const wsTabHandler = (workspaceId, color) => {
    setWsTabOpen((prev) => (prev === workspaceId ? false : workspaceId));
    setActiveWsIndex(workspaceId);
    setActiveWsColor(color);
  };

  const deleteWorkspaceHandler = () => {
    setShowDeleteWorkspaceModal(true);
  };

  const membersHandler = (name, description) => {
    navigate(`${name.split(" ").join("")}/members`, {
      state: { color: activeWsColor, name: name, description: description },
    });
  };

  const boardsHandler = (name, description) => {
    navigate(`/dashboard/${name.split(" ").join("")}/boards`, {
      state: { color: activeWsColor, name: name, description: description },
    });
  };
  //Effects

  // useEffect(() => {
  //   console.log(activeWsIndex);
  // }, [activeWsIndex]);

  return (
    <>
      <div className="sticky top-10 w-[256px] border-r border-r-[#33415c] h-[80vh]">
        <button
          className="flex items-center justify-start gap-[10px] border-none bg-transparent p-[5px] rounded-md w-[250px] mb-6 hover:cursor-pointer hover:bg-[#5c677d] "
          onClick={createWorkspaceHandler}
        >
          <img src={add} alt="add" />
          <span className="text-white">Create New Workspace</span>
        </button>
        <h3 className="text-[#97a4b2] text-sm my-4">Your workspaces</h3>
        {workspaces &&
          workspaces.map((workspace, idx) => {
            return (
              <div key={workspace.id}>
                <div
                  style={{
                    background: wsTabOpen === workspace.id ? "#5c677d" : "",
                  }}
                  className="flex items-center justify-start gap-[10px] w-[250px] p-[5px] rounded-md hover:cursor-pointer hover:bg-[#5c677d]"
                  onClick={() => wsTabHandler(workspace.id, tabColors[idx])}
                >
                  <div
                    className="w-[30px] h-[30px] text-white rounded-md flex items-center justify-center my-[5px] mx-0"
                    style={{ backgroundColor: `${tabColors[idx % 5]}` }}
                  >
                    {workspace.workspace_name
                      ? workspace.workspace_name[0].toUpperCase()
                      : ""}
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-white">
                      {workspace.workspace_name || ""}
                    </span>
                    <ChevronDownIcon className="w-5 text-white" />
                  </div>
                </div>

                {wsTabOpen === workspace.id && (
                  <ul className="[&_li]:flex [&_li]:items-center [&_li]:justify-start [&_li]:gap-2 [&_li]:py-[6px] [&_li]:px-2 [&_li]:cursor-pointer [&_li]:w-[200] [&_li]:rounded-lg hover:[&_li]:cursor-pointer [&_span]:text-[#97a4b2]">
                    <li
                      onClick={() =>
                        boardsHandler(
                          workspace.workspace_name,
                          workspace.description
                        )
                      }
                    >
                      <img src={board} alt="board" />
                      <span>Boards</span>
                    </li>
                    <li
                      onClick={() =>
                        membersHandler(
                          workspace.workspace_name,
                          workspace.description
                        )
                      }
                    >
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
        <h3 className="text-[#97a4b2] text-sm my-4">
          Workspaces shared with you
        </h3>
      </div>
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
