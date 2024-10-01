import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { leaveWorkspace } from "../../Services/Workspace";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const LeaveWorkspace = (props) => {
  const { id } = useParams();
  const jwt = useSelector((state) => state.authentication.jwt);
  const queryClient = useQueryClient();

  //States
  const [selectedUser, setSelectedUser] = useState();

  //Handlers
  const leaveWorkspaceHandler = () => {
    leaveWorkspaceMutation.mutate();
  };

  //API
  const leaveWorkspaceMutation = useMutation({
    mutationFn: () => leaveWorkspace(id, selectedUser?.user_id || "", jwt),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-members"],
      });
      queryClient.invalidateQueries({
        queryKey: ["all-workspaces"],
      });
      props.onClose();
      toast.success(response?.data?.message);
    },
    onError: (error) => {
      console.error(error);
      props.onClose();
      toast.error("An error occured. Try again later");
    },
  });

  return (
    <Dialog {...props} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 max-sm:p-2">
        <DialogPanel className="max-w-lg space-y-4 rounded-2xl bg-white p-7 max-sm:w-[calc(100vw_-_40px)]">
          <DialogTitle className="text-xl font-semibold max-sm:text-base">
            Leave Workspace
          </DialogTitle>
          {props?.user?.status === "Admin" ? (
            props?.allusers?.length > 1 ? (
              <>
                <p className="text-[15px] tracking-[0.8px] max-sm:text-sm">
                  You are the admin of this workspace, please assign some other
                  user as admin before leaving.
                </p>

                <Menu>
                  <MenuButton className="flex w-[150px] cursor-pointer items-center justify-between gap-3 rounded-[10px] border border-[#001845] px-4 py-2">
                    <span className="text-sm text-[#001845]">
                      {selectedUser ? selectedUser.name : "Select a user"}{" "}
                    </span>
                    <ChevronDownIcon className="w-5" />
                  </MenuButton>
                  <MenuItems
                    anchor="bottom"
                    className="mt-1 w-min cursor-pointer rounded-[10px] bg-white py-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] focus-visible:border-none"
                  >
                    {props.allusers.map(
                      (user) =>
                        user.status !== "Admin" && (
                          <MenuItem
                            onClick={() => setSelectedUser(user)}
                            as={"div"}
                            className="group cursor-pointer px-3 py-1 hover:bg-[#00000039]"
                            key={user.id}
                          >
                            <h6 className="m-0 text-xs font-medium leading-3 text-[#000000] group-hover:text-white">
                              {user.name}
                            </h6>
                            <span className="text-xs leading-3 text-[#000000] group-hover:text-white">
                              {user.email}
                            </span>
                          </MenuItem>
                        )
                    )}
                  </MenuItems>
                </Menu>
                <div className="flex items-center justify-end gap-[10px]">
                  <button
                    onClick={leaveWorkspaceHandler}
                    className="rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-white transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-[#001845] hover:bg-transparent hover:px-5 hover:py-2 hover:font-medium hover:text-[#001845] hover:transition-all hover:duration-500 hover:ease-in-out disabled:cursor-not-allowed disabled:bg-[#001845] disabled:text-white disabled:opacity-40 max-sm:py-1 max-sm:text-sm"
                    disabled={!selectedUser}
                  >
                    {leaveWorkspaceMutation.isPending
                      ? "Leaving..."
                      : "Leave workspace"}
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
                  You are the only member of this workspace, leaving it will
                  permanently delete this workspace.
                </p>
                <div className="flex items-center justify-end gap-[10px]">
                  <button
                    onClick={leaveWorkspaceHandler}
                    className="rounded-[10px] border border-transparent bg-[#001845] px-5 py-2 text-white transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-[#001845] hover:bg-transparent hover:px-5 hover:py-2 hover:font-medium hover:text-[#001845] hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
                  >
                    {leaveWorkspaceMutation.isPending
                      ? "Leaving..."
                      : "Leave anyway"}
                  </button>
                  <button
                    className="rounded-[10px] border border-[#001845] bg-transparent px-5 py-2 font-medium text-[#001845] transition-all duration-500 ease-in-out hover:rounded-[10px] hover:border hover:border-transparent hover:bg-[#001845] hover:px-5 hover:py-2 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out max-sm:py-1 max-sm:text-sm"
                    onClick={props.onClose}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )
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
                  {leaveWorkspaceMutation.isPending
                    ? "Leaving..."
                    : "Leave workspace"}
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
