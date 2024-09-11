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
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 bg-white p-8 rounded-2xl">
          <DialogTitle className="font-semibold">Remove User</DialogTitle>

          <p className="text-[15px] tracking-[0.8px]">
            This user will be removed from the entire workspace.
          </p>
          <div className="flex items-center justify-end gap-[10px]">
            <button
              onClick={removeUserHandler}
              className="text-white rounded-[10px] bg-[#001845] hover:border py-[6px] px-5 border border-transparent transition-all ease-in-out duration-500 hover:bg-transparent hover:border-[#001845] hover:text-[#001845] hover:font-medium hover:rounded-[10px] hover:py-[6px] hover:px-5 hover:transition-all hover:ease-in-out hover:duration-500"
            >
              Remove
            </button>
            <button
              className="hover:text-white hover:rounded-[10px] hover:bg-[#001845] hover:border hover:py-[6px] hover:px-5 border hover:border-transparent hover:transition-all hover:ease-in-out hover:duration-500 bg-transparent border-[#001845] text-[#001845] font-medium rounded-[10px] py-[6px] px-5 transition-all ease-in-out duration-500"
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
