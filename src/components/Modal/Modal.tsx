import React, { useContext } from 'react';
import stateContext from '../../botReducer/context';
import userContext from '../../userReducer/context';
import './modal.css';

function Modal({
  toggleModal,
}: {
  toggleModal: () => void;
}): JSX.Element {
  const { dispatch } = useContext(stateContext);
  const { userDispatch } = useContext(userContext);
  const deleteChat = (): void => {
    toggleModal();
    dispatch({ type: 'DELETE_CHAT' });
    userDispatch({ type: 'DELETE_USERCHAT' });
    localStorage.removeItem('localBotChat');
    localStorage.removeItem('localUserChat');
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
