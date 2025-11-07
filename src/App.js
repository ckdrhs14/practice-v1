import React from 'react'
import "./style.css"
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux';

// import Reducer from './Components/Reducer'
// import Context from './Components/Context'
// import CRUD from './Components/CRUD'
// import Link from './Components/Link';
// import ReduxExample from './Components/ReduxExample';


const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer가 내부적으로 불변성을 유지해줍니다.
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer // 'counter'라는 이름으로 리듀서 등록
  },
});

function Counter() {
  // useSelector를 사용하여 Redux 스토어의 상태에 접근합니다.
  // 여기서는 'counter' 슬라이스의 'value'를 가져옵니다.
  const count = useSelector((state) => state.counter.value);
  
  // useDispatch 훅을 사용하여 액션을 디스패치할 함수를 가져옵니다.
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button> {/* increment 액션 디스패치 */}
      <button onClick={() => dispatch(incrementByAmount(50))}>+5</button> 이런 식으로 payload 전달 가능
      
      <span> {count} </span> {/* 현재 count 값 표시 */}
      
      <button onClick={() => dispatch(decrement())}>-</button> {/* decrement 액션 디스패치 */}
    </div>
  );
}

export default function App() {
  return (
    <div>
      {/* <CRUD /> */}
      {/* <Link /> */}
      {/* <Context /> */}
      {/* <Reducer /> */}
      {/* <ReduxExample /> */}
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  )
}

