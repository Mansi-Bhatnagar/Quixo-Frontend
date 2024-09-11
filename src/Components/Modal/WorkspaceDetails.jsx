import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

const WorkspaceDetails = ({
  open,
  setShowEditWorkspaceDetailsModal,
  name,
  description,
}) => {
  //States
  const [workspaceName, setWorkspaceName] = useState(name);
  const [workspaceDescription, setWorkspaceDescription] = useState(description);

  //Handlers
  const wsNameHandler = (e) => {
    setWorkspaceName(e.target.value);
  };

  const wsDescriptionHandler = (e) => {
    setWorkspaceDescription(e.target.value);
  };

  const closeModalHandler = () => {
    setShowEditWorkspaceDetailsModal(false);
    setWorkspaceName("");
    setWorkspaceDescription("");
  };

  const saveChangesHandler = () => {
    //API call
    setShowEditWorkspaceDetailsModal(false);
  };

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="bg-white p-7 rounded-2xl max-w-[506px]">
          <DialogTitle className="text-[#001845] mb-4 text-xl font-semibold">
            Edit Workspace Details
          </DialogTitle>

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
              onClick={saveChangesHandler}
              className="float-right m-[10px] bg-[#001845] py-2 px-5 text-white rounded-[10px] border-[2px] border-transparent text-[15px] outline-none transition-all ease-in-out duration-500 hover:bg-white hover:border-[#001845] hover:text-[#001845] hover:font-medium hover:scale-90 disabled:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:transition-none disabled:bg-[#001845] disabled:text-white"
            >
              Save
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default WorkspaceDetails;
