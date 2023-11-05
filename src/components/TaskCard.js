import React from 'react';
import Circle from './Circle';

const TaskCard = ({ index, item, setItemSelected, setModalOpen, setTitleModal, setModalDelete, setIndex, handleUpdateTask }) => {

    const handleTaskClick = () => {
        if (item.status === "Completada") {
            setModalDelete(true);
        } else {
            setTitleModal("Editar tarea");
            setModalOpen(true);
        }

        setItemSelected(item);
        setIndex(index);
    }

    return (
        <div className="flex justify-center" onClick={handleTaskClick}>
            <div className={`mt-1 rounded overflow-hidden shadow-lg border-solid border-2 border-neutral-900 w-11/12 cursor-pointer ${item.isExpired && item.status === "Pendiente" && 'bg-red-50'}`}>
                <div className="flex">
                    <div className="flex items-center justify-center ml-2">
                        <Circle
                            item={item}
                            index={index}
                            isChecked={item.status === "Completada"}
                            handleUpdateTask={handleUpdateTask}
                            setItemSelected={setItemSelected}
                            setIndex={setIndex}
                        />
                    </div>

                    <div className={`flex-1 text-left p-4 ${item.status === "Completada" && 'line-through'}`}>
                        <h2 className="text-l font-bold">{item.title}</h2>
                        <p className="text-gray-700">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-center p-4">
                        <p className="text-center">{item.date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
