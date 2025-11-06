import { useState } from "react";
import Header from "./Header";

function Nav(props) {
  const lis = []
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={'/read/' + t.id} onClick={event => {event.preventDefault(); props.onChangeMode(t.id);}}>{t.title}</a></li>)
  }
  return (
    <nav>
      <ul>
        {lis}
      </ul>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form action="" onSubmit={e=>{
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="CREATE" /></p>
      </form>
    </article>
  )
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>UPDATE</h2>
      <form action="" onSubmit={e=>{
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type="text" name="title" placeholder={title} onChange={e=>{
          setTitle(e.target.value);
        }}/></p>
        <p><textarea name="body" placeholder={body} onChange={e=>{
          setBody(e.target.body);
        }}></textarea></p>
        <p><input type="submit" value="UPDATE" /></p>
      </form>
    </article>
  )
}

function CRUD() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'js', body:'js is...'}
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME') {
    content = <Article title="REACT WELCOME" body="Hello, WEB" />
  } else if (mode === "READ") {
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />
    contextControl = <>
      <li><a href={"/update/" + id} onClick={e=>{
        e.preventDefault();
        setMode("UPDATE");
      }}>Update</a></li>
      <li><input type="button" value="DELETE" onClick={()=>{
        const newTopics = [];
        for(let i=0; i<topics.length; i++) {
          if(topics[i].id !== id) {
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode("WELCOME");
      }}/></li>
    </>
  } else if (mode === "CREATE") {
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode("READ");
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>
  } else if (mode === "UPDATE") {
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const newTopics = [...topics];
      const updateTopics = {id:id, title:title, body:body}
      for(let i=0; i < newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updateTopics;
          break;
        }
      }
      setTopics(newTopics);
      setMode("READ");
    }}></Update>
  }
  return (
    <>
      <div>
        <Header title="WEB" onChangeMode={()=>{
          setMode("WELCOME");
        }}/>
        <Nav topics={topics} onChangeMode={(nav)=>{
          setMode("READ");
          setId(nav);
        }} />
        {content}
        <ul>
          <li><a href="/create" onClick={e=>{
            e.preventDefault();
            setMode("CREATE");
          }}>CREATE</a></li>
          {contextControl}
        </ul>
      </div>
    </>
  );
}

export default CRUD;
