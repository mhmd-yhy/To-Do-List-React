import React from "react";

const Task = ({task, setIsCompleted, modalShow}) => {
  return (
    <div
      className={`card mb-3 Task text-white ${task.isComleted ? "completed" : ""}`}
      style={{backgroundColor: "#00668c"}}
    >
      <div className="row g-0">
        <div className="col-8">
          <div className="card-body ps-5">
            <h4 className={`card-title ${task.isComleted ? "text-decoration-line-through" : ""}`}>{task.title}</h4>
            <p className="card-text">
              <small className="text-white-50">{task.description}</small>
            </p>
          </div>
        </div>
        <div className="col-4">
          <div className="card-body h-100 d-flex justify-content-evenly align-items-center">
            {/* Start Button Delete */}
            <button
              type="button"
              className="icon btn px-2 py-1 bg-white rounded-circle border border-2 border-danger"
              style={{cursor: "pointer"}}
              onClick={() => modalShow(task, `Delete`)}
            >
              <i className="fa-solid fa-trash text-danger"></i>
            </button>
            {/* End Button Delete */}
            {/* Start Button Update */}
            <button
              type="button"
              className="icon btn px-2 py-1 bg-white rounded-circle border border-2 border-primary"
              style={{cursor: "pointer"}}
              onClick={() => modalShow(task, `Update`)}
            >
              <i className="fa-solid fa-pen text-primary"></i>
            </button>
            {/* End Button Update */}
            {/* Start Button Completed */}
            <div
              className={`icon px-2 py-1 bg-white rounded-circle border border-2 border-${
                task.isComleted ? "success" : "danger"
              }`}
              style={{cursor: "pointer"}}
              onClick={() => setIsCompleted(task)}
            >
              {task.isComleted ? (
                <i className="fa-solid fa-check text-success"></i>
              ) : (
                <i className="fa-solid fa-xmark text-danger"></i>
              )}
            </div>
            {/* End Button Completed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
