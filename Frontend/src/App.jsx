import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { okaidia } from '@uiw/codemirror-theme-okaidia'; // Okaidia theme
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`
#include <iostream>
int main() {
  std::cout << "Hello World!";
  return 0; 
}
  `);
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language,
      code
    };

    try {
      const response = await axios.post('http://localhost:8080/run', payload);
      setOutput(response.data.output);
    } catch (error) {
      console.error(error);
      setOutput('Error occurred while executing the code.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Compiler Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">AlgoU Online Code Compiler</h1>

      {/* Language Selection Dropdown */}
      <div className="w-full max-w-xs mb-4">
        <select
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="py">Python</option>
          <option value="go">Golang</option>
          <option value="js">JavaScript</option>
        </select>
      </div>

      {/* CodeMirror Code Editor */}
      <div className="w-full max-w-3xl mb-4 text-left"> {/* Added text-left to align code to the left */}
        <CodeMirror
          value={code}
          height="400px"
          theme={okaidia}
          extensions={[cpp()]} // For C++
          onChange={(value) => setCode(value)}
        />
      </div>

      {/* Run Button */}
      <button
  className="px-8 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition duration-200"
  onClick={handleSubmit}
>
  Run
</button>



      {/* Output Display */}
      {output && (
        <div className="mt-6 w-full max-w-3xl bg-gray-100 p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-2">Output:</h2>
          <pre className="whitespace-pre-wrap text-gray-800">{output}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
