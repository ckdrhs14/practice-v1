import React from 'react'
import { Route, Routes, NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components';
// import CRUD from './Components/CRUD'

const SimpleButton = styled.button`
 color:#fff;
 background-color:#000;
`

const LargeButton = styled(SimpleButton)`
  font-size:50px;
`

const ReactButton = (props) => {
  return <button className={props.className}>{props.children}</button>
}

const ReactLargeButton = styled(ReactButton)`
  font-size:50px;
`

const PrimaryButton = styled.button`
  color: ${props => props.primary ? 'blue' : 'red'};
  background-color: ${props => props.primary ? 'black' : 'green'}
`

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
      <SimpleButton>BUTTON</SimpleButton>
      <LargeButton>Large Button</LargeButton>
      <ReactButton>REACT</ReactButton>
      <ReactLargeButton>REACT LARGE</ReactLargeButton>
      <PrimaryButton>Normal</PrimaryButton>
      <PrimaryButton $primary>primary</PrimaryButton>
    </div>
  )
}

var contents = [
  {id:1, title:'HTML', description:"HTML is..."},
  {id:2, title:'CSS', description:"CSS is..."},
  {id:3, title:'REACT', description:"REACT is..."}
]

function Topic() {
  var params = useParams();
  var topic_id = params.topic_id;
  var selected_topic = {
    title:"sorry",
    description:"not Found"
  }
  for(var i=0; i<contents.length; i++) {
    if(contents[i].id === Number(topic_id)) {
      selected_topic = contents[i];
      break;
    }
  }
  return (
    <div>
      <h2>{selected_topic.title}</h2>
      {selected_topic.description}
    </div>
  )
}

function Topics() {
  var lis = [];
  for(var i=0; i<contents.length; i++) {
    lis.push(
      <li key={contents[i].id}><NavLink to={"/topics/" + contents[i].id}>{contents[i].title}</NavLink></li>
    )
  }
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
      <Routes>
        <Route path="/:topic_id" element={<Topic />}/>
      </Routes>
    </div>
  )
}

function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  )
}

export default function Link() {
  return (
    <div>
      {/* <CRUD /> */}
      <h1>HELLO REACT ROUTER DOM</h1>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/*" element={<Topics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={'Not Found'} />
      </Routes>
    </div>
  )
}

