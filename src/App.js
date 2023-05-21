import './App.css';
import { useState } from 'react';

function App() {

  const xAxis = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  const yAxis = ["A","B","C","D","E","F","G","H","I","J"];
  const bombs = [];


  


  function createGrid() {
    
    let tempGrid = Array[80].fill(0);
    
    for(let i = 0; i < 9; i++) {
      let bombLocation = Math.floor(Math.random() * tempGrid.length);
      while(bombs.includes(bombLocation)) {
        bombLocation = Math.floor(Math.random() * tempGrid.length);
      }
      bombs.push(bombLocation);
    }
    //Place Bombs and add numbers within Grid
    bombs.forEach(bombNumLocation => {
      tempGrid[bombNumLocation] = "B";
      if(bombNumLocation % 10 !== 0)
      {
        if(tempGrid[bombNumLocation + 1] !== "B"){
          tempGrid[bombNumLocation + 1]++
        }
      }

      if((bombNumLocation - 1) % 10 !== 0) 
      { 
        if(tempGrid[bombNumLocation - 1] !== "B"){
          tempGrid[bombNumLocation - 1]++ 
        }
      };

      if( bombNumLocation - 10 < 0 )
      {
        if(tempGrid[bombNumLocation - 10] !== "B"){
          tempGrid[bombNumLocation - 10]++
        }
      }

      if( bombNumLocation + 10 > 80 )
      {
        if(tempGrid[bombNumLocation + 10] !== "B"){
          tempGrid[bombNumLocation + 10]++
        }
      }
    });




    return tempGrid;
  }

  
  const [grid, setGrid] = useState(createGrid());

  return (
    <div className="App">
      
      <div className="Grid">
        {grid}
      </div>
    </div>
  );
}

export default App;
