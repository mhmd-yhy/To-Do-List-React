import React, {useContext, useEffect, useState} from "react";
import {ModalContext} from "./context/ModalContext";
import {TasksContext} from "./context/TasksContext";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Modal = () => {
  let {myTask, handleModal, modalShow} = useContext(ModalContext);
  const {tasks, setTasks} = useContext(TasksContext);
  const [inputsValues, setInputsValues] = useState({});

  useEffect(() => {
    setInputsValues(myTask);
  }, [myTask]);

  function handleConfirmClick() {
    let updateTasks;
    if (modalShow.ModalName === "Delete") {
      /*=====Delete=====*/
      updateTasks = tasks.filter((t) => {
        return t.id !== myTask.id;
      });
      toast.error("Task has been deleted");
      /*=====//Delete//=====*/
    } else {
      /*=====Update=====*/
      updateTasks = tasks.map((t) => {
        if (t.id === myTask.id) {
          let updateTask = {...t, title: inputsValues.title, description: inputsValues.description};
          return updateTask;
        } else return t;
      });
      toast.info("Task has been modified");
      /*=====//Update//=====*/
    }
    setTasks(updateTasks);
    localStorage.setItem(`tasks`, JSON.stringify(updateTasks));
    handleModal(myTask);
  }
  return (
    <div className={`modal ${modalShow.mood}`} tabIndex="-1" style={{backgroundColor: `#0000007a`}}>
      <div className="modal-dialog">
        <div className="modal-content" style={{backgroundColor: "#393e46", borderColor: "#71c4ef"}}>
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-white">{modalShow.ModalName} Task</h5>
            <div
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => handleModal(myTask)}
            ></div>
          </div>
          <div className="modal-body">
            {modalShow.ModalName === "Delete" ? (
              <p className="m-0 text-white">{`Are you sure you want to delete "${myTask.title}" ?`}</p>
            ) : (
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name " className="col-form-label text-white">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control inputUpdate bg-transparent text-white-50"
                    id="recipient-name"
                    value={`${inputsValues.title !== "" ? inputsValues.title : ""}`}
                    onChange={(e) => setInputsValues({...inputsValues, title: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label text-white">
                    Description:
                  </label>
                  <textarea
                    className="form-control bg-transparent text-white-50"
                    id="message-text"
                    value={inputsValues.description}
                    onChange={(e) => setInputsValues({...inputsValues, description: e.target.value})}
                  ></textarea>
                </div>
              </form>
            )}
          </div>
          <div className="modal-footer border-secondary">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                handleModal(myTask);
                setInputsValues({title: myTask.title, description: myTask.description});
              }}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleConfirmClick}>
              {modalShow.ModalName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
