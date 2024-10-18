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
  TagIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { editCardDescription, editCardTitle } from "../../Services/Board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CardDetail = (props) => {
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const queryClient = useQueryClient();

  const tabs = [
    { name: "Details", icon: InformationCircleIcon },
    { name: "Labels", icon: TagIcon },
    { name: "Checklist", icon: CheckBadgeIcon },
    { name: "Members", icon: UserGroupIcon },
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

  useEffect(() => {
    setTitle(props.card.title);
    setDescription(props.card.description);
  }, [props.card]);

  // useEffect(() => {
  //   if (descriptionInputRef.current) {
  //     descriptionInputRef.current.style.height = "auto";
  //     descriptionInputRef.current.style.height = `${descriptionInputRef.current.scrollHeight}px`;
  //   }
  // }, [description, props.card.description]);

  return (
    <Dialog open={props.open} onClose={props.onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 max-sm:p-2">
        <DialogPanel className="max-w-fit space-y-4 rounded-2xl bg-white p-7 transition-all duration-300 ease-in-out max-sm:w-[calc(100vw_-_40px)]">
          <TabGroup>
            <TabList className="flex items-center justify-start gap-3">
              {tabs.map((tab, index) => (
                <Tab
                  className={({ selected }) =>
                    `rounded-full px-5 py-2 text-base flex items-center ${
                      selected
                        ? "bg-[#001845] text-white"
                        : "data-[hover]:bg-[#001845] data-[hover]:text-white data-[hover]:opacity-50"
                    }`
                  }
                  key={index}
                >
                  <tab.icon className="mr-1 h-5 w-5" />
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
                      className={`resize-none rounded-lg bg-transparent text-base text-[#001233] ${
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
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
              <TabPanel>Content 4</TabPanel>
              <TabPanel>Content 5</TabPanel>
            </TabPanels>
          </TabGroup>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CardDetail;
