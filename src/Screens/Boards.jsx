import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import WorkspaceDetails from "../Components/Modal/WorkspaceDetails";
import CreateBoard from "../Components/Modal/CreateBoard";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../Services/Board";
import { useSelector } from "react-redux";

const Boards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location?.state?.name;
  const description = location?.state?.description;
  const color = location?.state?.color;
  const { id } = useParams();
  const jwt = useSelector((state) => state.authentication.jwt);

  //dummy data which needs to be removed
  // const boards = [
  //   {
  //     name: "test board",
  //     color: "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500",
  //     id: 0,
  //   },
  //   {
  //     name: "test board",
  //     color: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  //     id: 1,
  //   },
  //   {
  //     name: "test board",
  //     color: "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500",
  //     id: 2,
  //   },
  //   {
  //     name: "test board",
  //     color: "bg-gradient-to-r from-rose-500 via-pink-500 to-red-500",
  //     id: 3,
  //   },
  //   {
  //     name: "test board",
  //     color: "bg-gradient-to-r from-gray-300 via-yellow-500 to-amber-400",
  //     id: 4,
  //   },
  //   {
  //     color: "bg-gradient-to-r from-cyan-700 via-blue-500 to-indigo-600",
  //     id: 5,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500",
  //     id: 6,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700",
  //     id: 7,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-pink-200 via-purple-400 to-indigo-600",
  //     id: 8,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-red-200 via-rose-400 to-pink-600",
  //     id: 9,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-amber-200 via-orange-400 to-red-600",
  //     id: 10,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-yellow-200 via-lime-400 to-green-600",
  //     id: 11,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-red-200 via-pink-400 to-rose-600",
  //     id: 12,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-orange-600 via-amber-900 to-amber-950",
  //     id: 13,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900",
  //     id: 14,
  //     name: "test board",
  //   },
  //   {
  //     color: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500",
  //     id: 15,
  //     name: "test board",
  //   },
  // ];

  //States
  const [showEditWorkspaceDetailsModal, setShowEditWorkspaceDetailsModal] =
    useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [showAllBoards, setShowAllBoards] = useState(false);
  const [boards, setBoards] = useState([]);

  const visibleBoards = showAllBoards ? boards : boards.slice(0, 2);
  const extraBoards = boards.length > 3 ? boards.length - 3 : 0;

  //Handlers
  const boardDetailHandler = (board) => {
    navigate(`/board/${board.id}`);
  };

  //APIs
  const {
    data: boardsData,
    error: boardsError,
    isLoading: boardsLoading,
  } = useQuery({
    queryFn: () => getBoards(id, jwt),
    queryKey: ["boards", jwt],
    enabled: jwt !== "",
  });

  //Effects
  useEffect(() => {
    if (!boardsLoading && boardsData) {
      setBoards(boardsData?.data);
      console.log("boards = ", boardsData);
    } else if (boardsError) {
      console.error(boardsError);
    }
  }, [boardsLoading, boardsError, boardsData]);

  return (
    <div className="mb-9 max-xl:w-full">
      <div className="flex items-start justify-start gap-3 pb-5 max-sm:flex-col">
        <div
          className="flex h-12 min-w-12 items-center justify-center rounded-lg text-white"
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
          {description ? (
            <p className="text-justify text-sm">{description}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="h-[1px] w-[calc(100vw_-_600px)] bg-[#33415c] max-xl:w-[calc(100vw_-_377.5px)] max-md:w-[calc(100vw_-_46px)] max-sm:w-[calc(100vw_-_64px)]" />

      <h3 className="mb-4 mt-9">Your boards</h3>
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => setShowCreateBoardModal(true)}
          className="flex h-[100px] w-[200px] flex-grow cursor-pointer flex-col items-center justify-center rounded-md bg-[#33415c] transition-all ease-in-out hover:scale-[1.02] hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <PlusIcon className="w-7 text-[#97a4b2]" />
          <span className="text-base font-medium text-[#97a4b2]">
            Create new board
          </span>
        </button>
        {visibleBoards.map((board) => {
          return (
            <div
              key={board.id}
              onClick={() => boardDetailHandler(board)}
              className={`cursor-pointer  flex-grow flex items-center justify-center ${board.gradient} hover:shadow-[0_3px_10px_rgb(151,164,178,0.4)] hover:scale-[1.02] transition-all ease-in-out rounded-md w-[200px] h-[100px]`}
            >
              <span className="text-base font-medium text-white">
                {board.name}
              </span>
            </div>
          );
        })}
        {extraBoards > 0 ? (
          !showAllBoards ? (
            <button
              onClick={() => setShowAllBoards(true)}
              className={`cursor-pointer  flex-grow flex items-center justify-center ${boards[2].gradient} hover:shadow-[0_3px_10px_rgb(151,164,178,0.4)] hover:scale-[1.02] transition-all ease-in-out rounded-md w-[200px] h-[100px]`}
            >
              <PlusIcon className="w-6 text-white" />

              <span className="text-base font-medium text-white">
                {extraBoards} {extraBoards > 1 ? "more boards" : "more board"}
              </span>
            </button>
          ) : (
            ""
          )
        ) : boards.length >= 3 ? (
          <div
            onClick={boardDetailHandler}
            className={`cursor-pointer  flex-grow flex items-center justify-center ${boards[2].gradient} hover:shadow-[0_3px_10px_rgb(151,164,178,0.4)] hover:scale-[1.02] transition-all ease-in-out rounded-md w-[200px] h-[100px]`}
          >
            <span className="text-base font-medium text-white">
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
