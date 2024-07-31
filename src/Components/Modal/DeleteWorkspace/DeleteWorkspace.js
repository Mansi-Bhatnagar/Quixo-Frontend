import Modal from "react-bootstrap/Modal";
import classes from "./DeleteWorkspace.module.css";
import { deleteWorkspace } from "../../../Services/Workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteWorkspace = (props) => {
  const queryClient = useQueryClient();

  //Handlers
  const deleteWorkspaceHandler = () => {
    deleteWorkspaceMutaion.mutate();
    props.onHide();
  };

  // APIs
  const deleteWorkspaceMutaion = useMutation({
    mutationFn: () => deleteWorkspace(props.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-workspaces"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Modal {...props} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.modalBody}>
        <p>
          Are you sure you want to delete the workspace? (All boards within it
          will be deleted)
        </p>
        <div className={classes.btnContainer}>
          <button onClick={deleteWorkspaceHandler}>Delete</button>
          <button onClick={props.onHide}>Cancel</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteWorkspace;
