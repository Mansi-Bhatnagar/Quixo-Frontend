import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { editBoardDetails } from "../../Services/Board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DeleteBoard from "../Modal/DeleteBoard";

const BoardSidebar = (props) => {
  const descriptionRef = useRef(null);
  const nameInputRef = useRef(null);
  const queryClient = useQueryClient();

  //States
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);

  //Handlers
  const sidebarHandler = () => {
    props.setShowSidebar((prev) => !prev);
  };

  const changeDetailsHandler = () => {
    setIsEditing(true);
    setTimeout(() => {
      descriptionRef?.current?.select();
      nameInputRef?.current?.select();
    }, 0);
  };

  const saveHandler = () => {
    setIsEditing(false);
    editBoardDetailsMutation.mutate();
  };

  const deleteBoardHandler = () => {
    setShowDeleteBoardModal(true);
  };

  //APIs
  const editBoardDetailsMutation = useMutation({
    mutationFn: () =>
      editBoardDetails(+props.boardId, name, description, props.jwt),
    onSuccess: () => {
      toast.success("Board details updated successfully");
      queryClient.invalidateQueries({ queryKey: ["board-detail"] });
    },
    onError: (error) => {
      toast.error("Failed to update board details");
      console.error(error);
    },
  });

  //Effects
  useEffect(() => {
    setName(props.name);
    setDescription(props.description);
  }, [props.name, props.description]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [description, props.showSidebar]);

  return (
    <>
      <button
        onClick={sidebarHandler}
        title="Tooge menu"
        style={{ left: props.showSidebar ? "302px" : "0" }}
        className="absolute z-10 mt-1 rounded-full border border-transparent bg-[#33415c] hover:border-white"
      >
        {props.showSidebar ? (
          <ChevronDoubleLeftIcon className="h-8 w-8 text-white" />
        ) : (
          <ChevronDoubleRightIcon className="h-8 w-8 text-white" />
        )}
      </button>
      {props.showSidebar ? (
        <div className="relative left-0 top-0 h-full w-80 bg-[#1d2125] px-7 py-4 text-white [&_h3]:text-base">
          <div className="mb-2 flex items-center gap-1">
            <h3>About this board </h3>
            <InformationCircleIcon
              title="Description of board"
              className="w-5 hover:cursor-pointer"
            />
          </div>
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-min rounded-md bg-transparent text-white focus-visible:border focus-visible:border-[#97a4b2] focus-visible:outline-none"
            value={name}
            disabled={!isEditing}
            ref={nameInputRef}
          ></input>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            ref={descriptionRef}
            rows={1}
            disabled={!isEditing}
            className={`no-scrollbar w-full ${
              isEditing ? "" : "resize-none"
            } overflow-hidden rounded-md bg-transparent text-justify text-sm text-[#97a4b2] focus-visible:border focus-visible:border-[#97a4b2] focus-visible:outline-none`}
          ></textarea>

          {isEditing ? (
            <button
              onClick={saveHandler}
              className="mt-3 rounded-[10px] border border-transparent bg-[#33415c] px-5 py-2 text-sm hover:border-white"
            >
              Save
            </button>
          ) : (
            <button
              onClick={changeDetailsHandler}
              className="mt-3 rounded-[10px] border border-transparent bg-[#33415c] px-5 py-2 text-sm hover:border-white"
            >
              Change details
            </button>
          )}
          <div className="mt-4 h-[1px] bg-[#97a4b2]" />
          <button
            onClick={deleteBoardHandler}
            className="my-2 flex items-center gap-1 text-[#d00000]"
          >
            Delete board
            <TrashIcon className="w-5 text-[#d00000] hover:cursor-pointer" />
          </button>
          <DeleteBoard
            open={showDeleteBoardModal}
            onClose={() => setShowDeleteBoardModal(false)}
            boardId={props.boardId}
            jwt={props.jwt}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BoardSidebar;
