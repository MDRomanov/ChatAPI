import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Navbar/Sidebar';
import Chat from '../features/Chat/Chat';
import ChatInput from '../features/ChatInput/ChatInput';
import './App.css';
import './theme.css';

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

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);
  return (
    <div className={`App-header ${theme}`}>
      <Sidebar toggleTheme={toggleTheme} />
      <Chat inputText={inputText} userMessage={userMessage} />
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        setUserMessage={setUserMessage}
      />
    </div>
  );
}

export default App;
