import { useLocation } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import WorkspaceDetails from "../Components/Modal/WorkspaceDetails";

const Boards = () => {
  const location = useLocation();
  const name = location?.state?.name;
  const description = location?.state?.description;
  const color = location?.state?.color;

  //States
  const [showEditWorkspaceDetailsModal, setShowEditWorkspaceDetailsModal] =
    useState(false);

  return (
    <div className="mb-9 w-[calc(100vw_-_586px)] border-b border-b-[#33415c] pb-5">
      <div className="flex items-start justify-start gap-3">
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
      {showEditWorkspaceDetailsModal && (
        <WorkspaceDetails
          open={showEditWorkspaceDetailsModal}
          setShowEditWorkspaceDetailsModal={setShowEditWorkspaceDetailsModal}
          name={name}
          description={description}
        />
      )}
    </div>
  );
};

export default Boards;
