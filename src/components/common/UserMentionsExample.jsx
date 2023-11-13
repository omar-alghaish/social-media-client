import React, { useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';

const UserMentionsExample = () => {
  const [inputValue, setInputValue] = useState('');
  const userSuggestions = [
    { id: 1, display: 'John Doe' },
    { id: 2, display: 'Jane Smith' },
    { id: 3, display: 'Alice Johnson' },
  ];

  const handleInputChange = (event, newValue, newPlainTextValue, mentions) => {
    setInputValue(newPlainTextValue);
  };

  return (
    <div>
      <h1>User Mentions Example</h1>
      <MentionsInput
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      >
        <Mention
          trigger="@"
          data={userSuggestions}
          renderSuggestion={(suggestion, search, highlightedDisplay) => (
            <div className="user-suggestion">{highlightedDisplay}</div>
          )}
        />
      </MentionsInput>
      <p>Typed Value: {inputValue}</p>
    </div>
  );
};

export default UserMentionsExample;