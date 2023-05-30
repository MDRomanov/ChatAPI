import React from 'react';
import './modal.css';

function Modal({
  toggleModal,
  setRemove,
}: {
  toggleModal: () => void;
  setRemove: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const deleteChat = (): void => {
    setRemove((prev) => !prev);
    toggleModal();
    localStorage.removeItem('answer');
    localStorage.removeItem('greeting');
    localStorage.removeItem('userRequest');
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button type="button" className="closeModal" onClick={toggleModal}>
            X
          </button>
        </div>
        <div className="title">
          <h3>Вы точно хотите удалить данный чат?</h3>
        </div>
        <div className="body">
          <p>Это действие необратимо!</p>
        </div>
        <div className="footer">
          <button type="button" onClick={deleteChat} id="deleteBtn">
            Удалить
          </button>
          <button type="button" className="cancelBtn" onClick={toggleModal}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
