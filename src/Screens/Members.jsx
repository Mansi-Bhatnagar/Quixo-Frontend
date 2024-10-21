import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import RemoveUser from "../Components/Modal/RemoveUser";
import LeaveWorkspace from "../Components/Modal/LeaveWorkspace";
import CreateWorkspace from "../Components/Modal/CreateWorkspace";
import WorkspaceDetails from "../Components/Modal/WorkspaceDetails";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../Services/Workspace";
import { useSelector } from "react-redux";

const Members = () => {
  const location = useLocation();
  const { id } = useParams();
  const currentUserId = +localStorage.getItem("userId");
  const jwt = useSelector((state) => state.authentication.jwt);
  const name = location?.state?.name;
  const description = location?.state?.description;
  const color = location?.state?.color;

  //States
  const [selectedUser, setSelectedUser] = useState("");
  const [query, setQuery] = useState("");
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
  const [showLeaveWorkspaceModal, setShowLeaveWorkspaceModal] = useState(false);
  const [leavingUser, setLeavingUser] = useState({});
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false);
  const [showEditWorkspaceDetailsModal, setShowEditWorkspaceDetailsModal] =
    useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState();
  const [adminId, setAdminId] = useState();
  const [removeUser, setRemoveUser] = useState({});

  //Handlers
  const removeUserHandler = (user) => {
    setShowRemoveUserModal(true);
    setRemoveUser(user);
  };

  const leaveWorkspaceHandler = (user) => {
    setShowLeaveWorkspaceModal(true);
    setLeavingUser(user);
  };

  const inviteMembersHandler = () => {
    setShowInviteMembersModal(true);
  };

  //APIs
  const {
    data: membersData,
    error: membersError,
    isLoading: membersLoading,
  } = useQuery({
    queryFn: () => getMembers(id, jwt),
    queryKey: ["workspace-members", jwt, id],
    enabled: jwt !== "" && id !== "",
  });

  //Effects
  useEffect(() => {
    if (!membersLoading && membersData) {
      console.log("members data = ", membersData);
      setUsers(membersData?.data?.members_lists);
      setAdminId(membersData?.data?.admin_id);
    } else if (membersError) {
      console.error(membersError);
    }
  }, [membersData, membersError, membersLoading]);

  useEffect(() => {
    setFilteredUsers(
      query === "" && !selectedUser
        ? users
        : selectedUser
        ? [selectedUser]
        : users.filter((user) => {
            return user.name.toLowerCase().includes(query.toLowerCase());
          })
    );
  }, [users, query, selectedUser]);

  return (
    <>
      <div className="mb-9 flex items-start justify-between border-b border-b-[#33415c] pb-5 max-xl:w-full">
        <div className="flex basis-[75%] items-start justify-start gap-3 max-xl:basis-[70%] max-sm:basis-full max-sm:flex-col">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg text-white max-sm:hidden"
            style={{ backgroundColor: color }}
          >
            <span>{name?.[0].toUpperCase()}</span>
          </div>
          <div className="hidden w-full items-start justify-between max-sm:flex">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg text-white"
              style={{ backgroundColor: color }}
            >
              <span>{name?.[0].toUpperCase()}</span>
            </div>
            <button
              onClick={inviteMembersHandler}
              style={{ backgroundColor: color }}
              className="rounded-lg px-4 py-3 text-sm text-white"
            >
              Invite Members
            </button>
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <span className="text-white">{name} </span>
              <PencilSquareIcon
                className="w-5 cursor-pointer text-white"
                onClick={() => {
                  setShowEditWorkspaceDetailsModal(true);
                }}
              />
            </div>
            {description ? (
              <p className="w-full text-justify text-sm">{description}</p>
            ) : (
              ""
            )}
          </div>
        </div>

        {currentUserId === adminId ? (
          <button
            onClick={inviteMembersHandler}
            style={{ backgroundColor: color }}
            className="basis-[20%] rounded-lg px-4 py-3 text-white max-xl:basis-[25%] max-sm:hidden"
          >
            Invite Members
          </button>
        ) : (
          ""
        )}
      </div>
      <h4 className="my-2 text-lg font-medium text-white max-sm:text-base">
        Workspace Members
      </h4>
      <p className="mb-9 text-[15px] text-[#97a4b2] max-sm:text-sm">
        Workspace members have access to view and join all boards in the
        workspace, as well as create new boards within it.
      </p>
      <Combobox
        value={selectedUser}
        onChange={setSelectedUser}
        onClose={() => setQuery("")}
      >
        <ComboboxInput
          aria-label="Assignee"
          displayValue={(user) => user?.name}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search user by name..."
          className="w-[50%] rounded-md border border-[#97a4b2] bg-transparent px-5 py-2 focus:border-white focus:outline-none max-sm:text-sm max-sm:placeholder:text-sm"
        />
        <ComboboxOptions
          anchor="bottom end"
          className="w-[20%] cursor-pointer rounded-md border border-none bg-[#33415c] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] transition duration-200 ease-out [--anchor-gap:8px] empty:invisible"
        >
          {filteredUsers?.map((user, index) => (
            <div key={user.id}>
              <ComboboxOption
                value={user}
                className="px-5 py-1 text-white data-[focus]:bg-[#5c677d]"
              >
                {user.name}
              </ComboboxOption>
              {index === filteredUsers?.length - 1 ? (
                ""
              ) : (
                <div className="mx-auto h-[0.5px] w-[calc(100%_-_40px)] bg-[#97a4b26d]" />
              )}
            </div>
          ))}
        </ComboboxOptions>
      </Combobox>
      <div className="mb-9 mt-9 space-y-4">
        {filteredUsers?.map((user) => {
          return (
            <div
              key={user.id}
              className="flex flex-wrap items-start justify-between max-sm:gap-y-2"
            >
              <div className="flex items-center justify-start gap-3">
                <div
                  style={{ backgroundColor: user.user_color }}
                  className="flex h-10 w-10 items-center justify-center rounded-full max-sm:h-8 max-sm:w-8"
                >
                  <span className="text-white max-sm:text-sm">
                    {user.name[0]}
                  </span>
                </div>
                <div>
                  <h6 className="my-0 text-base text-white max-sm:text-sm">
                    {user.name}
                    {user.status === "Admin" ? (
                      <p
                        style={{
                          backgroundColor: "#c7f9cc",
                          color: "#007f5f",
                        }}
                        className="ml-3 inline-block rounded-md px-2 py-1 text-xs capitalize max-sm:hidden"
                      >
                        {user.status}
                      </p>
                    ) : (
                      ""
                    )}
                  </h6>
                  <span className="text-sm text-[#97a4b2] max-sm:text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
              {/* If user id matches my id then option will be leave, if my id also matches owner id then remove option will be present in all other users. */}
              {currentUserId === user.user_id ? (
                <button
                  onClick={() => leaveWorkspaceHandler(user)}
                  className="group flex items-center gap-1 rounded-md border-[0.5px] border-transparent bg-[#33415c] px-4 py-1 hover:border-[0.5px] hover:border-[#97a4b2] max-sm:px-2"
                >
                  <XMarkIcon className="w-5 text-[#97a4b2] group-hover:text-white max-sm:w-4" />
                  <span className="text-[#97a4b2] group-hover:text-white max-sm:text-sm">
                    Leave
                  </span>
                </button>
              ) : (
                ""
              )}

              {currentUserId === adminId && user.user_id !== adminId ? (
                <button
                  onClick={() => removeUserHandler(user)}
                  className="group flex items-center gap-1 rounded-md border-[0.5px] border-transparent bg-[#33415c] px-4 py-1 hover:border-[0.5px] hover:border-[#97a4b2] max-sm:px-2"
                >
                  <XMarkIcon className="w-5 text-[#97a4b2] group-hover:text-white max-sm:w-4" />
                  <span className="text-[#97a4b2] group-hover:text-white max-sm:text-sm">
                    Remove
                  </span>
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <RemoveUser
        open={showRemoveUserModal}
        onClose={() => setShowRemoveUserModal(false)}
        user={removeUser}
      />
      <LeaveWorkspace
        open={showLeaveWorkspaceModal}
        onClose={() => setShowLeaveWorkspaceModal(false)}
        user={leavingUser}
        allusers={users}
      />
      {showInviteMembersModal && (
        <CreateWorkspace
          showInitialScreen={false}
          open={showInviteMembersModal}
          setShowCreateWorkspaceModal={setShowInviteMembersModal}
          wsId={id}
        />
      )}
      {showEditWorkspaceDetailsModal && (
        <WorkspaceDetails
          open={showEditWorkspaceDetailsModal}
          setShowEditWorkspaceDetailsModal={setShowEditWorkspaceDetailsModal}
          name={name}
          description={description}
        />
      )}
    </>
  );
};

export default Members;
