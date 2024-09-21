import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const LeaveWorkspace = (props) => {
  const leaveWorkspaceHandler = () => {
    //API call according to the status of the user

    props.onClose();
  };

  return (
    <Dialog {...props} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 max-sm:p-2">
        <DialogPanel className="max-w-lg space-y-4 rounded-2xl bg-white p-7 max-sm:w-[calc(100vw_-_40px)]">
          <DialogTitle className="text-xl font-semibold max-sm:text-base">
            Leave Workspace
          </DialogTitle>
          {props?.user?.status === "owner" ? (
            <>
              <p className="text-[15px] tracking-[0.8px] max-sm:text-sm">
                You are the owner of this workspace, leaving it will permanently
                delete this workspace.
              </p>
              <div className="flex items-center justify-end gap-[10px]">
                <button
                  onClick={leaveWorkspaceHandler}
                  className="rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-white transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-[#001845] hover:bg-transparent hover:px-5 hover:py-2 hover:font-medium hover:text-[#001845] hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
                >
                  Leave anyway
                </button>
                <button
                  className="rounded-[10px] border border-[#001845] bg-transparent px-5 py-2 font-medium text-[#001845] transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-transparent hover:bg-[#001845] hover:px-5 hover:py-2 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
                  onClick={props.onClose}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-[15px] tracking-[0.8px] max-sm:text-sm">
                You will no longer be able to access any boards in this
                workspace.
              </p>
              <div className="flex items-center justify-end gap-[10px]">
                <button
                  onClick={leaveWorkspaceHandler}
                  className="rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-white transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-[#001845] hover:bg-transparent hover:px-5 hover:py-2 hover:font-medium hover:text-[#001845] hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
                >
                  Leave workspace
                </button>
                <button
                  className="rounded-[10px] border border-[#001845] bg-transparent px-5 py-2 font-medium text-[#001845] transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-transparent hover:bg-[#001845] hover:px-5 hover:py-2 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
                  onClick={props.onClose}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default LeaveWorkspace;
