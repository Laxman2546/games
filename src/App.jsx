import React, { useState } from "react";
import Rock from "./assets/rock.jpeg";
import Paper from "./assets/paper.jpeg";
import Scissor from "./assets/scissor.jpeg";
const App = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [compImage, setcompImage] = useState(null);
  const [compName, setcompName] = useState("");
  const [data, setData] = useState("");
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
    const computerChoice = compChoice();
    const systemChoice = computerChoice.choice;
    console.log(systemChoice);
    setImage(img);
    setName(choice);
    setcompImage(computerChoice.img);
    setcompName(computerChoice.choice);
    setTimeout(() => checkWinner(choice, systemChoice), 100);
  };
  const checkWinner = (playerChoice, compName) => {
    if (!playerChoice) return;
    if (playerChoice === compName) {
      setData("game Tie");
    } else if (
      (playerChoice === "Rock" && compName === "Scissor") ||
      (playerChoice === "Paper" && compName === "Rock") ||
      (playerChoice === "Scissor" && compName === "Paper")
    ) {
      setData("you win");
    } else {
      setData("computer wins");
    }
  };
  return (
    <>
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
    </>
  );
};

export default App;
