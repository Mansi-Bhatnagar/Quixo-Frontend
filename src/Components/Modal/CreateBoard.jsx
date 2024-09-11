import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";

const CreateBoard = ({ open, setShowCreateBoardModal }) => {
  const backgrounds = [
    { color: "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500", id: 0 },
    {
      color: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      id: 1,
    },
    {
      color: "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500",
      id: 2,
    },
    { color: "bg-gradient-to-r from-rose-500 via-pink-500 to-red-500", id: 3 },
    {
      color: "bg-gradient-to-r from-gray-300 via-yellow-500 to-amber-400",
      id: 4,
    },
    {
      color: "bg-gradient-to-r from-cyan-700 via-blue-500 to-indigo-600",
      id: 5,
    },
    {
      color: "bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500",
      id: 6,
    },
    { color: "bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700", id: 7 },
    {
      color: "bg-gradient-to-r from-pink-200 via-purple-400 to-indigo-600",
      id: 8,
    },
    { color: "bg-gradient-to-r from-red-200 via-rose-400 to-pink-600", id: 9 },
    {
      color: "bg-gradient-to-r from-amber-200 via-orange-400 to-red-600",
      id: 10,
    },
    {
      color: "bg-gradient-to-r from-yellow-200 via-lime-400 to-green-600",
      id: 11,
    },
    { color: "bg-gradient-to-r from-red-200 via-pink-400 to-rose-600", id: 12 },
    {
      color: "bg-gradient-to-r from-orange-600 via-amber-900 to-amber-950",
      id: 13,
    },
    {
      color: "bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900",
      id: 14,
    },
    {
      color: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500",
      id: 15,
    },
  ];

  //States
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [endIndex, setEndIndex] = useState(6);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [activeBackground, setActiveBackground] = useState(0);

  //Handlers
  const boardNameHandler = (e) => {
    setBoardName(e.target.value);
  };

  const boardDescriptionHandler = (e) => {
    setBoardDescription(e.target.value);
  };

  const closeModalHandler = () => {
    setShowCreateBoardModal(false);
    setBoardName("");
    setBoardDescription("");
  };

  const createBoardHandler = () => {
    //API call
    setShowCreateBoardModal(false);
  };

  const backgroundHandler = (background) => {
    setActiveBackground(background);
  };

  //Effects
  useEffect(() => {
    if (boardName) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [boardName]);

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="bg-white p-7 rounded-2xl max-w-[506px]">
          <DialogTitle className="text-[#001845] mb-4 text-xl font-semibold">
            Add new board
          </DialogTitle>

          <form>
            <div className="flex items-start justify-evenly flex-col my-5 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233]">
              <label htmlFor="board-background">Choose Background</label>
              <div className="flex flex-wrap mb-5 items-end gap-2">
                {backgrounds.slice(0, endIndex).map((background, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        border:
                          activeBackground.id === index
                            ? "2px solid black"
                            : "",
                      }}
                      onClick={() => backgroundHandler(background)}
                      className={`${background.color} w-8 cursor-pointer h-8 rounded-md`}
                    />
                  );
                })}
                <button
                  type="button"
                  onClick={() =>
                    setEndIndex((prev) => (prev === 6 ? backgrounds.length : 6))
                  }
                  className="text-sm font-medium text-[#001845]"
                >
                  {endIndex === 6 ? "View more" : "View less"}
                </button>
              </div>
              <label htmlFor="board-name">
                Board Title <span className="text-[#d00000]">*</span>
              </label>
              <input
                type="text"
                id="board-name"
                placeholder="e.g., Marketing Plan"
                onChange={boardNameHandler}
                value={boardName}
                className="w-[450px] p-[10px] border border-[#001233] rounded-lg focus:outline focus:outline-[#001233] focus:outline-1 placeholder:text-[15px] "
              />
            </div>
            <div className="flex items-start justify-evenly flex-col my-5 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233]">
              <label htmlFor="board-description">
                Board Description <span className="text-xs">(optional)</span>
              </label>
              <textarea
                id="board-description"
                placeholder="e.g., Tasks for the upcoming marketing campaign"
                rows={2}
                onChange={boardDescriptionHandler}
                value={boardDescription}
                className="w-[450px] resize-none p-[10px] border border-[#001233] rounded-lg focus:outline focus:outline-[#001233] focus:outline-1 placeholder:text-[15px]"
              />
            </div>
            <button
              className="float-right m-[10px] bg-white border-2 border-[#001845] text-[#001845] font-medium py-2 px-5 text-[15px] outline-none rounded-[10px] transition-all duration-500 ease-in-out hover:bg-[#001845] hover:text-white hover:border-transparent hover:scale-90"
              onClick={closeModalHandler}
            >
              Cancel
            </button>
            <button
              onClick={createBoardHandler}
              disabled={saveDisabled}
              className="float-right m-[10px] bg-[#001845] py-2 px-5 text-white rounded-[10px] border-[2px] border-transparent text-[15px] outline-none transition-all ease-in-out duration-500 hover:bg-white hover:border-[#001845] hover:text-[#001845] hover:font-medium hover:scale-90 disabled:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:transition-none disabled:bg-[#001845] disabled:text-white"
            >
              Add
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateBoard;
