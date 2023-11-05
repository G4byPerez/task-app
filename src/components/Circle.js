import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAdd } from '@fortawesome/free-solid-svg-icons';

const Circle = ({ item, index, isChecked, add = false, setIsModalOpen, setTitleModal, setItemSelected, handleUpdateTask, setIndex }) => {

  const [currentStatus, setCurrentStatus] = useState(isChecked);

  useEffect(() => {
    setCurrentStatus(isChecked);
  }, [isChecked])

  const handleToggleCheckbox = (e) => {
    if (add) {
      setTitleModal("Agregar nueva tarea")
      setIsModalOpen(true)
    } else {
      setCurrentStatus(!currentStatus)
      let newStatus = currentStatus ? "Pendiente" : "Completada";
      handleUpdateTask({ ...item, status: newStatus }, index)
      setIndex(null)
    }
    e.stopPropagation();
    setItemSelected(null)
  }

  return (
    <div
      className="h-6 w-6 rounded-full border-2 border-gray-400 flex items-center justify-center cursor-pointer"
      onClick={handleToggleCheckbox}
    >
      {isChecked && <FontAwesomeIcon icon={faCheck} color="black" />}
      {add && <FontAwesomeIcon icon={faAdd} color="white" style={{ fontSize: '15px' }} />}
    </div>
  );
}

export default Circle
