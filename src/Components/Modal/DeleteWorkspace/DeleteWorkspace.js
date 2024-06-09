import Modal from "react-bootstrap/Modal";
import classes from "./DeleteWorkspace.module.css";

const DeleteWorkspace = (props) => {
  const deleteWorkspaceHandler = () => {
    //API
  };
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
