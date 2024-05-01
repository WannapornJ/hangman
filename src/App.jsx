import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const words = [
    "apple",
    "birds",
    "cat",
    "dog",
    "elephant",
    "flamingo",
    "giraffe",
  ];
  const char = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const [questionWord, setQuestionWord] = useState([]);
  const [guessChar, setGuessChar] = useState([]);
  const [dummyWord, setDummyWord] = useState([]);
  const [count, setCount] = useState(8);
  const [isWin, setIsWin] = useState(false);

  const splitWords = (word) => {
    let guess = word.split("");
    setQuestionWord(guess);
    setDummyWord(Array(word.length).fill(""));
  };
  const genWord = () => {
    let rand = Math.floor(Math.random() * words.length + 1);
    splitWords(words[rand]);
  };
  const isInQuestion = (char) => {
    if (questionWord.indexOf(char) >= 0) {
      let temp = [...dummyWord];
      questionWord.forEach((c, id) => {
        if (c == char) temp[id] = c;
      });
      setDummyWord(temp);
      return 1;
    }
    return 0;
  };
  const checkWin = (dummyWord, questionWord) => {
    if (dummyWord.join("") != "" && questionWord.join("") != "") {
      if (dummyWord.join("") === questionWord.join("")) {
        setIsWin(true);
        return 1;
      }
      setIsWin(false);
      return 0;
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    let char = e.target.value;
    if (guessChar.indexOf(char) >= 0) {
      alert(`You've guess "${char}" already`);
      return;
    }
    if (!isInQuestion(char)) {
      setCount((prev) => prev - 1);
    }
    setGuessChar((prev) => [...prev, char]);
  };
  const retry = () => {
    window.location.reload();
  };
  useEffect(() => {
    genWord();
  }, []);
  useEffect(() => {
    checkWin(dummyWord, questionWord);
  }, [guessChar]);
  return (
    <>
      <h1>Hangman</h1>
      {!isWin ? (
        <>
          <div
            className="display-word"
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {dummyWord &&
              dummyWord.map((char, id) => (
                <h2 key={id} className="guessing-character">
                  {" "}
                  {char}{" "}
                </h2>
              ))}
          </div>
          <div className="count">Ramianing try: {count}</div>
          {count == 0 ? (
            <div>
              You're so fucking bad noob bro.{" "}
              <button onClick={retry}>Retry</button>
            </div>
          ) : (
            <div className="key">
              {char.map((alph, id) => (
                <button
                  value={alph}
                  onClick={handleClick}
                  key={id}
                  disabled={guessChar.indexOf(alph) >= 0}
                >
                  {alph}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          YOU WIN. CONGRATES!!. <button onClick={retry}>Play again</button>
        </div>
      )}
    </>
  );
}

export default App;
