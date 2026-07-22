let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let turnO = true;
let count = 0; 

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame = () => {
    turnO = true;
    count = 0; 
    enabledBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++; 

        checkWinner();

        if (count === 9 && !msgContainer.classList.contains("hide") === false) {
        }
    });
});

const disabledBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}

const enabledBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}
const gameDraw = () => {
    msg.innerText = `Game was a Draw. Play again!`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    let isWinner = false;
    for (let Pattern of winPatterns) {
       let pos1Val = boxes[Pattern[0]].innerText;
       let pos2Val = boxes[Pattern[1]].innerText;
       let pos3Val = boxes[Pattern[2]].innerText;

       if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            showWinner(pos1Val);
            isWinner = true;
            return; 
        }
       }
    }
    if (count === 9 && !isWinner) {
        gameDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);