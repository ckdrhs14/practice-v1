import React from 'react'
import { Route, Routes, NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components';

const Header = styled.header`
  background-color:#000;
  ul {
    display:flex;
    justify-content:center;
    gap:20px;
    li {
      a {
        display:flex;
        color:#fff;
        font-size:14px;
        padding:20px 4px;
        &.active {
          color:red;
        }
      }
    }
  }
`



function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
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
    <>
      <Header className='header'>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/topics">Topics</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/*" element={<Topics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={'Not Found'} />
      </Routes>
    </>
  )
}

