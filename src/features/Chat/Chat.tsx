import React, { useEffect, useLayoutEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import './chat.css';

function Chat({ userMessage }: { userMessage: string }): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [remove, setRemove] = useState(false);
  const [reply, setReply] = useState(JSON.parse(localStorage.getItem('answer') || '{}'));
  const [greet, setGreet] = useState(JSON.parse(localStorage.getItem('greeting') || '{}'));

  useEffect(() => {
    if (reply.length !== 0) {
      localStorage.setItem('answer', JSON.stringify(reply));
    }
    if (greet.length !== 0) {
      localStorage.setItem('greeting', JSON.stringify(greet));
    }
    if (userMessage.length !== 0) {
      localStorage.setItem('userRequest', JSON.stringify(userMessage));
    }
  }, [reply, greet, userMessage]);

  const toggleModal = (): void => {
    setModalOpen((prev) => !prev);
  };

  const UUID = '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4';
  const CORS = 'https://cors-anywhere.herokuapp.com/';
  const URL = 'https://biz.nanosemantics.ru/api/2.1/json/Chat.';
  const EUID = '00b2fcbe-f27f-437b-a0d5-91072d840ed3';

  useLayoutEffect(() => {
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
        return fetch(`${CORS}${URL}event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cuid: CUID,
            euid: EUID,
            context: {
              vars: {
                user_name: ' ',
                user_age: 27,
                inf_age: 2,
              },
            },
          }),
        })
          .then((response) => response.json())
          .then((str) => setReply(str.result.text.value));
      })
      .catch((err) => console.log(err));
  }, [userMessage]);

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
            setGreet(
              str.result.text.value
                .replaceAll('<br/>', '')
                .replaceAll('</userlink>', '')
                .replaceAll('<userlink>', ''),
            ),
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
          {reply.length > 2 && <div className="received message">{reply}</div>}
          <div className="sent message">{userMessage}</div>
          {greet.length > 2 && (
            <div id="greet" className="received message">
              {greet}
            </div>
          )}

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

/* {inputText.length > 0 &&
            userMessage.map((data, index) => (
                <div key={index} className="sent message">
                  {data}
                </div>
              ))} */
