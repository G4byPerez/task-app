import React, { useState } from 'react';

const ModalAddEdit = ({ title, isOpen, item, index, setIsModalOpen, setModalDelete, handleUpdateTask, addNewTask }) => {

    const [formData, setFormData] = useState({
        title: item !== null ? item.title : "",
        description: item !== null ? item.description : "",
        date: item !== null ? item.date : "",
        status: item !== null ? item.status : "Pendiente"
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSave = () => {
        formData.status = selectedOption;

        if (item !== null) {
            handleUpdateTask(formData, index)
        } else {
            addNewTask(formData)
        }

        setIsModalOpen(false)
    }

    const [selectedOption, setSelectedOption] = useState(formData.status);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }

    if (!isOpen) return null

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Título</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full p-2 border border-gray-400 rounded"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <input
                        type="text"
                        name="description"
                        className="w-full p-2 border border-gray-400 rounded"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Fecha (DD/MM/AAAA)</label>
                    <input
                        type="text"
                        name="date"
                        className="w-full p-2 border border-gray-400 rounded"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Estado de la tarea:</label>

                    <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                value="Pendiente"
                                checked={selectedOption === "Pendiente"}
                                onChange={handleOptionChange}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="text-gray-900">Pendiente</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                value="Completada"
                                checked={selectedOption === "Completada"}
                                onChange={handleOptionChange}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="text-gray-900">Completada</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-center mb-2">
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded mr-2 w-1/2">Guardar</button>
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded w-1/2">Cancelar</button>
                </div>
                {item !== null && (
                    <button onClick={() => { setModalDelete(true); setIsModalOpen(false); }} className="px-4 py-2 bg-red-400 text-white rounded w-3/4 mx-auto block">Eliminar</button>
                )}
            </div>
        </div>
    );
};

export default ModalAddEdit