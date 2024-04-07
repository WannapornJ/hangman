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
  const [guessword, setGuessword] = useState([]);
  const [guessChar, setGuessChar] = useState([]);
  const [count, setCount] = useState(8);
  const [isWin, setIsWin] = useState(false);

  const splitWords = (word) => {
    let guess = word.split("");
    setGuessword(guess);
  };
  const genWord = () => {
    let rand = Math.floor(Math.random() * words.length + 1);
    splitWords(words[rand]);
  };
  const checkWin = () => {
    let uniq = guessword.filter((c, index) => guessword.indexOf(c) === index);
    // please do it till the end of the game

    //
  };
  const handleClick = (e) => {
    e.preventDefault();
    checkWin();
    let char = e.target.value;
    if (!isWin) {
      if (guessword.indexOf(char) < 0 && count > 0) {
        setCount((prev) => prev - 1);
      }
      setGuessChar([...guessChar, char]);
    }
  };
  const retry = () => {
    window.location.reload();
  };
  useEffect(() => {
    genWord();
  }, []);

  return (
    <>
      <h1>Hangman</h1>
      <div
        className="display-word"
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
      >
        {guessword &&
          guessword.map((char, id) => (
			// if you colud fix this nonsense hidden characters
            <h2
              key={id}
              className="guessing-character"
              style={
                guessChar.indexOf(char) >= 0
                  ? { color: "white" }
                  : { color: "#242424" }
              }
            >
              {char}
            </h2>
          ))}
      </div>
      <div className="count">Ramianing try: {count}</div>
      {count == 0 || isWin ? (
        <div>
          You're so fucking noob bro. <button onClick={retry}>Retry</button>
        </div>
      ) : (
        <div className="key">
          {char.map((alph, id) => (
            <button value={alph} onClick={handleClick} key={id}>
              {alph}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
