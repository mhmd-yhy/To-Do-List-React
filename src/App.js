import {useState} from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import {TasksContext} from "./components/context/TasksContext";
import NewTask from "./components/NewTask";
import {Flip, ToastContainer} from "react-toastify";
let initialValues = [
  {
    id: Math.random(),
    title: "Title Example 1",
    description: "Description of title 1",
    isComleted: false,
  },
  {
    id: Math.random(),
    title: "Title Example 2",
    description: "Description of title 2",
    isComleted: true,
  },
];
function App() {
  const [tasks, setTasks] = useState(initialValues);
  return (
    <TasksContext.Provider value={{tasks: tasks, setTasks}}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
      <div className="App">
        <div className="App container ">
          <div className="row d-flex justify-content-center">
            <div className="card col-12 col-md-8 col-lg-6 mt-5 py-3" style={{backgroundColor: "#393e46"}}>
              <h1 className="text-center m-0 text-white">
                My Tasks <hr />
              </h1>
              <NewTask />
              <TaskList />
              <h5 className="develped text-white text-center mt-4 w-75 m-auto pb-1">
                Developed by &nbsp;<span className="text-primary">Muhammed Yahya</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </TasksContext.Provider>
  );
}

export default App;
