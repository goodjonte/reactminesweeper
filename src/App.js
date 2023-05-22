import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [board, setBoard] = useState(createGrid());//Array Holding the boards values
  const [gameFreeze, setGameFreeze] = useState(false);//state used to freeze the game - e.g. if player losses the game is frozen until the board is reset

  useEffect(() => {//Remove right click menu for game
    const handleContextMenu = (e) => {
      e.preventDefault()
    }
    document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  function CheckForWin(){ //Check if the player won - is called after every click by the player
    let clickedCount = 0;
    for(let i = 0; i < 80; i++) {
      if(document.getElementById(i.toString()).parentElement.className === "cellClicked") {
        clickedCount++;
      }
    }
    if(clickedCount >= 71) {
      alert("You Win");
      setGameFreeze(true);
    }
  }

  function PlayerLost() {//Player Lost - Freeze Board, Alert the player and Show Bomb locations
    alert("You Lose");
    setGameFreeze(true);
    for(let i = 0; i < 80; i++) {
      if(document.getElementById(i.toString()).innerHTML === "B") {
        document.getElementById(i.toString()).parentElement.className = "cellWasBomb";
        document.getElementById(i.toString()).className = "wasBomb";
      }
    }
  }

  function resetBoard() {//Reset Board
    for(let i = 0; i < 80; i++) {
      document.getElementById(i.toString()).className = "hidden";
      document.getElementById(i.toString()).parentElement.className = "cell";
    }
    setBoard(createGrid());
    setGameFreeze(false);
  }

 function ClickedCell(e) { //Called when a cell is clicked - if cell is empty run empty function - if cell has a number it shows the number - if cell is a bomb player losses
   if(gameFreeze === false){
     if(e.target.children[0].innerHTML === ""){//if cell is empty
       e.target.className = "cellClicked";
       let cellNum = e.target.children[0].id;
       EmptyClicked(cellNum);
     }else {//cell has number or bomb
       let spanId = e.target.children[0].id;
       document.getElementById(spanId).className = "numSpan";
       e.target.className = "cellClicked";
       if(e.target.children[0].innerHTML === "B"){
         PlayerLost();
       }
     }
     CheckForWin()//check if player won after their turn/click
   }
 }

  function LeftClickedCell(e) {//Called when a cell is right clicked - if cell hasnt already been clicked will turn it red - if cell is already red turn back to grey
    if(e.target.className !== 'cellClicked' && gameFreeze === false){
      if(e.target.className === 'cellRed') {
        e.target.className = 'cell';
        return;
      }
      e.target.className = 'cellRed';
    }
  }

  //Called when player has clicked an empty cell - will clear cells around the cell.
  //Also called when a empty cell is cleared - will clear cells around the cell and will repeat again untill all empty cells touching each other are cleared.
  function EmptyClicked(ClickedCellNum) {
    let cellArray = getCellNumbersAround(ClickedCellNum);
    ClearAroundCell(cellArray);
  }

  function ClearAroundCell(cellArr){//Takes an array of cell numbers - clears the cell - if cell is empty it will continue on clearing cells 
    for(let i = 0; i < cellArr.length; i++) {
      if(cellArr[i] !== null) {
        if(board[cellArr[i]] === 0) {
          if(document.getElementById(cellArr[i].toString()).parentElement.className !== "cellClicked"){
            document.getElementById(cellArr[i].toString()).className = "numSpan";
            document.getElementById(cellArr[i].toString()).parentElement.className = "cellClicked";
            EmptyClicked(cellArr[i]);
          }
        }else if(board[cellArr[i]] !== "B"){
          console.log(cellArr[i]);
          if(document.getElementById(cellArr[i].toString()).parentElement.className !== "cellClicked"){
            document.getElementById(cellArr[i].toString()).className = "numSpan";
            document.getElementById(cellArr[i].toString()).parentElement.className = "cellClicked";
          }
        }
      }
    }
  }

  function getCellNumbersAround(Num) { //Takes in a cell number and returns a array of cell numbers surrouding the cell
    Num = parseInt(Num);
   let cellAbove = Num - 10 >= 0 ? Num - 10 : null;//above correct
   let cellBellow = (Num + 10) < 80 ? Num + 10 : null;//below 
   let cellLeft = Num  % 10 !== 0 ? Num - 1 : null;//left 
   let cellRight = (Num + 1) % 10 !== 0 ? Num + 1 : null;//right 

   let cellTopRight = (Num - 9) >= 0 ? (Num + 1) % 10 !== 0 ? Num - 9 : null : null;//top right correct
   let cellTopLeft =  (Num - 11) >= 0 ? Num  % 10 !== 0 ? Num - 11 : null : null;//top left correct
   let cellBottomRight = (Num + 11) < 80 ? (Num + 1) % 10 !== 0 ? Num + 11 : null : null;//bottom right
   let cellBottomLeft = (Num + 9) < 80 ? Num  % 10 !== 0 ? Num + 9 : null : null;//bottom left

   let arr = [cellAbove, cellTopRight, cellTopLeft, cellBellow, cellBottomRight, cellBottomLeft, cellLeft, cellRight];
   return arr;
 }

  function createGrid() { //Returns a new board - randomly places bombs withing board array and adds the numbers neccessary
    let tempGrid = Array(80).fill(0);
    let bombs = [];
    for(let i = 0; i < 9; i++) {
      let bombLocation = Math.floor(Math.random() * 80);
      while(bombs.includes(bombLocation)) {
        bombLocation = Math.floor(Math.random() * 80);
      }
      bombs.push(bombLocation);
    }
    //Place Bombs and add numbers within Grid
    bombs.forEach(bombNumLocation => {
      tempGrid[bombNumLocation] = "B";
      //add number right of bomb
      if((bombNumLocation + 1) % 10 !== 0)
      {
        if(tempGrid[bombNumLocation + 1] !== "B"){
          tempGrid[bombNumLocation + 1]++
        }
      }
      //add number left of bomb
      if(bombNumLocation  % 10 !== 0) 
      { 
        if(tempGrid[bombNumLocation - 1] !== "B"){
          tempGrid[bombNumLocation - 1]++ 
        }
      };
      //add numbers above bomb
      if(bombNumLocation - 10 >= 0 )
      {
        if(tempGrid[bombNumLocation - 10] !== "B"){//above
          tempGrid[bombNumLocation - 10]++
        }
        if(bombNumLocation  % 10 !== 0) 
        { 
          if(tempGrid[bombNumLocation - 11] !== "B"){//top left
            tempGrid[bombNumLocation - 11]++
          }
        }
        if((bombNumLocation + 1) % 10 !== 0)//top right
        {
          if(tempGrid[bombNumLocation - 9] !== "B"){
            tempGrid[bombNumLocation - 9]++
          }
        }
      }
      //add numbers below bomb
      if( bombNumLocation + 10 <= 80 )
      {
        if(tempGrid[bombNumLocation + 10] !== "B"){//bellow
          tempGrid[bombNumLocation + 10]++
        }
        if((bombNumLocation + 1) % 10 !== 0)
        {
          if(tempGrid[bombNumLocation + 11] !== "B"){ //bottom right
            tempGrid[bombNumLocation + 11]++
          }
        } 
        if(bombNumLocation  % 10 !== 0) 
        {
          if(tempGrid[bombNumLocation + 9] !== "B"){ //bottom left
            tempGrid[bombNumLocation + 9]++
          }
        }
      }
    });

    return tempGrid;
  }

  return (
    <div className="App">
      <h1 className='title'>Minesweeper</h1>
      <button className='resetButton' onClick={() => resetBoard()} >Reset Game</button>
      <div className='grid'>
        <div className='row'>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="0" className='hidden'>{board[0] === 0 ? "" : board[0]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="1" className='hidden'>{board[1] === 0 ? "" : board[1]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="2" className='hidden'>{board[2] === 0 ? "" : board[2]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="3" className='hidden'>{board[3] === 0 ? "" : board[3]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="4" className='hidden'>{board[4] === 0 ? "" : board[4]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="5" className='hidden'>{board[5] === 0 ? "" : board[5]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="6" className='hidden'>{board[6] === 0 ? "" : board[6]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="7" className='hidden'>{board[7] === 0 ? "" : board[7]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="8" className='hidden'>{board[8] === 0 ? "" : board[8]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="9" className='hidden'>{board[9] === 0 ? "" : board[9]}</span></div>
        </div>
        <div className='row'>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="10" className='hidden'>{board[10] === 0 ? "" : board[10]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="11" className='hidden'>{board[11] === 0 ? "" : board[11]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="12" className='hidden'>{board[12] === 0 ? "" : board[12]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="13" className='hidden'>{board[13] === 0 ? "" : board[13]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="14" className='hidden'>{board[14] === 0 ? "" : board[14]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="15" className='hidden'>{board[15] === 0 ? "" : board[15]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="16" className='hidden'>{board[16] === 0 ? "" : board[16]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="17" className='hidden'>{board[17] === 0 ? "" : board[17]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="18" className='hidden'>{board[18] === 0 ? "" : board[18]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="19" className='hidden'>{board[19] === 0 ? "" : board[19]}</span></div>
        </div>
        <div className='row'>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="20" className='hidden'>{board[20] === 0 ? "" : board[20]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="21" className='hidden'>{board[21] === 0 ? "" : board[21]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="22" className='hidden'>{board[22] === 0 ? "" : board[22]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="23" className='hidden'>{board[23] === 0 ? "" : board[23]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="24" className='hidden'>{board[24] === 0 ? "" : board[24]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="25" className='hidden'>{board[25] === 0 ? "" : board[25]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="26" className='hidden'>{board[26] === 0 ? "" : board[26]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="27" className='hidden'>{board[27] === 0 ? "" : board[27]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="28" className='hidden'>{board[28] === 0 ? "" : board[28]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="29" className='hidden'>{board[29] === 0 ? "" : board[29]}</span></div>
        </div>
        <div className='row'>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="30" className='hidden'>{board[30] === 0 ? "" : board[30]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="31" className='hidden'>{board[31] === 0 ? "" : board[31]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="32" className='hidden'>{board[32] === 0 ? "" : board[32]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="33" className='hidden'>{board[33] === 0 ? "" : board[33]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="34" className='hidden'>{board[34] === 0 ? "" : board[34]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="35" className='hidden'>{board[35] === 0 ? "" : board[35]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="36" className='hidden'>{board[36] === 0 ? "" : board[36]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="37" className='hidden'>{board[37] === 0 ? "" : board[37]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="38" className='hidden'>{board[38] === 0 ? "" : board[38]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="39" className='hidden'>{board[39] === 0 ? "" : board[39]}</span></div>
        </div>
        <div className='row'>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="40" className='hidden'>{board[40] === 0 ? "" : board[40]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="41" className='hidden'>{board[41] === 0 ? "" : board[41]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="42" className='hidden'>{board[42] === 0 ? "" : board[42]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="43" className='hidden'>{board[43] === 0 ? "" : board[43]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="44" className='hidden'>{board[44] === 0 ? "" : board[44]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="45" className='hidden'>{board[45] === 0 ? "" : board[45]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="46" className='hidden'>{board[46] === 0 ? "" : board[46]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="47" className='hidden'>{board[47] === 0 ? "" : board[47]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="48" className='hidden'>{board[48] === 0 ? "" : board[48]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="49" className='hidden'>{board[49] === 0 ? "" : board[49]}</span></div>
        </div>
        <div className='row'>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="50" className='hidden'>{board[50] === 0 ? "" : board[50]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="51" className='hidden'>{board[51] === 0 ? "" : board[51]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="52" className='hidden'>{board[52] === 0 ? "" : board[52]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="53" className='hidden'>{board[53] === 0 ? "" : board[53]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="54" className='hidden'>{board[54] === 0 ? "" : board[54]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="55" className='hidden'>{board[55] === 0 ? "" : board[55]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="56" className='hidden'>{board[56] === 0 ? "" : board[56]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="57" className='hidden'>{board[57] === 0 ? "" : board[57]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="58" className='hidden'>{board[58] === 0 ? "" : board[58]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="59" className='hidden'>{board[59] === 0 ? "" : board[59]}</span></div>
        </div>
        <div className='row'>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="60" className='hidden'>{board[60] === 0 ? "" : board[60]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="61" className='hidden'>{board[61] === 0 ? "" : board[61]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="62" className='hidden'>{board[62] === 0 ? "" : board[62]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="63" className='hidden'>{board[63] === 0 ? "" : board[63]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="64" className='hidden'>{board[64] === 0 ? "" : board[64]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="65" className='hidden'>{board[65] === 0 ? "" : board[65]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="66" className='hidden'>{board[66] === 0 ? "" : board[66]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="67" className='hidden'>{board[67] === 0 ? "" : board[67]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="68" className='hidden'>{board[68] === 0 ? "" : board[68]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="69" className='hidden'>{board[69] === 0 ? "" : board[69]}</span></div>
        </div>
        <div className='row'>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="70" className='hidden'>{board[70] === 0 ? "" : board[70]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="71" className='hidden'>{board[71] === 0 ? "" : board[71]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="72" className='hidden'>{board[72] === 0 ? "" : board[72]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="73" className='hidden'>{board[73] === 0 ? "" : board[73]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="74" className='hidden'>{board[74] === 0 ? "" : board[74]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="75" className='hidden'>{board[75] === 0 ? "" : board[75]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="76" className='hidden'>{board[76] === 0 ? "" : board[76]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="77" className='hidden'>{board[77] === 0 ? "" : board[77]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="78" className='hidden'>{board[78] === 0 ? "" : board[78]}</span></div>
          <div onContextMenu={(e) => LeftClickedCell(e)} onClick={(e) => ClickedCell(e)} className='cell'><span id="79" className='hidden'>{board[79] === 0 ? "" : board[79]}</span></div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
