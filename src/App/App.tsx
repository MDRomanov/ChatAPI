import React, { useState, useEffect, useReducer } from 'react';
import Sidebar from '../components/Navbar/Sidebar';
import Chat from '../features/Chat/Chat';
import ChatInput from '../features/ChatInput/ChatInput';
import stateContext from '../botReducer/context';
import userContext from '../userReducer/context';
import { botInitializer, init, reducer } from '../botReducer/reducer';
import './App.css';
import './theme.css';
import { initializer, userInit, userReducer } from '../userReducer/reducer';

function App(): JSX.Element {
  const [inputText, setInputText] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const toggleTheme = (): void => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const [state, dispatch] = useReducer(reducer, init, botInitializer);
  const [userState, userDispatch] = useReducer(userReducer, userInit, initializer);

  useEffect(() => {
    localStorage.setItem('localBotChat', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem('localUserChat', JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);
  return (
    <div className={`App-header ${theme}`}>
      <userContext.Provider value={{ userState, userDispatch }}>
        <stateContext.Provider value={{ state, dispatch }}>
          <Sidebar toggleTheme={toggleTheme} />
          <Chat
            userMessage={userMessage}
          />
          <ChatInput
            inputText={inputText}
            setInputText={setInputText}
            setUserMessage={setUserMessage}
          />
        </stateContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;
