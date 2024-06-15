import React from 'react';
import { AutoComplete } from './AutoComplete';
const suggestions = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew"
];
function App() {
  return (
    <div className="App">
      <div>
        <AutoComplete suggestions={suggestions} />
      </div>
    </div>
  );
}

export default App;
