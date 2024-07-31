import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import link from "../../../Assets/Images/link.svg";
import classes from "./CreateWorkspace.module.css";
import { createWorkspace } from "../../../Services/Workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateWorkspace = (props) => {
  const queryClient = useQueryClient();

  //States
  const [initialScreen, setInitialScreen] = useState(true);
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
    props.onHide();
  };
  const inviteWithLinkHandler = () => {
    //API for invite link
    props.onHide();
  };

  // APIs
  const createWorkspaceMutation = useMutation({
    mutationFn: () => createWorkspace(workspaceName, workspaceDescription),
    onSuccess: () => {
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

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      centered
      className={classes.modalContainer}
    >
      <Modal.Header closeButton>
        <Modal.Title className={classes.header}>
          {initialScreen ? "Let's Build A Workspace" : "Invite Your Team"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.modalBody}>
        {initialScreen ? (
          <>
            <h5>
              Enhance productivity by centralizing board access for everyone.
            </h5>
            <form className={classes.createWsForm}>
              <div className={classes.inputContainer}>
                <label htmlFor="workspace-name">Workspace Name</label>
                <input
                  type="text"
                  id="workspace-name"
                  placeholder="This is the name of your company, team or organization."
                  onChange={wsNameHandler}
                  value={workspaceName}
                />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="workspace-description">
                  Workspace Description{" "}
                  <span className={classes.optional}>(optional)</span>
                </label>
                <textarea
                  id="workspace-description"
                  placeholder="Get your members on board with a few words about your Workspace."
                  rows={5}
                  onChange={wsDescriptionHandler}
                  value={workspaceDescription}
                />
              </div>
              <button className={classes.btn1} onClick={props.onHide}>
                Cancel
              </button>
              <button
                className={classes.btn2}
                onClick={continueCreationHandler}
                disabled={continueDisabled}
              >
                Continue
              </button>
            </form>
          </>
        ) : (
          <>
            <h5>Invite workspace members using a link or by entering email.</h5>
            <div className={classes.inputContainer}>
              <div className={classes.labelContainer}>
                <label>Workspace Members</label>
                <div onClick={inviteWithLinkHandler}>
                  <img src={link} alt="link" />
                  <span>Invite with link</span>
                </div>
              </div>
              <input
                type="text"
                placeholder="Separate emails with , eg. a@gmail.com, b@gmail.com"
                onChange={wsEmailsHandler}
                value={emails}
              />
            </div>
            <div className={classes.footer}>
              <h6 className={classes.later} onClick={props.onHide}>
                I'll do this later
              </h6>
              <button
                className={classes.btn2}
                disabled={inviteDisabled}
                onClick={inviteHandler}
              >
                Invite to Workspace
              </button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CreateWorkspace;
