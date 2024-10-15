import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

const AddCard = ({ onAddCard, listId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const addCardHandler = (e) => {
    if (e.type === "submit" || (e.key === "Enter" && !e.shiftKey)) {
      if (title.trim() === "") {
        setIsAdding(false);
        setTitle("");
        return;
      }
      e.preventDefault();
      onAddCard(listId, title.trim());
      setTitle("");
      setIsAdding(false);
    }
  };

  const cancelHandler = () => {
    setIsAdding(false);
    setTitle("");
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="flex w-full items-center gap-1 rounded-md p-2 text-sm text-[#97A4B2] transition-colors duration-200 hover:bg-white/20"
      >
        <PlusIcon className="h-5 w-5" />
        <span>Add a card</span>
      </button>
    );
  }

  return (
    <form onSubmit={addCardHandler} className="rounded-md p-2 shadow-sm">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={addCardHandler}
        placeholder="Enter a title for this card..."
        className="w-full resize-none rounded-md border border-[#97a4b2] bg-transparent p-2 text-sm text-white placeholder:text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-[#97a4b2]"
        rows={3}
      />
      <div className="mt-2 flex justify-start gap-2">
        <button
          type="submit"
          className="rounded-[10px] border border-transparent bg-[#33415c] px-5 py-2 text-sm text-white hover:border-white"
        >
          Add Card
        </button>
        <button
          type="button"
          onClick={cancelHandler}
          className="flex items-center rounded-[10px] border border-transparent bg-white/20 px-3 py-2 text-[#97a4b2] transition-colors duration-200 hover:border-white"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default AddCard;
