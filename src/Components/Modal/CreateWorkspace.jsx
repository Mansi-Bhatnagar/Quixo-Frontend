import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import link from "../../Assets/Images/link.svg";
import { addWorkspaceMember, createWorkspace } from "../../Services/Workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const CreateWorkspace = ({
  open,
  setShowCreateWorkspaceModal,
  showInitialScreen,
}) => {
  const queryClient = useQueryClient();
  const jwt = useSelector((state) => state.authentication.jwt);

  //States
  const [initialScreen, setInitialScreen] = useState(showInitialScreen);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [emails, setEmails] = useState("");
  const [inviteDisabled, setInviteDisabled] = useState(true);

  //Handlers

  const wsNameHandler = (e) => {
    setWorkspaceName(e.target.value);
  };

  const wsDescriptionHandler = (e) => {
    setWorkspaceDescription(e.target.value);
  };

  const continueCreationHandler = () => {
    setInitialScreen(false);
    createWorkspaceMutation.mutate();
  };

  const wsEmailsHandler = (e) => {
    setEmails(e.target.value);
  };

  const inviteHandler = () => {
    //API call for add workspace members
    console.log("Emails=", emails.split(", "));
    closeModalHandler();
  };

  const inviteWithLinkHandler = () => {
    //API for invite link
    closeModalHandler();
  };

  const closeModalHandler = () => {
    setShowCreateWorkspaceModal(false);
    setInitialScreen(true);
    setWorkspaceName("");
    setWorkspaceDescription("");
    setEmails("");
  };

  // APIs
  const createWorkspaceMutation = useMutation({
    mutationFn: () => createWorkspace(workspaceName, workspaceDescription, jwt),
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["all-workspaces"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // const addMemberMutation=useMutation({
  //   mutationFn:()=>addWorkspaceMember(emails, jwt)
  // })

  //Effects
  useEffect(() => {
    if (workspaceName) {
      setContinueDisabled(false);
    } else {
      setContinueDisabled(true);
    }
  }, [workspaceName]);

  useEffect(() => {
    if (emails) {
      setInviteDisabled(false);
    } else {
      setInviteDisabled(true);
    }
  }, [emails]);

  useEffect(() => {
    console.log(showInitialScreen);
  }, [showInitialScreen]);

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 max-sm:p-2">
        <DialogPanel className="max-w-[506px] rounded-2xl bg-white p-7 max-sm:w-[calc(100vw_-_40px)]">
          <DialogTitle className="mb-4 text-[#001845] max-sm:text-sm">
            {initialScreen ? "Let's Build A Workspace" : "Invite Your Team"}
          </DialogTitle>
          <div className="[&_h5]:text-xl [&_h5]:font-semibold [&_h5]:text-[#001845] max-sm:[&_h5]:text-base">
            {initialScreen ? (
              <>
                <h5>
                  Enhance productivity by centralizing board access for
                  everyone.
                </h5>
                <form>
                  <div className="my-5 flex flex-col items-start justify-evenly [&_label]:mb-1 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233] max-sm:[&_label]:text-sm">
                    <label htmlFor="workspace-name">
                      Workspace Name <span className="text-[#d00000]">*</span>
                    </label>
                    <input
                      type="text"
                      id="workspace-name"
                      placeholder="This is the name of your company, team or organization."
                      onChange={wsNameHandler}
                      value={workspaceName}
                      className="w-[450px] rounded-lg border border-[#001233] p-[10px] placeholder:text-[15px] focus:outline focus:outline-1 focus:outline-[#001233] max-sm:w-full max-sm:text-xs max-sm:placeholder:text-xs"
                    />
                  </div>
                  <div className="my-5 flex flex-col items-start justify-evenly [&_label]:mb-1 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233] max-sm:[&_label]:text-sm">
                    <label htmlFor="workspace-description">
                      Workspace Description{" "}
                      <span className="text-xs">(optional)</span>
                    </label>
                    <textarea
                      id="workspace-description"
                      placeholder="Get your members on board with a few words about your Workspace."
                      rows={5}
                      onChange={wsDescriptionHandler}
                      value={workspaceDescription}
                      className="w-[450px] resize-none rounded-lg border border-[#001233] p-[10px] placeholder:text-[15px] focus:outline focus:outline-1 focus:outline-[#001233] max-sm:w-full max-sm:text-xs max-sm:placeholder:text-xs"
                    />
                  </div>
                  <button
                    className="float-right m-[10px] rounded-[10px] border-2 border-[#001845] bg-white px-5 py-2 text-[15px] font-medium text-[#001845] outline-none transition-all duration-500 ease-in-out hover:scale-90 hover:border-transparent hover:bg-[#001845] hover:text-white max-sm:py-1 max-sm:text-sm"
                    onClick={closeModalHandler}
                  >
                    Cancel
                  </button>
                  <button
                    className="float-right m-[10px] rounded-[10px] border-[2px] border-transparent bg-[#001845] px-5 py-2 text-[15px] text-white outline-none transition-all duration-500 ease-in-out hover:scale-90 hover:border-[#001845] hover:bg-white hover:font-medium hover:text-[#001845] disabled:scale-100 disabled:cursor-not-allowed disabled:bg-[#001845] disabled:text-white disabled:opacity-40 disabled:transition-none max-sm:py-1 max-sm:text-sm"
                    onClick={continueCreationHandler}
                    disabled={continueDisabled}
                  >
                    Continue
                  </button>
                </form>
              </>
            ) : (
              <>
                <h5>
                  Invite workspace members using a link or by entering email.
                </h5>
                <div className="my-5 flex flex-col items-start justify-evenly [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233] max-sm:[&_label]:text-sm">
                  <div className="mb-[5px] flex w-[450px] items-center justify-between max-sm:w-full">
                    <label>Workspace Members</label>
                    <div
                      className="flex items-center justify-between"
                      onClick={inviteWithLinkHandler}
                    >
                      <img
                        className="mr-[5px] w-5 max-sm:mr-0 max-sm:w-4"
                        src={link}
                        alt="link"
                      />
                      <span className="cursor-pointer text-[15px] text-[#0466c8] hover:underline max-sm:text-sm">
                        Invite with link
                      </span>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Separate emails with , eg. a@gmail.com, b@gmail.com"
                    onChange={wsEmailsHandler}
                    value={emails}
                    className="w-[450px] rounded-lg border border-[#001233] p-[10px] placeholder:text-[15px] focus:outline focus:outline-1 focus:outline-[#001233] max-sm:w-full max-sm:text-xs max-sm:placeholder:text-xs"
                  />
                </div>
                <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:items-start max-sm:gap-y-2">
                  <h6
                    className="cursor-pointer text-[15px] text-[#0466c8] underline hover:no-underline max-sm:text-sm"
                    onClick={closeModalHandler}
                  >
                    I'll do this later
                  </h6>
                  <button
                    className="float-left rounded-[10px] border-[2px] border-transparent bg-[#001845] px-5 py-2 text-[15px] text-white outline-none transition-all duration-500 ease-in-out hover:scale-90 hover:border-[#001845] hover:bg-white hover:font-medium hover:text-[#001845] disabled:scale-100 disabled:cursor-not-allowed disabled:bg-[#001845] disabled:text-white disabled:opacity-40 max-sm:py-1 max-sm:text-sm"
                    disabled={inviteDisabled}
                    onClick={inviteHandler}
                  >
                    Invite to Workspace
                  </button>
                </div>
              </>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateWorkspace;
