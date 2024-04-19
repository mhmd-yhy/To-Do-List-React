import React, {useContext, useMemo, useState} from "react";
import Task from "./Task";
import {TasksContext} from "./context/TasksContext";
import Modal from "./Modal";
import {ModalContext} from "./context/ModalContext";
let styleBtn = {
  outline: " 1px solid #71c4ef",
  color: " #71c4ef",
  fontWeight: " bold",
  transition: " all 0.5s",
};

const TaskList = () => {
  const [RenderedValue, setRenderedValue] = useState("");
  const {tasks, setTasks} = useContext(TasksContext);
  const [modalShow, setModalShow] = useState({mood: "d-none", ModalName: "Delete"});
  const [myTask, setMyTask] = useState({});
  /*=======$$//Start Filtration//$$=======*/
  let Completed;
  let DesCompleted;
  let tasksToBeRendered;
  let AllTasks;

  Completed = useMemo(() => {
    return tasks.filter((t) => {
      return t.isComleted;
    });
  }, [tasks]);

  DesCompleted = useMemo(() => {
    return tasks.filter((t) => {
      return !t.isComleted;
    });
  }, [tasks]);

  if (RenderedValue === "Discompleted") tasksToBeRendered = DesCompleted;
  else if (RenderedValue === "Completed") tasksToBeRendered = Completed;
  else tasksToBeRendered = tasks;

  AllTasks = tasksToBeRendered.map((t) => {
    return <Task key={t.id} task={t} setIsCompleted={handleIsCompleted} modalShow={handleModal} />;
  });
  /*=======$$//End Filtration//$$=======*/

  function handleIsCompleted(myTask) {
    let updateTasks = tasks.map((t) => {
      if (myTask.id === t.id) {
        let newTask = {...myTask, isComleted: !t.isComleted};
        return newTask;
      } else return t;
    });
    setTasks(updateTasks);
    localStorage.setItem(`tasks`, JSON.stringify(updateTasks));
  }
  function handleModal(task, modal) {
    modalShow.mood === `d-none`
      ? setModalShow({mood: `d-block`, ModalName: modal})
      : setModalShow({mood: `d-none`, ModalName: modal});
    setMyTask(task);
  }
  let ModalContextValues = {myTask: myTask, modalShow: modalShow, handleModal};
  return (
    <ModalContext.Provider value={ModalContextValues}>
      <Modal />
      {/*=======$$//Start Filtration Buttons//$$=======*/}
      <div className="btn-group text-center mb-3 d-block" role="group" aria-label="Basic outlined example">
        <button type="button" className="btn btnApp" style={styleBtn} onClick={() => setRenderedValue("Discompleted")}>
          Discompleted
        </button>
        <button type="button" className="btn btnApp" style={styleBtn} onClick={() => setRenderedValue("Completed")}>
          Completed
        </button>
        <button type="button" className="btn btnApp" style={styleBtn} onClick={() => setRenderedValue("All")}>
          All
        </button>
      </div>
      {/*=======$$//End Filtration Buttons//$$=======*/}
      <div className="overflow-y-auto" style={{maxHeight: "45vh"}}>
        {AllTasks}
      </div>
    </ModalContext.Provider>
  );
};

export default TaskList;
