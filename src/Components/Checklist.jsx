import React, { useState } from "react";
import { Checkbox } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Checklist(props) {
  //States

  const [items, setItems] = useState([{ id: 1, text: "", completed: false }]);
  const [nextId, setNextId] = useState(2);

  //Handlers

  const addItemHandler = () => {
    const newId = nextId;
    setItems([...items, { id: newId, text: "", completed: false }]);
    setNextId(newId + 1);

    setTimeout(() => {
      const newInput = document.querySelector(`input[data-id="${newId}"]`);
      if (newInput) newInput.focus();
    }, 0);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (id === items[items.length - 1].id) {
        addItemHandler();
      } else {
        const nextInput = document.querySelector(`input[data-id="${id + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const updateItem = (id, text) => {
    setItems(items.map((item) => (item.id === id ? { ...item, text } : item)));
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id) => {
    if (items.length === 1) {
      //API call for deleting checklist
      props.onClose();
      return;
    }
    setItems(items.filter((item) => item.id !== id));
  };

  const saveChecklistHandler = () => {
    console.log("Saving checklist:", items);
  };

  const cancelChangesHandler = () => {
    setItems([{ id: 1, text: "", completed: false }]);
    props.onClose();
  };

  return (
    <div className="mt-12">
      <ul className="my-4 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center space-x-2">
            <Checkbox
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              className={({ checked }) =>
                `${
                  checked ? "bg-[#001845]" : "bg-white"
                } cursor-pointer relative inline-flex h-5 w-5 items-center justify-center border border-[#97a4b2] rounded focus:outline-none`
              }
            >
              <span className="sr-only">Complete item</span>
              {item.completed && (
                <svg
                  className="h-3 w-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </Checkbox>
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateItem(item.id, e.target.value)}
              className={`flex-grow px-3 focus:border-black py-2 border rounded-md focus:outline-none ${
                item.completed ? "line-through text-[#97a4b2]" : ""
              }`}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              data-id={item.id}
              placeholder="Enter item text"
            />
            <button
              onClick={() => removeItem(item.id)}
              className="rounded-md text-gray-500 hover:text-[#d00000] focus:outline-none focus:ring-2 focus:ring-[#d00000]"
              aria-label="Remove item"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={addItemHandler}
        className="mb-12 w-full rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-white transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-[#001845] hover:bg-transparent hover:px-5 hover:py-2 hover:font-medium hover:text-[#001845] hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
      >
        Add Item
      </button>
      <div className="flex items-center justify-end gap-[10px]">
        <button
          className="rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-white transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-[#001845] hover:bg-transparent hover:px-5 hover:py-2 hover:font-medium hover:text-[#001845] hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
          onClick={saveChecklistHandler}
        >
          Save
        </button>
        <button
          className="rounded-[10px] border border-[#001845] bg-transparent px-5 py-2 font-medium text-[#001845] transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-transparent hover:bg-[#001845] hover:px-5 hover:py-2 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
          onClick={cancelChangesHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
