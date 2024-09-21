import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const RemoveUser = (props) => {
  const removeUserHandler = () => {
    //API
    props.onClose();
  };

  return (
    <Dialog {...props} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 max-sm:py-2">
        <DialogPanel className="max-w-lg space-y-4 rounded-2xl bg-white p-7 max-sm:w-[calc(100vw_-_40px)]">
          <DialogTitle className="text-xl font-semibold max-sm:text-base">
            Remove User
          </DialogTitle>

          <p className="text-[15px] tracking-[0.8px] max-sm:text-sm">
            This user will be removed from the entire workspace.
          </p>
          <div className="flex items-center justify-end gap-[10px]">
            <button
              onClick={removeUserHandler}
              className="rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-white transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-[#001845] hover:bg-transparent hover:px-5 hover:py-2 hover:font-medium hover:text-[#001845] hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm max-sm:hover:py-1"
            >
              Remove
            </button>
            <button
              className="rounded-[10px] border border-[#001845] bg-transparent px-5 py-2 font-medium text-[#001845] transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-transparent hover:bg-[#001845] hover:px-5 hover:py-2 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm max-sm:hover:py-1"
              onClick={props.onClose}
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default RemoveUser;
