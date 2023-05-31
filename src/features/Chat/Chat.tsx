import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import stateContext from '../../botReducer/context';
import './chat.css';
import userContext from '../../userReducer/context';

function Chat({ userMessage }: { userMessage: string }): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [greet, setGreet] = useState(
    JSON.parse(localStorage.getItem('greeting') || '{}'),
  );
  const { state, dispatch } = useContext(stateContext);
  const { userState, userDispatch } = useContext(userContext);

  const toggleModal = (): void => {
    setModalOpen((prev) => !prev);
  };

  const UUID = '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4';
  const CORS = 'http://localhost:8080/';
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
          .then((str) => setGreet(str.result.text.value));
      })
      .catch((err) => console.log(err));
  }, [greet]);

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
            dispatch({
              type: 'ADD_CHAT',
              payload: str.result.text.value
                .replaceAll('<br/>', '')
                .replaceAll('</userlink>', '')
                .replaceAll('<userlink>', ''),
            }),
          );
      })
      .catch((err) => console.log(err));
  }, [userMessage]);

  useEffect(() => {
    userDispatch({ type: 'ADD_USERCHAT', payload: userMessage });
  }, [userDispatch, userMessage]);

  function concat(array1: string[], array2: string[]): string[] {
    const arr = [];
    for (let i = 0; i < array1.length; i += 1) {
      for (let j = 0; j < array2.length; j += 1) {
        if (i === j) {
          arr.push(array1[i], array2[j]);
        }
      }
    }
    return arr;
  }

  const arrays = concat(userState.userChatArr, state.chatArr);
  console.log(arrays);

  return (
    <div className="chat">
      {modalOpen && <Modal toggleModal={toggleModal} />}
      {greet.length > 2 && (
        <div id="greet" className="received message">
          {greet}
        </div>
      )}
      {arrays.map(
        (msg, index) =>
          msg.length > 0 && (
            <div
              key={index}
              className={index % 2 === 0 ? 'sent message' : 'received message'}
            >
              {msg}
            </div>
          ),
      )}
      <div className="deleteButton">
        <button className="deleteChat" type="button" onClick={toggleModal}>
          Удалить чат
        </button>
      </div>
    </div>
  );
}

export default Chat;
