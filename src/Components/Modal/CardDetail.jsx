import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  InformationCircleIcon,
  CheckBadgeIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import {
  deleteCard,
  editCardDescription,
  editCardTitle,
} from "../../Services/Board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Checklist from "../Checklist";

const CardDetail = (props) => {
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const queryClient = useQueryClient();

  const tabs = [
    { name: "Details", icon: InformationCircleIcon },
    { name: "Checklist", icon: CheckBadgeIcon },
    { name: "Delete", icon: TrashIcon },
  ];

  //States
  const [title, setTitle] = useState(props.card.title);
  const [description, setDescription] = useState(props.card.description);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isAddingDescription, setIsAddingDescription] = useState(false);

  //Handlers

  //Card title
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const saveTitleHandler = () => {
    editCardTitleMutation.mutate();
    setIsEditingTitle(false);
  };

  const cancelTitleHandler = () => {
    setIsEditingTitle(false);
    setTitle(props.card.title);
  };

  const editTitleHandler = () => {
    setIsEditingTitle(true);
    setTimeout(() => {
      titleInputRef?.current?.select();
    }, 0);
  };

  //Card description
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const editDescriptionHandler = () => {
    setIsEditingDescription(true);
    setTimeout(() => {
      descriptionInputRef?.current?.select();
    }, 0);
  };

  const addDescriptionHandler = () => {
    setIsAddingDescription(true);
    setTimeout(() => {
      descriptionInputRef?.current?.select();
    }, 0);
  };

  const saveDescriptionHandler = () => {
    editCardDescriptionMutation.mutate();
    setIsAddingDescription(false);
    setIsEditingDescription(false);
  };

  const cancelDescriptionHandler = () => {
    setDescription(props.card.description);
    setIsAddingDescription(false);
    setIsEditingDescription(false);
  };

  const deleteCardHandler = () => {
    deleteCardMutation.mutate();
    props.onClose();
  };

  //APIs
  const editCardTitleMutation = useMutation({
    mutationFn: () => editCardTitle(props.card.id, title, props.jwt),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards", props.card.list_id],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update title");
    },
  });

  const editCardDescriptionMutation = useMutation({
    mutationFn: () =>
      editCardDescription(props.card.id, description, props.jwt),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards", props.card.list_id],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update description");
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: () => deleteCard(props.card.id, props.jwt),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards", props.card.list_id],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete card");
    },
  });

  //Effects
  useEffect(() => {
    setTitle(props.card.title);
    setDescription(props.card.description);
  }, [props.card]);

  return (
    <Dialog open={props.open} onClose={props.onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 max-sm:p-2">
        <DialogPanel className="w-[600px] space-y-4 rounded-2xl bg-white p-7 transition-all duration-300 ease-in-out max-md:w-[500px] max-sm:w-[calc(100vw_-_40px)] max-sm:p-4">
          <TabGroup>
            <TabList className="flex items-center justify-center gap-3 max-md:gap-0">
              {tabs.map((tab, index) => (
                <Tab
                  className={({ selected }) =>
                    `rounded-full px-5 max-md:px-3 py-2 max-sm:text-sm text-base flex items-center ${
                      selected
                        ? "bg-[#001845] text-white"
                        : "data-[hover]:bg-[#001845] data-[hover]:text-white data-[hover]:opacity-50"
                    }`
                  }
                  key={index}
                >
                  <tab.icon className="mr-1 h-5 w-5 max-sm:hidden" />
                  {tab.name}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="ml-2 mt-5">
              <TabPanel>
                <div className="flex flex-col gap-0">
                  <div className="flex items-center gap-1">
                    <label
                      htmlFor="card-title"
                      className="text-base font-medium text-[#001233] max-sm:text-sm"
                    >
                      Title
                    </label>
                    <PencilSquareIcon
                      title="Edit Title"
                      className="h-5 w-5 cursor-pointer"
                      onClick={editTitleHandler}
                    />
                  </div>
                  <input
                    id="card-title"
                    type="text"
                    className={`rounded-lg bg-transparent text-base text-[#001233] ${
                      isEditingTitle ? "border border-[#001233] p-2" : ""
                    } max-sm:text-sm`}
                    onChange={titleHandler}
                    value={title}
                    disabled={!isEditingTitle}
                    ref={titleInputRef}
                  />
                  {isEditingTitle && (
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={saveTitleHandler}
                        className="rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-sm text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelTitleHandler}
                        className="rounded-[10px] border-2 border-[#001845] px-5 py-2 text-sm font-medium text-[#001845]"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-1">
                    <label
                      htmlFor="card-description"
                      className="text-base font-medium text-[#001233] max-sm:text-sm"
                    >
                      Description
                    </label>
                    {!isAddingDescription && description ? (
                      <PencilSquareIcon
                        title="Edit Description"
                        className="h-5 w-5 cursor-pointer"
                        onClick={editDescriptionHandler}
                      />
                    ) : (
                      <PlusIcon
                        title="Add Description"
                        className="h-5 w-5 cursor-pointer"
                        onClick={addDescriptionHandler}
                      />
                    )}
                  </div>
                  {(description || isAddingDescription) && (
                    <textarea
                      id="card-description"
                      value={description}
                      ref={descriptionInputRef}
                      onChange={descriptionHandler}
                      rows={3}
                      disabled={!isEditingDescription && !isAddingDescription}
                      placeholder="Add a more detailed description..."
                      className={`resize-none rounded-lg bg-transparent text-base max-sm:text-sm max-sm:placeholder:text-sm text-[#001233] ${
                        isEditingDescription || isAddingDescription
                          ? "border border-[#001233] p-2"
                          : ""
                      } max-sm:text-sm placeholder:text-base placeholder:text-[#001233]`}
                    ></textarea>
                  )}
                  {(isAddingDescription || isEditingDescription) && (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={saveDescriptionHandler}
                        className="rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-sm text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelDescriptionHandler}
                        className="rounded-[10px] border-2 border-[#001845] px-5 py-2 text-sm font-medium text-[#001845]"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <Checklist onClose={props.onClose} />
              </TabPanel>
              <TabPanel></TabPanel>
              <TabPanel>
                <p className="text-[15px] tracking-[0.8px] max-sm:text-sm">
                  Are you sure you want to delete this card? All content will be
                  deleted and members of this card will be removed.
                </p>
                <div className="mt-5 flex items-center justify-end gap-[10px]">
                  <button
                    className="rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-white transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-[#001845] hover:bg-transparent hover:px-5 hover:py-2 hover:font-medium hover:text-[#001845] hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
                    onClick={deleteCardHandler}
                  >
                    Delete
                  </button>
                  <button
                    className="rounded-[10px] border border-[#001845] bg-transparent px-5 py-2 font-medium text-[#001845] transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-transparent hover:bg-[#001845] hover:px-5 hover:py-2 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
                    onClick={props.onClose}
                  >
                    Cancel
                  </button>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CardDetail;
