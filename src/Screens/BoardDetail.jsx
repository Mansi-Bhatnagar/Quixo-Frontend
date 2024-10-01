import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBoardDetails } from "../Services/Board";
import { useSelector } from "react-redux";

const BoardDetail = () => {
  const { boardId } = useParams();
  const jwt = useSelector((state) => state.authentication.jwt);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gradient, setGradient] = useState("");

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
      <div className={`relative h-[calc(100vh_-_53px)] w-screen ${gradient}`}>
        <div className="absolute top-0 w-full bg-[#0000003d] px-[3%] py-2">
          <h4 className="text-xl font-medium text-white">{name}</h4>
        </div>
        <div className="h-[calc(100vh_-_53px)] w-screen" />
      </div>
    </>
  );
};

export default BoardDetail;
