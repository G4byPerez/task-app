import React from 'react';

const ModalDelete = ({ index, isOpen, setModalDelete, deleteTask }) => {
    if (!isOpen) return null

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-center">¿Estás seguro de que deseas eliminar la tarea?</h2>

                <div className="flex justify-center">
                    <button onClick={() => {deleteTask(index); setModalDelete(false)}} className="px-4 py-2 bg-red-400 text-white rounded mr-2 w-1/2">Eliminar</button> 
                    <button onClick={() => setModalDelete(false)} className="px-4 py-2 bg-gray-400 text-white rounded w-1/2">Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete