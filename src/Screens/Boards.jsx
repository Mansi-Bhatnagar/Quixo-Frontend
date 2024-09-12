import { useLocation, useNavigate } from "react-router-dom";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import WorkspaceDetails from "../Components/Modal/WorkspaceDetails";
import CreateBoard from "../Components/Modal/CreateBoard";

const Boards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location?.state?.name;
  const description = location?.state?.description;
  const color = location?.state?.color;

  //dummy data which needs to be removed
  const boards = [
    {
      name: "test board",
      color: "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500",
      id: 0,
    },
    {
      name: "test board",
      color: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      id: 1,
    },
    {
      name: "test board",
      color: "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500",
      id: 2,
    },
    {
      name: "test board",
      color: "bg-gradient-to-r from-rose-500 via-pink-500 to-red-500",
      id: 3,
    },
    {
      name: "test board",
      color: "bg-gradient-to-r from-gray-300 via-yellow-500 to-amber-400",
      id: 4,
    },
    {
      color: "bg-gradient-to-r from-cyan-700 via-blue-500 to-indigo-600",
      id: 5,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500",
      id: 6,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700",
      id: 7,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-pink-200 via-purple-400 to-indigo-600",
      id: 8,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-red-200 via-rose-400 to-pink-600",
      id: 9,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-amber-200 via-orange-400 to-red-600",
      id: 10,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-yellow-200 via-lime-400 to-green-600",
      id: 11,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-red-200 via-pink-400 to-rose-600",
      id: 12,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-orange-600 via-amber-900 to-amber-950",
      id: 13,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900",
      id: 14,
      name: "test board",
    },
    {
      color: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500",
      id: 15,
      name: "test board",
    },
  ];

  //States
  const [showEditWorkspaceDetailsModal, setShowEditWorkspaceDetailsModal] =
    useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [showAllBoards, setShowAllBoards] = useState(false);

  const visibleBoards = showAllBoards ? boards : boards.slice(0, 2);
  const extraBoards = boards.length > 3 ? boards.length - 3 : 0;

  //Handlers
  const boardDetailHandler = (board) => {
    navigate(`/board/${board.id}`);
  };

  //API call for getting boards

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
      <div className="flex items-center flex-wrap gap-4">
        <button
          onClick={() => setShowCreateBoardModal(true)}
          className="flex cursor-pointer  hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:scale-[1.02] transition-all ease-in-out  items-center justify-center flex-col bg-[#33415c] rounded-md w-[200px] h-[100px]"
        >
          <PlusIcon className="text-[#97a4b2] w-7" />
          <span className="text-[#97a4b2] text-base font-medium">
            Create new board
          </span>
        </button>
        {visibleBoards.map((board) => {
          return (
            <div
              key={board.id}
              onClick={() => boardDetailHandler(board)}
              className={`cursor-pointer flex items-center justify-center ${board.color} hover:shadow-[0_3px_10px_rgb(151,164,178,0.4)] hover:scale-[1.02] transition-all ease-in-out rounded-md w-[200px] h-[100px]`}
            >
              <span className=" text-white text-base font-medium">
                {board.name}
              </span>
            </div>
          );
        })}
        {extraBoards > 0 ? (
          !showAllBoards ? (
            <button
              onClick={() => setShowAllBoards(true)}
              className={`cursor-pointer flex items-center justify-center ${boards[2].color} hover:shadow-[0_3px_10px_rgb(151,164,178,0.4)] hover:scale-[1.02] transition-all ease-in-out rounded-md w-[200px] h-[100px]`}
            >
              <PlusIcon className="text-white w-6" />

              <span className=" text-white text-base font-medium">
                {extraBoards} more boards
              </span>
            </button>
          ) : (
            ""
          )
        ) : boards.length >= 3 ? (
          <div
            onClick={boardDetailHandler}
            className={`cursor-pointer flex items-center justify-center ${boards[2].color} hover:shadow-[0_3px_10px_rgb(151,164,178,0.4)] hover:scale-[1.02] transition-all ease-in-out rounded-md w-[200px] h-[100px]`}
          >
            <span className=" text-white text-base font-medium">
              {boards[2].name}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>

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
