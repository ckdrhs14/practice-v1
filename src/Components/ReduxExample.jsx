import React from 'react'
import { createStore } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux';

function reducer(currentState, action) {
  if(currentState === undefined) {
    return {
      number: 1,
    };
  }

  const newState = {...currentState};
  if (action.type === "plus") {
    newState.number++;
  }
  return newState;
}

const store = createStore(reducer);


function Left1(props) {
  return (
    <div>
      <h1>Left1 </h1>
      <Left2 />
    </div>
  )
}

function Left2(props) {
  return (
    <div>
      <h1>Left2</h1>
      <Left3 />
    </div>
  )
}

function Left3(props) {
  function f(state) {
    return state.number;
  }

  const number = useSelector(f);
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  )
}

function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2 />
    </div>
  )
}

function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3 />
    </div>
  )
}

function Right3(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input type="button" value="+" onClick={() => {
        dispatch({type:"plus"});
      }} />
    </div>
  )
}

export default function ReduxExample() {
  return (
    <div>
      <div id='container'>
        <h1>Root</h1>
        <div id="grid">
          <Provider store={store} >
            <Left1 />
            <Right1 />
          </Provider>
        </div>
      </div>
    </div>
  )
}

