import React, { useState, useEffect } from 'react';
import './App.css';
import Circle from './components/Circle';
import TaskCard from './components/TaskCard';
import ModalAddEdit from './components/ModalAddEdit';
import ModalDelete from './components/ModalDelete';

function App() {
  const [selectedFilter, setSelectedFilter] = useState('Todas');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [index, setIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [myTasks, setMyTasks] = useState([
    { title: "Tarea 1", description: "Descripción tarea 1", date: "01/11/2023", status: "Pendiente" },
    { title: "Tarea 2", description: "Descripción tarea 2", date: "02/11/2023", status: "Pendiente" },
    { title: "Tarea 3", description: "Descripción tarea 3", date: "05/10/2023", status: "Pendiente" },
    { title: "Tarea 4", description: "Descripción tarea 4", date: "04/11/2023", status: "Pendiente" },
    { title: "Tarea 5", description: "Descripción tarea 5", date: "05/11/2023", status: "Completada" },
    { title: "Tarea 6", description: "Descripción tarea 6", date: "01/10/2023", status: "Completada" }
  ])

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filteredTasks = myTasks.map((task) => {
      const taskDateParts = task.date.split('/');
      const taskDateObject = new Date(taskDateParts[2], taskDateParts[1] - 1, taskDateParts[0]);
      taskDateObject.setHours(0, 0, 0, 0);
      const isDateExpired = taskDateObject < today;

      return {
        ...task,
        isExpired: isDateExpired,
      };
    }).filter((task) => {
      if (selectedFilter === 'Todas') {
        return true;
      } else if (selectedFilter === 'Pendientes') {
        return task.status === 'Pendiente';
      } else if (selectedFilter === 'Completadas') {
        return task.status === 'Completada';
      }
      return false;
    });

    setFilteredTasks(filteredTasks);
  }, [myTasks, selectedFilter]);

  const handleUpdateTask = (updatedData, index) => {
    const updatedTasks = [...myTasks];

    updatedTasks[index] = {
      ...updatedTasks[index],
      ...updatedData
    }

    setMyTasks(updatedTasks)
  }

  const addNewTask = (newTaskData) => {
    const updatedTasks = [...myTasks, newTaskData];
    setMyTasks(updatedTasks);
  }

  const deleteTask = (index) => {
    const updatedTasks = [...myTasks];
    updatedTasks.splice(index, 1);
    setMyTasks(updatedTasks);
  }

  return (
    <div className="md:w-3/4 lg:w-1/2 mx-auto p-4">
      <header className="App-header">
        <div className="flex justify-between items-center">
          <p>Lista de Tareas</p>
          <div className="ml-10">
            <Circle
              add={true}
              setIsModalOpen={setIsModalOpen}
              setTitleModal={setTitleModal}
              setItemSelected={setItemSelected}
            />
          </div>
        </div>
      </header>

      {filteredTasks.map((task, index) => (
        <TaskCard
          key={index}
          index={index}
          item={task}
          setModalOpen={setIsModalOpen}
          setTitleModal={setTitleModal}
          setModalDelete={setIsModalDelete}
          setIndex={setIndex}
          setItemSelected={setItemSelected}
          handleUpdateTask={handleUpdateTask}
        />
      ))}

      {isModalOpen && (
        <ModalAddEdit
          title={titleModal}
          isOpen={isModalOpen}
          item={itemSelected}
          index={index}
          setIsModalOpen={setIsModalOpen}
          setModalDelete={setIsModalDelete}
          handleUpdateTask={handleUpdateTask}
          setItemSelected={setItemSelected}
          addNewTask={addNewTask}
        />
      )}

      {isModalDelete && (
        <ModalDelete
          isOpen={isModalDelete}
          setModalDelete={setIsModalDelete}
          deleteTask={deleteTask}
          index={index}
        />
      )}

      <div className="mt-4 w-full flex p-2">
        <div className="overflow-hidden w-1/3">
          <button
            className={`rounded ml-2 text-l font-bold p-2 w-full ${selectedFilter === 'Todas' ? 'bg-slate-400' : 'bg-slate-200'}`}
            onClick={() => setSelectedFilter('Todas')}
          >
            Todas {selectedFilter === "Todas" && `(${filteredTasks.length})`}
          </button>
        </div>
        <div className="overflow-hidden w-1/3">
          <button
            className={`rounded ml-2 text-l font-bold p-2 w-full ${selectedFilter === 'Pendientes' ? 'bg-slate-400' : 'bg-slate-200'}`}
            onClick={() => setSelectedFilter('Pendientes')}
          >
            Pendientes {selectedFilter === "Pendientes" && `(${filteredTasks.length})`}
          </button>
        </div>
        <div className="overflow-hidden w-1/3">
          <button
            className={`rounded ml-2 text-l font-bold p-2 w-full ${selectedFilter === 'Completadas' ? 'bg-slate-400' : 'bg-slate-200'}`}
            onClick={() => setSelectedFilter('Completadas')}
          >
            Completadas {selectedFilter === "Completadas" && `(${filteredTasks.length})`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App