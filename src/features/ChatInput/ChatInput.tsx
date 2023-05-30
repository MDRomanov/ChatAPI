import React from 'react';
import './chatInput.css';
import * as FaIcons from 'react-icons/fa';

function ChatInput({
  inputText,
  setInputText,
  setUserMessage,
}: {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputText(e.target.value);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    event,
  ): void => {
    event.preventDefault();
    const newMessage = inputText;
    setUserMessage(newMessage);
    setInputText('');
  };

  return (
    <form id="input-form" onSubmit={handleSubmit}>
      <div className="chatInput">
        <textarea
          placeholder="Узнать про 3g или Lte"
          value={inputText}
          onChange={handleChange}
          onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) =>
            event.key === 'Enter' ? handleSubmit : null}
        />
        <button type="submit" disabled={!inputText} className="sendMessage">
          Send
          <FaIcons.FaPaperPlane />
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
