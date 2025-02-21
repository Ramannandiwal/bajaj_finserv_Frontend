import React, { useState } from "react";
import axios from "axios";

const InputForm = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => setInputData(e.target.value);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      const res = await axios.post("https://bajaj-finserv-backend-url.vercel.app/bfhl", parsedData);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API error.");
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">JSON Input Form</h2>

        <textarea
          value={inputData}
          onChange={handleInputChange}
          placeholder='Enter JSON data (e.g., { "data": ["A", "1", "z"] })'
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Submit
        </button>

        <div className="mt-4">
          <label className="block text-gray-600 font-medium mb-1">Select Options:</label>
          <select
            multiple
            onChange={handleOptionChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
        </div>

        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Response:</h3>
            <pre className="text-sm text-gray-600 bg-white p-3 rounded-lg overflow-x-auto">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(response).filter(([key]) =>
                    selectedOptions.includes(key)
                  )
                ),
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;