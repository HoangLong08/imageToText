import './App.css';

import { useState } from 'react';
import Tesseract from 'tesseract.js';

function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  }

  const handleClick = () => {

    Tesseract.recognize(
      imagePath, 'eng',
      {
        logger: m => console.log(m)
      }
    )
      .catch(err => {
        console.error(err);
      })
      .then(result => {
        // Get Confidence score
        console.log("result: ", result)
        let confidence = result.confidence

        let text = result.text
        console.log("confidence: ", confidence);
        console.log("text: ", text)
        setText(result.data.text);

      })
  }

  return (
    <div className="App">
      <main className="App-main">
        <h3>Actual image uploaded</h3>
        <img
          src={imagePath} className="App-logo" alt="logo" />

        <h3>Extracted text</h3>
        <div className="text-box">
          <p> {text} </p>
        </div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleClick} style={{ height: 50 }}> convert to text</button>
      </main>
    </div>
  );
}

export default App;
