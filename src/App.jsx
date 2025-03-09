import React, { useEffect, useState } from "react";
import Rock from "./assets/rock.jpeg";
import Paper from "./assets/paper.jpeg";
import Scissor from "./assets/scissor.jpeg";
const App = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [compImage, setcompImage] = useState(null);
  const [compName, setcompName] = useState("");
  const [data, setData] = useState("");
  const [userScore, setuserScore] = useState(0);
  const [compScore, setcompScore] = useState(0);
  const [showScores, setshowScores] = useState(false);
  const [scoreBox, setscoreBox] = useState(false);
  const [gameOver, setgameOver] = useState(false);
  const compChoice = () => {
    const randChoice = [
      { choice: "Rock", img: Rock },
      { choice: "Paper", img: Paper },
      { choice: "Scissor", img: Scissor },
    ];
    const selectedChoice = Math.floor(Math.random() * randChoice.length);
    return randChoice[selectedChoice];
  };

  const handleClick = (choice, img) => {
    setshowScores(true);
    const computerChoice = compChoice();
    const systemChoice = computerChoice.choice;
    setImage(img);
    setName(choice);
    setcompImage(computerChoice.img);
    setcompName(computerChoice.choice);
    setTimeout(() => checkWinner(choice, systemChoice), 100);
    const winner = checkWinner(choice, computerChoice.choice);
    setData(winner);
    score(winner);
  };
  const checkWinner = (playerChoice, compName) => {
    if (!playerChoice) return;
    if (playerChoice === compName) {
      return "game Tie";
    } else if (
      (playerChoice === "Rock" && compName === "Scissor") ||
      (playerChoice === "Paper" && compName === "Rock") ||
      (playerChoice === "Scissor" && compName === "Paper")
    ) {
      return "you win";
    } else {
      return "computer wins";
    }
  };
  const score = (winner) => {
    if (winner === "you win") {
      setuserScore((prevuser) => {
        return prevuser + 1;
      });
      return userScore;
    } else if (winner === "computer wins") {
      setcompScore((prevcomp) => {
        return prevcomp + 1;
      });
    } else {
      return "";
    }
  };
  const checkScore = () => {
    if (userScore === 5 || compScore === 5) {
      setgameOver(true);
    }
  };
  useEffect(() => {
    checkScore();
  }, [userScore, compScore]);
  const restartGame = () => {
    setuserScore(0);
    setcompScore(0);
    setgameOver(false);
    setshowScores(false);
    setImage(null);
    setData("");
  };
  return (
    <>
      <div className="completegame w-full h-screen flex  flex-row items-center">
        {!gameOver ? (
          <div className="w-full h-screen flex  items-center flex-row">
            <div className="w-full h-screen flex  items-center flex-col gap-15">
              <p className="font-bold text-xl mt-25">Lets play rcs</p>
              <div className="game flex flex-col gap-25">
                <div className="images flex flex-row gap-15">
                  {[
                    { choice: "Rock", img: Rock },
                    { choice: "Paper", img: Paper },
                    { choice: "Scissor", img: Scissor },
                  ].map(({ choice, img }) => (
                    <div key={choice}>
                      <div
                        className="rock flex flex-col text-center gap-5  font-medium cursor-pointer"
                        onClick={() => {
                          handleClick(choice, img);
                        }}
                      >
                        <img src={img} alt={choice} width={80} height={80} />
                        <p>{choice}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {image ? (
                  <div className="selector flex flex-row items-center gap-5">
                    <div className="you  flex flex-col items-center gap-5">
                      <p>You</p>
                      <img
                        src={image}
                        alt={image}
                        width={180}
                        height={180}
                        className="border-none outline-none"
                      />
                      <p>{name}</p>
                    </div>
                    <p>Vs</p>
                    <div className="computer flex flex-col items-center gap-5">
                      <p>Computer</p>
                      <img
                        src={compImage}
                        alt=""
                        width={180}
                        height={180}
                        className="border-none outline-none"
                      />
                      <p>{compName}</p>
                    </div>
                  </div>
                ) : (
                  <div className="start flex items-center justify-center">
                    <p>Click on image to start playing</p>
                  </div>
                )}
              </div>
              {data === "you win" ? (
                <p className="font-bold text-2xl text-green-600">{data}</p>
              ) : data === "computer wins" ? (
                <p className="font-bold text-2xl text-red-600">{data}</p>
              ) : (
                <p className="font-bold text-2xl text-blue-500">{data}</p>
              )}
            </div>
            {showScores ? (
              <div className="scores flex flex-col  align-middle pr-15 justify-center items-center ">
                <h1 className="p-10 font-bold text-2xl">score</h1>
                <table
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid black", padding: "5px" }}>
                        You
                      </th>
                      <th style={{ border: "1px solid black", padding: "5px" }}>
                        Computer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{ border: "1px solid black", padding: "15px" }}
                        className="align-middle place-content-center"
                      >
                        {userScore}
                      </td>
                      <td
                        style={{ border: "1px solid black", padding: "15px" }}
                        className="align-middle place-content-center flex justify-center border-none outline-none"
                      >
                        {compScore}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <p className="text-center">
              Game over
              {data === "you win" ? (
                <p className="font-bold text-2xl text-green-600">{data}</p>
              ) : data === "computer wins" ? (
                <p className="font-bold text-2xl text-red-600">{data}</p>
              ) : (
                <p className="font-bold text-2xl text-blue-500">{data}</p>
              )}
            </p>
            <button
              onClick={() => restartGame()}
              className="p-4 mt-5 rounded-2xl bg-green-600 text-white cursor-pointer"
            >
              Restart Game
            </button>
            {showScores ? (
              <div className="scores flex flex-col  align-middle justify-center items-center ">
                <h1 className="p-10 font-bold text-2xl">score</h1>
                <table
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid black", padding: "5px" }}>
                        You
                      </th>
                      <th style={{ border: "1px solid black", padding: "5px" }}>
                        Computer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{ border: "1px solid black", padding: "15px" }}
                        className="align-middle place-content-center"
                      >
                        {userScore}
                      </td>
                      <td
                        style={{ border: "1px solid black", padding: "15px" }}
                        className="align-middle place-content-center flex justify-center border-none outline-none"
                      >
                        {compScore}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
