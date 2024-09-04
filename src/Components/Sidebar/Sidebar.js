import { useEffect, useState } from "react";
import CreateWorkspace from "../Modal/CreateWorkspace/CreateWorkspace";
import add from "../../Assets/Images/material-add.svg";
import board from "../../Assets/Images/board.svg";
import member from "../../Assets/Images/member.svg";
import dustbin from "../../Assets/Images/material-delete.svg";
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
      <div className="ml-[150px] sticky top-10 w-[256px] border-r border-r-[#33415c] h-[80vh]">
        <button
          className="flex items-center justify-start gap-[10px] border-none bg-transparent p-[5px] rounded-md w-[250px] mb-6 hover:cursor-pointer hover:bg-[#5c677d] "
          onClick={createWorkspaceHandler}
        >
          <img src={add} alt="add" />
          <span className="text-white">Create New Workspace</span>
        </button>
        {workspaces &&
          workspaces.map((workspace) => {
            return (
              <div key={workspace.id}>
                <div
                  className="flex items-center justify-start gap-[10px] w-[250px] p-[5px] rounded-md hover:cursor-pointer hover:bg-[#5c677d]"
                  onClick={() => wsTabHandler(workspace.id)}
                >
                  <div
                    className="w-[30px] h-[30px] text-white rounded-md flex items-center justify-center my-[5px] mx-0"
                    style={{ backgroundColor: `${tabColors[index++ % 5]}` }}
                  >
                    {workspace.workspace_name
                      ? workspace.workspace_name[0].toUpperCase()
                      : ""}
                  </div>
                  <span className="text-white">
                    {workspace.workspace_name || ""}
                  </span>
                </div>

                {wsTabOpen === workspace.id && (
                  <ul className="[&_li]:flex [&_li]:items-center [&_li]:justify-start [&_li]:gap-2 [&_li]:py-[6px] [&_li]:px-2 [&_li]:cursor-pointer [&_li]:w-[200] [&_li]:rounded-lg hover:[&_li]:cursor-pointer [&_span]:bg-[#33415c]">
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
        open={showCreateWorkspaceModal}
        setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
      />
      <DeleteWorkspace
        open={showDeleteWorkspaceModal}
        onClose={() => setShowDeleteWorkspaceModal(false)}
        id={activeWsIndex}
      />
    </>
  );
};

export default Sidebar;
