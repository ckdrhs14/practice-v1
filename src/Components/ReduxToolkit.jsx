import React from 'react'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux';

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
      <button onClick={() => dispatch(incrementByAmount(50))}>+50</button> pay load값 설정 /
      
      <span> 값 : {count} </span> {/* 현재 count 값 표시 */}
      
      <button onClick={() => dispatch(decrement())}>-</button> {/* decrement 액션 디스패치 */}
    </div>
  );
}

export default function ReduxToolkit() {
  return (
    <div>
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  )
}