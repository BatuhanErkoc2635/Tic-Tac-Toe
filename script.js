const startButton = document.querySelector("#startButton");
const playerModal = document.querySelector("#playerSelection")
const endModal = document.querySelector("#endModal")
const submitButton = document.querySelector("#submit")
const restartButton = document.querySelector("#restart")
const player1Username = document.querySelector("#player1username")
const player2Username = document.querySelector("#player2username")
const gameSection = document.querySelector(".gameSection")
const winner = document.querySelector("#winner")
let winnerIndicator =getComputedStyle(document.body).getPropertyValue("--winning-blocks")

let p1name = "Batuhan"
let p1point = 0
let p2name = "Derin"
let p2point = 0

const o_text = "O"
const x_text = "X"
let currentPlayer = x_text
let spaces = Array(9).fill(null)



function gameStarted(){
    const boxes = Array.from(document.getElementsByClassName("box"))
    const player1NewScore = document.querySelector("#playerOnePoint")
    const player2NewScore = document.querySelector("#playerTwoPoint")
    const startGame = () => {
        boxes.forEach(box => box.addEventListener("click",boxClicked))
    }
    
    function boxClicked(e){
        const id = e.target.id

        if(!spaces[id]){
            spaces[id] = currentPlayer
            e.target.innerText = currentPlayer
            currentPlayer = currentPlayer == x_text ? o_text: x_text
            if (playerHasWon() !== false){
                let winningBlocks = playerHasWon()
                winningBlocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
                
                
                
                if(currentPlayer == x_text){
                    p2point = p2point + 1
                    console.log(player2Username.value + " has won the round!")
                    winner.textContent = player2Username.value + " has won the round!"
                    console.log(currentPlayer)
                }
                else if (currentPlayer == o_text){
                    p1point = p1point + 1
                    console.log(player1Username.value + " has won the round!")
                    winner.textContent = player1Username.value + " has won the round!"
                }
                
                endModal.showModal()
                restartButton.addEventListener("click", () =>{
                    restart();
                })

                
            }

            player1NewScore.textContent = p1point
            player2NewScore.textContent = p2point
            


            

        }
    }
    const winningCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    function playerHasWon(){
        for (const condition of winningCombo) {
            let [a,b,c] = condition

            if(spaces[a] && (spaces[a] == spaces [b] && spaces[a] == spaces[c])){
                return[a,b,c]
            }
        }
        return false
    }
    startGame();


    function restart(){
        
        spaces.fill(null)   
        boxes.forEach( box => {
            box.innerText = ""
            box.style.backgroundColor = ""
        })
        endModal.close()
        currentPlayer = x_text
        
    }
}




function createPlayer1(p1name,p1point){
    const player1info = document.createElement("div")
    player1info.setAttribute("class","player-info playerOne")
    gameSection.appendChild(player1info)

    const p1avatar = document.createElement("img")  
    p1avatar.src = "avatars/avatar-bug-insect-svgrepo-com (1).svg"
    p1avatar.setAttribute("alt","p1avatar")
    player1info.appendChild(p1avatar)

    const playerOneName = document.createElement("h2")
    playerOneName.setAttribute("id","playerOneName")
    playerOneName.textContent = p1name;
    player1info.appendChild(playerOneName)

    const playerOnePoint = document.createElement("h1")
    playerOnePoint.setAttribute("class","points")
    playerOnePoint.setAttribute("id","playerOnePoint")
    playerOnePoint.textContent = p1point;
    player1info.appendChild(playerOnePoint)

    
    player1pointstext = document.createElement("h4")
    player1pointstext.textContent = "Points!"
    player1info.appendChild(player1pointstext)
}


function createPlayer2(p2name,p2point){
    const player2info = document.createElement("div")
    player2info.setAttribute("class","player-info playerTwo")
    gameSection.appendChild(player2info)

    const p2avatar = document.createElement("img")  
    p2avatar.src = "avatars/avatar-dead-monster-svgrepo-com (1).svg"
    p2avatar.setAttribute("alt","p2avatar")
    player2info.appendChild(p2avatar)

    const playerTwoName = document.createElement("h2")
    playerTwoName.setAttribute("id","playerTwoName")
    playerTwoName.textContent = p2name;
    player2info.appendChild(playerTwoName)

    const playerTwoPoint = document.createElement("h1")
    playerTwoPoint.setAttribute("class","points")
    playerTwoPoint.setAttribute("id","playerTwoPoint")
    playerTwoPoint.textContent = p2point;
    player2info.appendChild(playerTwoPoint)

    
    player2pointstext = document.createElement("h4")
    player2pointstext.textContent = "Points!"
    player2info.appendChild(player2pointstext)
}

function createBoard(){
    const gameBoard = document.createElement("div")
    gameBoard.setAttribute("class","gameBoard")
    gameSection.appendChild(gameBoard)

    const threeGameboard = document.createElement("div")
    threeGameboard.setAttribute("class","threeGameboard")
    gameBoard.appendChild(threeGameboard)
    function createBoxes(){
        for (let index = 0; index < 9; index++) {
            const box = document.createElement("div")
            box.setAttribute("class","box")
            box.setAttribute("id",index)
            threeGameboard.appendChild(box)
            
        }
    }

    createBoxes();

 



}

function createGame(p1name,p1point){
    createPlayer1(p1name,p1point);
    createBoard();
    createPlayer2(p2name,p2point);
}






startButton.addEventListener("click", () => {
    console.log("pressed start button")
    startButton.remove()
    playerModal.showModal();
})

submitButton.addEventListener("click",() => {
    console.log("pressed submit button")
    playerModal.close()
    p1name = player1Username.value
    p2name = player2Username.value
    createGame(p1name,p1point);
    gameStarted();
    
})

