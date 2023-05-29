import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import './chat.css';

function Chat({
  userMessage,
}: {
  userMessage: string;
}): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [remove, setRemove] = useState(false);
  const [reply, setReply] = useState('');

  const toggleModal = (): void => {
    setModalOpen((prev) => !prev);
  };

  const UUID = '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4';
  const CORS = 'https://cors-anywhere.herokuapp.com/';
  const URL = 'https://biz.nanosemantics.ru/api/2.1/json/Chat.';

  useEffect(() => {
    fetch(`${CORS}${URL}init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid: UUID,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        const CUID = res.result.cuid;
        return fetch(`${CORS}${URL}request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uuid: UUID,
            cuid: CUID,
            text: userMessage,
          }),
        })
          .then((response) => response.json())
          .then((str) =>
            setReply(str.result.text.value.replaceAll('<br/>', '\n\n')),
          );
      })
      .catch((err) => console.log(err));
  }, [userMessage]);
  // console.log(str.result.id);
  return (
    <div className="chat">
      {modalOpen && <Modal toggleModal={toggleModal} setRemove={setRemove} />}
      {!remove && userMessage.length > 0 && (
        <>
          {/* {inputText.length > 0 &&
            userMessage.map((data, index) => (
                <div key={index} className="sent message">
                  {data}
                </div>
              ))} */}
          <div className="sent message">{userMessage}</div>
          {reply.length > 0 && <div className="received message">{reply}</div>}
          <div className="deleteButton">
            <button className="deleteChat" type="button" onClick={toggleModal}>
              Удалить чат
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
