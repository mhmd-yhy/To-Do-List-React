import React, {useContext, useEffect, useState} from "react";
import {TasksContext} from "./context/TasksContext";
import {toast} from "react-toastify";

let styleBtn = {
  backgroundColor: "#71c4ef",
  color: " #71c4ef",
  fontWeight: " bold",
  transition: " all 0.5s",
  letterSpacing: "0px",
};
const NewTask = () => {
  const {tasks, setTasks} = useContext(TasksContext);
  const [inputValue, setInputVAlue] = useState("");
  function handleTaskAdd() {
    if (inputValue !== "") {
      let NewTask = {
        id: Math.random(),
        title: inputValue,
        description: "This is new task",
        isComleted: false,
      };
      let newTasks = [...tasks, NewTask];
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      setInputVAlue("");
      toast.success("Task added");
    }
  }
  useEffect(() => {
    if (localStorage.tasks) {
      let storageTasks = JSON.parse(localStorage.getItem(`tasks`)) ?? [];
      setTasks(storageTasks);
    }
  }, []);
  return (
    <div className="input-group mb-3 w-50 mx-auto border-1 border rounded-2" style={{borderColor: "#71c4ef"}}>
      <button
        className="btn btnAdd border-0"
        type="button"
        id="button-addon1"
        style={styleBtn}
        onClick={handleTaskAdd}
        disabled={inputValue === ""}
      >
        <div className="iconAdd bg-white rounded-circle py-1 px-2" style={{transition: "all 0.3s"}}>
          <i className="fa-solid fa-plus"></i>
        </div>
      </button>
      <input
        type="text"
        className="form-control BTNADD border border-0 text-white"
        placeholder="Add..."
        aria-label="Example text with button addon"
        aria-describedby="button-addon1"
        style={{backgroundColor: "#393e46"}}
        value={inputValue}
        onChange={(e) => setInputVAlue(e.target.value)}
      />
    </div>
  );
};

export default NewTask;
