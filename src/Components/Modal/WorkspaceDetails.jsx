import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editWorkspaceDetails } from "../../Services/Workspace";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const WorkspaceDetails = ({
  open,
  setShowEditWorkspaceDetailsModal,
  name,
  description,
}) => {
  const { id } = useParams();
  const jwt = useSelector((state) => state.authentication.jwt);
  const queryClient = useQueryClient();

  //States
  const [workspaceName, setWorkspaceName] = useState(name);
  const [workspaceDescription, setWorkspaceDescription] = useState(description);
  const [saveDisabled, setSaveDisabled] = useState(false);

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

  const saveChangesHandler = (e) => {
    //API call
    e.preventDefault();
    editWorkspaceDetailsMutation.mutate();
  };

  //API
  const editWorkspaceDetailsMutation = useMutation({
    mutationFn: () =>
      editWorkspaceDetails(id, workspaceName, workspaceDescription, jwt),
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["all-workspaces"] });
      setShowEditWorkspaceDetailsModal(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //Effects
  useEffect(() => {
    if (workspaceName) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [workspaceName]);

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 max-sm:p-2">
        <DialogPanel className="max-w-[506px] rounded-2xl bg-white p-7 max-sm:w-[calc(100vw_-_40px)]">
          <DialogTitle className="mb-4 text-xl font-semibold text-[#001845] max-sm:text-base">
            Edit Workspace Details
          </DialogTitle>

          <form>
            <div className="my-5 flex flex-col items-start justify-evenly max-sm:text-sm [&_label]:mb-1 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233]">
              <label htmlFor="workspace-name">Workspace Name</label>
              <input
                type="text"
                id="workspace-name"
                placeholder="This is the name of your company, team or organization."
                onChange={wsNameHandler}
                value={workspaceName}
                className="w-[450px] rounded-lg border border-[#001233] p-[10px] placeholder:text-[15px] focus:outline focus:outline-1 focus:outline-[#001233] max-sm:w-full max-sm:text-xs max-sm:placeholder:text-xs"
              />
            </div>
            <div className="my-5 flex flex-col items-start justify-evenly max-sm:text-sm [&_label]:mb-1 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#001233]">
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
                className="no-scrollbar w-[450px] resize-none rounded-lg border border-[#001233] p-[10px] placeholder:text-[15px] focus:outline focus:outline-1 focus:outline-[#001233] max-sm:w-full max-sm:text-xs max-sm:placeholder:text-xs"
              />
            </div>
            <button
              className="float-right m-[10px] rounded-[10px] border-2 border-[#001845] bg-white px-5 py-2 text-[15px] font-medium text-[#001845] outline-none transition-all duration-500 ease-in-out hover:scale-90 hover:border-transparent hover:bg-[#001845] hover:text-white max-sm:py-1 max-sm:text-sm"
              onClick={closeModalHandler}
            >
              Cancel
            </button>
            <button
              onClick={saveChangesHandler}
              disabled={saveDisabled}
              className="float-right m-[10px] rounded-[10px] border-2 border-transparent bg-[#001845] px-5 py-2 text-[15px] text-white outline-none transition-all duration-500 ease-in-out hover:scale-90 hover:border-[#001845] hover:bg-white hover:font-medium hover:text-[#001845] disabled:scale-100 disabled:cursor-not-allowed disabled:bg-[#001845] disabled:text-white disabled:opacity-40 disabled:transition-none max-sm:py-1 max-sm:text-sm"
            >
              {editWorkspaceDetailsMutation.isPending ? "Saving" : "Save"}
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default WorkspaceDetails;
