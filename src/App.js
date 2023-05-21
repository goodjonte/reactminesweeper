import './App.css';
import { useState } from 'react';

function App() {

  

  
  const board = createGrid();
  


  function createGrid() {
    
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
        if(tempGrid[bombNumLocation + 10] !== "B"){//above
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

  
  console.log(board);
  return (
    <div className="App">
      
      <div className='grid'>
        <div className='row'>
          <div id="0" className='cell'>{board[0]}</div>
          <div id="1" className='cell'>{board[1]}</div>
          <div id="2" className='cell'>{board[2]}</div>
          <div id="3" className='cell'>{board[3]}</div>
          <div id="4" className='cell'>{board[4]}</div>
          <div id="5" className='cell'>{board[5]}</div>
          <div id="6" className='cell'>{board[6]}</div>
          <div id="7" className='cell'>{board[7]}</div>
          <div id="8" className='cell'>{board[8]}</div>
          <div id="9" className='cell'>{board[9]}</div>
        </div>
        <div className='row'>
          <div id="10" className='cell'>{board[10]}</div>
          <div id="11" className='cell'>{board[11]}</div>
          <div id="12" className='cell'>{board[12]}</div>
          <div id="13" className='cell'>{board[13]}</div>
          <div id="14" className='cell'>{board[14]}</div>
          <div id="15" className='cell'>{board[15]}</div>
          <div id="16" className='cell'>{board[16]}</div>
          <div id="17" className='cell'>{board[17]}</div>
          <div id="18" className='cell'>{board[18]}</div>
          <div id="19" className='cell'>{board[19]}</div>
        </div>
        <div className='row'>
          <div id="20" className='cell'>{board[20]}</div>
          <div id="21" className='cell'>{board[21]}</div>
          <div id="22" className='cell'>{board[22]}</div>
          <div id="23" className='cell'>{board[23]}</div>
          <div id="24" className='cell'>{board[24]}</div>
          <div id="25" className='cell'>{board[25]}</div>
          <div id="26" className='cell'>{board[26]}</div>
          <div id="27" className='cell'>{board[27]}</div>
          <div id="28" className='cell'>{board[28]}</div>
          <div id="29" className='cell'>{board[29]}</div>
        </div>
        <div className='row'>
          <div id="30" className='cell'>{board[30]}</div>
          <div id="31" className='cell'>{board[31]}</div>
          <div id="32" className='cell'>{board[32]}</div>
          <div id="33" className='cell'>{board[33]}</div>
          <div id="34" className='cell'>{board[34]}</div>
          <div id="35" className='cell'>{board[35]}</div>
          <div id="36" className='cell'>{board[36]}</div>
          <div id="37" className='cell'>{board[37]}</div>
          <div id="38" className='cell'>{board[38]}</div>
          <div id="39" className='cell'>{board[39]}</div>
        </div>
        <div className='row'>
          <div id="40" className='cell'>{board[40]}</div>
          <div id="41" className='cell'>{board[41]}</div>
          <div id="42" className='cell'>{board[42]}</div>
          <div id="43" className='cell'>{board[43]}</div>
          <div id="44" className='cell'>{board[44]}</div>
          <div id="45" className='cell'>{board[45]}</div>
          <div id="46" className='cell'>{board[46]}</div>
          <div id="47" className='cell'>{board[47]}</div>
          <div id="48" className='cell'>{board[48]}</div>
          <div id="49" className='cell'>{board[49]}</div>
        </div>
        <div className='row'>
          <div id="50" className='cell'>{board[50]}</div>
          <div id="51" className='cell'>{board[51]}</div>
          <div id="52" className='cell'>{board[52]}</div>
          <div id="53" className='cell'>{board[53]}</div>
          <div id="54" className='cell'>{board[54]}</div>
          <div id="55" className='cell'>{board[55]}</div>
          <div id="56" className='cell'>{board[56]}</div>
          <div id="57" className='cell'>{board[57]}</div>
          <div id="58" className='cell'>{board[58]}</div>
          <div id="59" className='cell'>{board[59]}</div>
        </div>
        <div className='row'>
          <div id="60" className='cell'>{board[60]}</div>
          <div id="61" className='cell'>{board[61]}</div>
          <div id="62" className='cell'>{board[62]}</div>
          <div id="63" className='cell'>{board[63]}</div>
          <div id="64" className='cell'>{board[64]}</div>
          <div id="65" className='cell'>{board[65]}</div>
          <div id="66" className='cell'>{board[66]}</div>
          <div id="67" className='cell'>{board[67]}</div>
          <div id="68" className='cell'>{board[68]}</div>
          <div id="69" className='cell'>{board[69]}</div>
        </div>
        <div className='row'>
          <div id="70" className='cell'>{board[70]}</div>
          <div id="71" className='cell'>{board[71]}</div>
          <div id="72" className='cell'>{board[72]}</div>
          <div id="73" className='cell'>{board[73]}</div>
          <div id="74" className='cell'>{board[74]}</div>
          <div id="75" className='cell'>{board[75]}</div>
          <div id="76" className='cell'>{board[76]}</div>
          <div id="77" className='cell'>{board[77]}</div>
          <div id="78" className='cell'>{board[78]}</div>
          <div id="79" className='cell'>{board[79]}</div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
