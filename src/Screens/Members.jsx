import { useState } from "react";
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

const Members = () => {
  const { workspaceName } = useParams();
  const location = useLocation();
  const tabColors = ["#007f5f", "#023e7d", "#d00000", "#9d4edd", "#ffba08"];
  const users = [
    {
      id: 1,
      name: "Durward Reynolds",
      email: "bhatnagarmansi.03@gmail.com",
      status: "owner",
    },
    {
      id: 2,
      name: "Kenton Towne",
      email: "bhatnagarmansi.03@gmail.com",
      status: "invitation pending",
    },
    { id: 3, name: "Therese Wunsch", email: "bhatnagarmansi.03@gmail.com" },
    { id: 4, name: "Benedict Kessler", email: "bhatnagarmansi.03@gmail.com" },
    {
      id: 5,
      name: "Katelyn Rohan",
      email: "bhatnagarmansi.03@gmail.com",
      status: "invitation pending",
    },
  ];

  //States
  const [selectedUser, setSelectedUser] = useState("");
  const [query, setQuery] = useState("");
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
  const [showLeaveWorkspaceModal, setShowLeaveWorkspaceModal] = useState(false);
  const [leavingUser, setLeavingUser] = useState({});
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false);

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) => {
          return user.name.toLowerCase().includes(query.toLowerCase());
        });

  //Handlers
  const removeUserHandler = () => {
    setShowRemoveUserModal(true);
  };

  const leaveWorkspaceHandler = (user) => {
    setShowLeaveWorkspaceModal(true);
    setLeavingUser(user);
  };

  const inviteMembersHandler = () => {
    setShowInviteMembersModal(true);
  };

  return (
    <>
      <div className="mb-9 flex items-center justify-between w-[calc(100vw_-_586px)] border-b border-b-[#33415c] pb-5">
        <div className="flex items-start justify-start gap-3">
          <div
            className="w-12 h-12 flex items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: location?.state?.color }}
          >
            <span>{workspaceName[0].toUpperCase()}</span>
          </div>
          <div className="flex items-start flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-white">{workspaceName} </span>
              <PencilSquareIcon className="w-5 cursor-pointer text-white" />
            </div>
            {location?.state?.description ? (
              <p className="text-sm max-w-[70%]">
                {location?.state?.description}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          onClick={inviteMembersHandler}
          style={{ backgroundColor: location?.state?.color }}
          className="text-white rounded-lg py-3 px-4"
        >
          Invite Members
        </button>
      </div>
      <h4 className="text-white font-medium text-lg my-2">Workspace Members</h4>
      <p className="text-[#97a4b2] text-[15px] mb-9">
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
          className="bg-transparent py-2 px-5 border border-[#97a4b2] w-[50%] rounded-md"
        />
        <ComboboxOptions
          anchor="bottom end"
          className="border shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] [--anchor-gap:8px] transition duration-200 ease-out empty:invisible w-[20%] bg-[#33415c] rounded-md border-none"
        >
          {filteredUsers.map((user, index) => (
            <div key={user.id}>
              <ComboboxOption
                value={user}
                className="data-[focus]:bg-[#5c677d] text-white py-1 px-5"
              >
                {user.name}
              </ComboboxOption>
              {index === filteredUsers?.length - 1 ? (
                ""
              ) : (
                <div className="w-[calc(100%_-_40px)] mx-auto h-[0.5px] bg-[#97a4b26d] " />
              )}
            </div>
          ))}
        </ComboboxOptions>
      </Combobox>
      <div className="mt-9 space-y-4">
        {filteredUsers.map((user, idx) => {
          return (
            <div key={idx} className="flex items-start justify-between">
              <div className="flex items-center justify-start gap-3">
                <div
                  style={{ backgroundColor: `${tabColors[idx % 5]}` }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <span className="text-white">{user.name[0]}</span>
                </div>
                <div>
                  <h6 className="text-white text-base m-0">
                    {user.name}
                    {user.status ? (
                      <p
                        style={{
                          backgroundColor:
                            user.status === "owner" ? "#c7f9cc" : "#ffdada",
                          color:
                            user.status === "owner" ? "#007f5f" : "#d00000",
                        }}
                        className="py-1 px-2 rounded-md text-xs ml-3 inline-block capitalize"
                      >
                        {user.status}
                      </p>
                    ) : (
                      ""
                    )}
                  </h6>
                  <span className="text-[#97a4b2] text-sm">{user.email}</span>
                </div>
              </div>
              {/* If user id matches my id then option will be leave, if my id also matches owner id then remove option will be present in all other users. */}
              {/* If the user's status is invitation pending then no option (remove/ leave) will be shown */}

              <button
                onClick={removeUserHandler}
                className="group hover:border-[0.5px] hover:border-[#97a4b2] border-[0.5px] border-transparent bg-[#33415c] flex items-center gap-1 py-1 px-4 rounded-md"
              >
                <XMarkIcon className="w-5 text-[#97a4b2] group-hover:text-white" />
                <span className="text-[#97a4b2] group-hover:text-white">
                  Remove
                </span>
              </button>

              {/* <button
                onClick={() => leaveWorkspaceHandler(user)}
                className="group hover:border-[0.5px] hover:border-[#97a4b2] border-[0.5px] border-transparent bg-[#33415c] flex items-center gap-1 py-1 px-4 rounded-md"
              >
                <XMarkIcon className="w-5 text-[#97a4b2] group-hover:text-white" />
                <span className="text-[#97a4b2] group-hover:text-white">
                  Leave
                </span>
              </button> */}
            </div>
          );
        })}
      </div>
      <RemoveUser
        open={showRemoveUserModal}
        onClose={() => setShowRemoveUserModal(false)}
      />
      <LeaveWorkspace
        open={showLeaveWorkspaceModal}
        onClose={() => setShowLeaveWorkspaceModal(false)}
        user={leavingUser}
      />
      {showInviteMembersModal && (
        <CreateWorkspace
          showInitialScreen={false}
          open={showInviteMembersModal}
          setShowCreateWorkspaceModal={setShowInviteMembersModal}
        />
      )}
    </>
  );
};

export default Members;
