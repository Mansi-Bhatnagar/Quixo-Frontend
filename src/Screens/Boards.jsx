import { useLocation } from "react-router-dom";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import WorkspaceDetails from "../Components/Modal/WorkspaceDetails";
import CreateBoard from "../Components/Modal/CreateBoard";

const Boards = () => {
  const location = useLocation();
  const name = location?.state?.name;
  const description = location?.state?.description;
  const color = location?.state?.color;

  //States
  const [showEditWorkspaceDetailsModal, setShowEditWorkspaceDetailsModal] =
    useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  return (
    <div className="mb-9 w-[calc(100vw_-_586px)] ">
      <div className="flex items-start justify-start gap-3 pb-5 border-b border-b-[#33415c]">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-lg text-white"
          style={{ backgroundColor: color }}
        >
          <span>{name?.[0].toUpperCase()}</span>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2">
            <span className="text-white">{name} </span>
            <PencilSquareIcon
              className="w-5 cursor-pointer text-white"
              onClick={() => {
                setShowEditWorkspaceDetailsModal(true);
              }}
            />
          </div>
          {description ? <p className="text-sm w-[70%]">{description}</p> : ""}
        </div>
      </div>

      <h3 className="mt-9 mb-4">Your boards</h3>
      <button
        onClick={() => setShowCreateBoardModal(true)}
        className="flex  cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:scale-[1.02] transition-all ease-in-out  items-center justify-center flex-col bg-[#33415c] rounded-md w-[200px] h-[100px]"
      >
        <PlusIcon className="text-[#97a4b2] w-7" />
        <span className="text-[#97a4b2] text-base font-medium">
          Create new board
        </span>
      </button>

      {showEditWorkspaceDetailsModal && (
        <WorkspaceDetails
          open={showEditWorkspaceDetailsModal}
          setShowEditWorkspaceDetailsModal={setShowEditWorkspaceDetailsModal}
          name={name}
          description={description}
        />
      )}
      {showCreateBoardModal && (
        <CreateBoard
          open={showCreateBoardModal}
          setShowCreateBoardModal={setShowCreateBoardModal}
        />
      )}
    </div>
  );
};

export default Boards;
