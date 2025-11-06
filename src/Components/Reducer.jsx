import React ,{ useReducer, useState } from 'react'



export default function Reducer() {
  const [number, setNumber] = useState(1);
  function countReducer(oldCount, action) {
    if(action.type === 'up') {
      return oldCount + action.number;
    } else if (action.type === 'reset') {
      return 0;
    } else if (action.type === 'down') {
      return oldCount - action.number;
    }
  }
  const [count, countDispath] = useReducer(countReducer, 0);
  function down() {
    countDispath({type:'down', number:number});
  }
  function reset() {
    countDispath({type:'reset', number:number});
  }
  function up() {
    countDispath({type:'up', number:number});
  }

  function changeNumber(e) {
    setNumber(Number(e.target.value));
  }
  return (
    <div>
      {/* <CRUD /> */}
      {/* <Link /> */}
      {/* <Context /> */}
      <input type="button" value="-" onClick={down} />
      <input type="button" value="0" onClick={reset} />
      <input type="button" value="+" onClick={up} />
      <input type="text" value={number} onChange={changeNumber} />
      <span>{count}</span>
    </div>
  )
}

