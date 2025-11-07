import React, { createContext, useContext } from 'react'
const themeDefault = {border: '10px solid red'}
const themeContext = createContext(themeDefault);

function Sub1() {
  const theme = useContext(themeContext);
  return (
    <themeContext.Provider value={{border: '10px solid green'}}>
      <div style={theme}>
        <h1>Sub1</h1>
        <Sub2 />
      </div>
    </themeContext.Provider>
  )
}

function Sub2() {
  const theme = useContext(themeContext);
  return (
    <div style={theme}>
      <h1>Sub2</h1>
      <Sub3 />
    </div>
  )
}

function Sub3() {
  const theme = useContext(themeContext);
  return (
    <div style={theme}>
      <h1>Sub3</h1>
    </div>
  )
}

export default function Context() {
  const theme = useContext(themeContext);
  return (
    <themeContext.Provider value={{border: '10px solid blue'}}>
      <div>
        {/* <CRUD /> */}
        {/* <Link /> */}
        <div className='root' style={theme}>
          <h1>hello world</h1>
          <Sub1 />
        </div>
      </div>
    </themeContext.Provider>
  )
}

