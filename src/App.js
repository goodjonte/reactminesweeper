import './App.css';
import React from 'react';

function App() {

  const bombs = [];


  


  function createGrid() {
    
    let tempGrid = Array(80).fill(0);
    
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
      if(bombNumLocation - 10 > 0 )
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
      if( bombNumLocation + 10 < 80 )
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




    console.log(tempGrid);
  }

  
  createGrid()

  return (
    <div className="App">
      
      <div className='grid'>
        <div className='row'>
          <div id="0" className='cell'></div>
          <div id="1" className='cell'></div>
          <div id="2" className='cell'></div>
          <div id="3" className='cell'></div>
          <div id="4" className='cell'></div>
          <div id="5" className='cell'></div>
          <div id="6" className='cell'></div>
          <div id="7" className='cell'></div>
          <div id="8" className='cell'></div>
          <div id="9" className='cell'></div>
        </div>
        <div className='row'>
          <div id="10" className='cell'></div>
          <div id="11" className='cell'></div>
          <div id="12" className='cell'></div>
          <div id="13" className='cell'></div>
          <div id="14" className='cell'></div>
          <div id="15" className='cell'></div>
          <div id="16" className='cell'></div>
          <div id="17" className='cell'></div>
          <div id="18" className='cell'></div>
          <div id="19" className='cell'></div>
        </div>
        <div className='row'>
          <div id="20" className='cell'></div>
          <div id="21" className='cell'></div>
          <div id="22" className='cell'></div>
          <div id="23" className='cell'></div>
          <div id="24" className='cell'></div>
          <div id="25" className='cell'></div>
          <div id="26" className='cell'></div>
          <div id="27" className='cell'></div>
          <div id="28" className='cell'></div>
          <div id="29" className='cell'></div>
        </div>
        <div className='row'>
          <div id="30" className='cell'></div>
          <div id="31" className='cell'></div>
          <div id="32" className='cell'></div>
          <div id="33" className='cell'></div>
          <div id="34" className='cell'></div>
          <div id="35" className='cell'></div>
          <div id="36" className='cell'></div>
          <div id="37" className='cell'></div>
          <div id="38" className='cell'></div>
          <div id="39" className='cell'></div>
        </div>
        <div className='row'>
          <div id="40" className='cell'></div>
          <div id="41" className='cell'></div>
          <div id="42" className='cell'></div>
          <div id="43" className='cell'></div>
          <div id="44" className='cell'></div>
          <div id="45" className='cell'></div>
          <div id="46" className='cell'></div>
          <div id="47" className='cell'></div>
          <div id="48" className='cell'></div>
          <div id="49" className='cell'></div>
        </div>
        <div className='row'>
          <div id="50" className='cell'></div>
          <div id="51" className='cell'></div>
          <div id="52" className='cell'></div>
          <div id="53" className='cell'></div>
          <div id="54" className='cell'></div>
          <div id="55" className='cell'></div>
          <div id="56" className='cell'></div>
          <div id="57" className='cell'></div>
          <div id="58" className='cell'></div>
          <div id="59" className='cell'></div>
        </div>
        <div className='row'>
          <div id="60" className='cell'></div>
          <div id="61" className='cell'></div>
          <div id="62" className='cell'></div>
          <div id="63" className='cell'></div>
          <div id="64" className='cell'></div>
          <div id="65" className='cell'></div>
          <div id="66" className='cell'></div>
          <div id="67" className='cell'></div>
          <div id="68" className='cell'></div>
          <div id="69" className='cell'></div>
        </div>
        <div className='row'>
          <div id="70" className='cell'></div>
          <div id="71" className='cell'></div>
          <div id="72" className='cell'></div>
          <div id="73" className='cell'></div>
          <div id="74" className='cell'></div>
          <div id="75" className='cell'></div>
          <div id="76" className='cell'></div>
          <div id="77" className='cell'></div>
          <div id="78" className='cell'></div>
          <div id="79" className='cell'></div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
