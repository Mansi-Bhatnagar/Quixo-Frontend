import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import link from "../../Assets/Images/link.svg";
import { createWorkspace } from "../../Services/Workspace";
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
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="bg-white p-7 rounded-2xl max-w-[506px]">
          <DialogTitle className="text-[#001845] mb-4">
            {initialScreen ? "Let's Build A Workspace" : "Invite Your Team"}
          </DialogTitle>
          <div className="[&_h5]:text-xl [&_h5]:font-semibold [&_h5]:text-[#001845] ">
            {initialScreen ? (
              <>
                <h5>
                  Enhance productivity by centralizing board access for
                  everyone.
                </h5>
                <form>
                  <div className="flex items-start justify-evenly flex-col my-5 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233]">
                    <label htmlFor="workspace-name">Workspace Name</label>
                    <input
                      type="text"
                      id="workspace-name"
                      placeholder="This is the name of your company, team or organization."
                      onChange={wsNameHandler}
                      value={workspaceName}
                      className="w-[450px] p-[10px] border border-[#001233] rounded-lg focus:outline focus:outline-[#001233] focus:outline-1 placeholder:text-[15px] "
                    />
                  </div>
                  <div className="flex items-start justify-evenly flex-col my-5 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233]">
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
                    className="float-right m-[10px] bg-[#001845] py-2 px-5 text-white rounded-[10px] border-[2px] border-transparent text-[15px] outline-none transition-all ease-in-out duration-500 hover:bg-white hover:border-[#001845] hover:text-[#001845] hover:font-medium hover:scale-90 disabled:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:transition-none disabled:bg-[#001845] disabled:text-white"
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
                <div className="flex items-start justify-evenly flex-col my-5 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233]">
                  <div className="flex items-center justify-between w-[450px] mb-[5px]">
                    <label>Workspace Members</label>
                    <div
                      className="flex items-center justify-between"
                      onClick={inviteWithLinkHandler}
                    >
                      <img className="w-5 mr-[5px]" src={link} alt="link" />
                      <span className="text-[#0466c8] text-[15px] cursor-pointer hover:underline">
                        Invite with link
                      </span>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Separate emails with , eg. a@gmail.com, b@gmail.com"
                    onChange={wsEmailsHandler}
                    value={emails}
                    className="w-[450px] p-[10px] border border-[#001233] rounded-lg focus:outline focus:outline-[#001233] focus:outline-1 placeholder:text-[15px]"
                  />
                </div>
                <div className="flex items-center justify-center gap-32">
                  <h6
                    className="text-[15px] text-[#0466c8] cursor-pointer underline hover:no-underline"
                    onClick={closeModalHandler}
                  >
                    I'll do this later
                  </h6>
                  <button
                    className="float-left m-[10px] bg-[#001845] py-2 px-5 text-white rounded-[10px] border-[2px] border-transparent text-[15px] outline-none transition-all ease-in-out duration-500 hover:bg-white hover:border-[#001845] hover:text-[#001845] hover:font-medium hover:scale-90 disabled:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#001845] disabled:text-white"
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
