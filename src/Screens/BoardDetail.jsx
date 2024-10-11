import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBoardDetails } from "../Services/Board";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import BoardSidebar from "../Components/Sidebar/BoardSidebar";
import List from "../Components/List";

const BoardDetail = () => {
  const { state } = useLocation();
  const boardId = state?.id;
  const jwt = useSelector((state) => state.authentication.jwt);

  const [name, setName] = useState(state?.name);
  const [description, setDescription] = useState(state?.description);
  const [gradient, setGradient] = useState(state?.gradient);
  const [showSidebar, setShowSidebar] = useState(true);

  //APIs
  const {
    data: boardData,
    error: boardError,
    isLoading: boardLoading,
  } = useQuery({
    queryFn: () => getBoardDetails(boardId, jwt),
    queryKey: ["board-detail", jwt, boardId],
    enabled: jwt !== "",
  });

  //Effects
  useEffect(() => {
    if (!boardLoading && boardData) {
      setName(boardData?.data?.[0]?.name);
      setDescription(boardData?.data?.[0]?.description);
      setGradient(boardData?.data?.[0]?.gradient);
    } else if (boardError) {
      console.error(boardError);
    }
  }, [boardData, boardError, boardLoading]);

  return (
    <>
      <Navbar />
      <div
        className={`relative h-[calc(100vh_-_53px)] w-screen flex items-start ${gradient}`}
      >
        <BoardSidebar
          description={description}
          name={name}
          jwt={jwt}
          boardId={boardId}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div className="h-full flex-grow">
          <div className="bg-[#0000003d] px-[3%] py-2">
            <h4 className="text-xl font-medium text-white">{name}</h4>
          </div>
          <div
            className={`horizontal-scrollbar h-[calc(100%_-_44px)] ${
              showSidebar ? "max-w-[calc(100vw_-_320px)]" : "w-screen"
            } overflow-x-scroll`}
          >
            <List jwt={jwt} boardId={boardId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
